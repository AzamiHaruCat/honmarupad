import { ReactiveController, ReactiveControllerHost } from 'lit';
import { playBells, playBirdSong, playMeow } from '../util/audio';
import { sleep } from '../util/sleep';

export const NOTIFICATION_SOUNDS = Object.freeze({
  Bell: '🔔',
  Song: '🕊️',
  Meow: '🐱',
});

export type NotificationSound = keyof typeof NOTIFICATION_SOUNDS;

export interface NotificationContainer extends ReactiveControllerHost {}

export class NotificationController implements ReactiveController {
  readonly soundOptions = NOTIFICATION_SOUNDS;

  #host: NotificationContainer;
  #interval: ReturnType<typeof setInterval> | null = null;
  #hasCompleted: () => boolean;

  sound: NotificationSound = 'Bell';

  constructor(host: NotificationContainer, hasCompleted: () => boolean) {
    (this.#host = host).addController(this);
    this.#hasCompleted = hasCompleted;
  }

  hostDisconnected(): void {
    this.stop();
  }

  get isPlaying(): boolean {
    return this.#interval !== null;
  }

  play(): void {
    if (this.#interval) return;

    this.#executeSound();
    this.#interval = setInterval(() => {
      if (this.#hasCompleted()) {
        this.#executeSound();
      } else {
        this.stop();
      }
    }, 3600);
  }

  stop(): void {
    if (this.#interval) {
      clearInterval(this.#interval);
      this.#interval = null;
      this.#host.requestUpdate();
    }
  }

  #executeSound(): void {
    const currentInterval = this.#interval;

    switch (this.sound) {
      case 'Bell':
        playBells(['G6', 'G6', 'G6'], { duration: 2, delay: 0.3 });
        break;

      case 'Song':
        playBirdSong(2500 + Math.random() * 1500, { volume: 0.1 + Math.random() * 0.2 });
        sleep((1 + Math.random()) * 700).then(() => {
          if (this.#interval === currentInterval) {
            playBirdSong(3000 + Math.random() * 1000, {
              volume: 0.05 + Math.random() * 0.1,
            });
          }
        });
        break;

      case 'Meow':
        playMeow({ volume: 0.2 + Math.random() * 0.2 });
        sleep((1 + Math.random()) * 700).then(() => {
          if (this.#interval === currentInterval) {
            playMeow({
              duration: 0.5 + Math.random() * 0.5,
              volume: 0.1 + Math.random() * 0.1,
              bend: 0.8 + Math.random() * 0.4,
            });
          }
        });
        break;
    }
  }
}
