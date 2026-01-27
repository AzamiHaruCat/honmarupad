import { ReactiveController, ReactiveControllerHost } from 'lit';
import { JsonObject, Serializable } from '../interfaces/Serializable';

export interface TimerData extends JsonObject {
  total: number;
  remaining: number;
  endTime: number;
}

export interface TimerContainer extends ReactiveControllerHost, HTMLElement {
  _timer: TimerController;
  requestUpdate(): void;
}

export class TimerController implements ReactiveController, Serializable<TimerData> {
  #host: TimerContainer;
  #timerId: ReturnType<typeof setInterval> | null = null;

  total: number = 0;
  remaining: number = 0;
  endTime: number = 0;

  constructor(host: TimerContainer) {
    (this.#host = host).addController(this);
  }

  get isCompleted(): boolean {
    return this.endTime > 0 && !this.isRunning;
  }

  get isRunning(): boolean {
    return this.remaining > 0;
  }

  serialize(): TimerData {
    const { total, remaining, endTime } = this;
    return { total, remaining, endTime };
  }

  unserialize(value: TimerData): void {
    this.total = value.total;
    this.remaining = value.remaining;
    this.endTime = value.endTime;
    if (this.isRunning) this.resume();
    this.#host.requestUpdate();
  }

  hostDisconnected(): void {
    this.stop();
  }

  start = (msec?: number): void => {
    this.#clearTimer();
    if (typeof msec === 'number') this.total = msec || 0;
    this.endTime = Date.now() + this.total;
    this.#setTimer();
  };

  /**
   * 残り時間から再開
   */
  restart = (): void => {
    this.#clearTimer();
    this.endTime = Date.now() + this.remaining;
    this.#setTimer();
  };

  /**
   * 終了時刻から再開
   */
  resume = (): void => {
    this.#clearTimer();
    this.#setTimer();
  };

  #setTimer(): void {
    let lastRemaining = '';

    const update = () => {
      this.remaining = this.endTime - Date.now();

      if (this.remaining <= 0) {
        this.stop();
        this.#host.dispatchEvent(new CustomEvent('timer-done'));
      }

      const remaining = this.formatRemaining();
      if (remaining !== lastRemaining) {
        lastRemaining = remaining;
        this.#host.requestUpdate();
      }
    };

    update();

    if (this.remaining > 0) {
      this.#clearTimer();
      this.#timerId = window.setInterval(update, 100);
    }
  }

  #clearTimer(): void {
    if (this.#timerId) {
      clearInterval(this.#timerId);
      this.#timerId = null;
    }
  }

  stop = (): void => {
    this.#clearTimer();
    this.remaining = Math.max(0, this.endTime - Date.now());
    this.#host.requestUpdate();
  };

  reset = (): void => {
    this.#clearTimer();
    this.remaining = 0;
    this.endTime = 0;
    this.#host.requestUpdate();
  };

  formatRemaining = (): string => {
    const seconds = Math.floor(this.remaining / 1000);
    if (seconds <= 0) return '0s';

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const parts = [];
    if (h > 0) parts.push(h + 'h');
    if (m > 0) parts.push(m + 'm');
    if (h < 1) parts.push(s + 's');
    return parts.join(' ');
  };

  formatCompletion = (): string => {
    const d = new Date();
    d.setTime(
      this.remaining > 0
        ? this.remaining + Date.now()
        : this.endTime || this.total + Date.now(),
    );
    return d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };
}
