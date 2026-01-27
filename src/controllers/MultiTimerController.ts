import { ReactiveController, ReactiveControllerHost } from 'lit';
import { NotificationController, NotificationSound } from './NotificationController';
import { TimerContainer, TimerController } from './TimerController';

export interface MultiTimerContainer extends ReactiveControllerHost, HTMLElement {
  readonly _items: Iterable<TimerContainer>;
}

export class MultiTimerController implements ReactiveController {
  #host: MultiTimerContainer;
  #notification: NotificationController;
  #lastCompletedState = false;
  #timerId: ReturnType<typeof setInterval> | null = null;

  get soundOptions() {
    return this.#notification.soundOptions;
  }

  constructor(host: MultiTimerContainer) {
    (this.#host = host).addController(this);
    this.#notification = new NotificationController(host, () => this.hasCompletedItems);
  }

  hostConnected(): void {
    this.#timerId = setInterval(this.#updateTitle, 100);
  }

  hostDisconnected(): void {
    if (this.#timerId) clearInterval(this.#timerId);
    this.#timerId = null;
  }

  hostUpdated(): void {
    const currentCompleted = this.hasCompletedItems;

    if (currentCompleted !== this.#lastCompletedState || currentCompleted) {
      this.checkStatus();
      this.#lastCompletedState = currentCompleted;
    }
  }

  get items(): TimerContainer[] {
    return Array.from(this.#host._items);
  }

  get timers(): TimerController[] {
    return Array.from(this.#host._items, (it) => it._timer);
  }

  get hasCompletedItems(): boolean {
    return this.items.some((it) => it._timer.isCompleted);
  }

  get sound(): NotificationSound {
    return this.#notification.sound;
  }
  set sound(value: NotificationSound) {
    this.#notification.sound = value;
  }

  playSound(): void {
    this.#notification.stop();
    this.#notification.play();
  }

  stopAllNotifications(): void {
    this.#notification.stop();
  }

  checkStatus(): void {
    if (this.hasCompletedItems) {
      this.#notification.play();
    } else {
      this.#notification.stop();
    }
  }

  #updateTitle = (): void => {
    const timer = this.timers.reduce(
      (previousValue: TimerController, currentValue: TimerController) => {
        if (!previousValue.isRunning) return currentValue;
        if (!currentValue.isRunning) return previousValue;
        return currentValue.endTime < previousValue.endTime
          ? currentValue
          : previousValue;
      },
    );
    const remaining = timer.isRunning ? ` ⌛️ ${timer.formatRemaining()}` : '';
    document.title = document.title.replace(/\s*⌛️.+$|$/, remaining);
  };
}
