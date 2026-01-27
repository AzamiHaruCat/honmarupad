import {
  css,
  CSSResultGroup,
  html,
  HTMLTemplateResult,
  LitElement,
  PropertyValues,
} from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import {
  MultiTimerContainer,
  MultiTimerController,
} from '../controllers/MultiTimerController';
import { NotificationSound } from '../controllers/NotificationController';
import { StorageContainer, StorageController } from '../controllers/StorageController';
import { TimerData } from '../controllers/TimerController';
import { JsonObject, Serializable } from '../interfaces/Serializable';
import { BUTTON_STYLE } from '../styles/button.style';
import { INPUT_STYLE } from '../styles/input.style';
import { playBeeps } from '../util/audio';
import { sleep } from '../util/sleep';
import { SanipadDialog } from './SanipadDialog';
import { SanipadTimerItem } from './SanipadTimerItem';
import { ApplyPresetEvent } from './SanipadTimerPresets';
import { TimeInput } from './TimeInput';

const TAG_NAME = 'sanipad-timer';

const DEFAULT_LABELS = Object.freeze(
  Array.from('壱弐参四五六七八九十', (c) => `砂時計 ${c}`),
);

const STYLE = css`
  :host {
    display: flex;
    align-items: end;
    justify-content: space-around;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    padding: 0 20px 30px;
  }
  :host([active]) {
    pointer-events: auto;
  }
  h1 {
    display: flex;
    input {
      flex: 1;
      min-width: 10em;
    }
  }
  button {
    min-width: 5em;
  }
  label {
    display: flex;
  }
  .inputs,
  .buttons,
  .sounds {
    display: flex;
    gap: 0.5em;
    margin: 0.5em 0;
  }
  .start {
    flex: 1;
    gap: 0.5em;
  }
  .close {
    margin-left: auto;
  }
`;

export interface LabeledTimerData extends TimerData {
  label: string;
}

export interface TimerSetting extends JsonObject {
  timers: LabeledTimerData[];
  sound: NotificationSound;
}

@customElement(TAG_NAME)
export class SanipadTimer
  extends LitElement
  implements MultiTimerContainer, StorageContainer, Serializable<TimerSetting>
{
  static override styles?: CSSResultGroup = [STYLE, BUTTON_STYLE, INPUT_STYLE];

  readonly _multiTimer: MultiTimerController = new MultiTimerController(this);
  readonly _storage: StorageController = new StorageController(this);

  @property({ type: Boolean, reflect: true })
  active = false;

  @query('sanipad-dialog')
  _dialog!: SanipadDialog;

  @query('ui-time-input')
  _timeInput!: TimeInput;

  @query('input[name="label"]')
  _labelInput!: HTMLInputElement;

  @queryAll('sanipad-timer-item')
  _items!: NodeListOf<SanipadTimerItem>;

  @state()
  _labels = Array.from(DEFAULT_LABELS);

  @state()
  _currentItem: SanipadTimerItem | null = null;

  serialize(): TimerSetting {
    const timers = this._multiTimer.timers.map((timer, i) => ({
      label: this._labels[i],
      ...timer.serialize(),
    }));
    return { timers, sound: this._multiTimer.sound };
  }

  unserialize(value: TimerSetting): void {
    this._multiTimer.timers.forEach((timer, i) => {
      const data = value.timers[i];
      if (data) {
        timer.unserialize(data);
        this._labels[i] = data.label ?? this._labels[i];
      }
    });

    this._multiTimer.sound = value.sound;
    this.requestUpdate();
  }

  protected override render(): unknown {
    return html`
      ${this._labels.map((label, i) => this.#renderItem(label || DEFAULT_LABELS[i]))}
      <sanipad-dialog>${this.#renderDialogContent()}</sanipad-dialog>
    `;
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    this.updateComplete.then(() => this._storage.load());
  }

  #renderItem(label: string): HTMLTemplateResult {
    return html`
      <sanipad-timer-item
        label=${label}
        ?active=${this.active}
        @click=${this.#handleItemClick}
        @timer-done=${this.#handleTimerDone}
      ></sanipad-timer-item>
    `;
  }

  #renderDialogContent(): HTMLTemplateResult | null {
    const item = this._currentItem;
    if (!item) return null;

    const totalMinutes = Math.floor(item._timer.total / 60_000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const isWorking = item._timer.remaining > 0;
    const isAvailable = !isWorking && item._timer.total > 0;

    return html`
      <h1>
        <input
          type="text"
          name="label"
          .value=${item.label}
          @change=${this.#handleLabelChange}
        />
      </h1>
      <div class="sounds">通知音(共通): ${this.#renderSoundSelect()}</div>
      <div class="inputs">
        <ui-time-input
          autofocus
          hours=${hours}
          minutes=${minutes}
          ?disabled=${isWorking}
          @input=${this.#updateTimer}
          @keydown=${this.#handleStartIfEnter}
        ></ui-time-input>
        <button
          class="start"
          type="button"
          ?disabled=${!isAvailable}
          @click=${this.#handleStart}
        >
          開始
          <small>(${item._timer.formatCompletion()} 完了予定)</small>
        </button>
      </div>
      <div class="buttons">
        <button
          class="stop"
          type="button"
          ?hidden=${!isWorking}
          @click=${this.#handleStop}
        >
          停止
        </button>
        <button class="close" type="button" @click=${() => this._dialog.hide()}>
          閉じる
        </button>
      </div>
      ${!isWorking
        ? html`
            <h2>既定値から入力</h2>
            <sanipad-timer-presets
              @apply-preset=${this.#applyPreset}
            ></sanipad-timer-presets>
          `
        : ''}
    `;
  }

  #renderSoundSelect(): HTMLTemplateResult[] {
    return Object.entries(this._multiTimer.soundOptions).map(
      ([key, icon]) => html`
        <label>
          <input
            type="radio"
            name="sound"
            .checked=${this._multiTimer.sound === key}
            @click="${this.#handleSoundClick}"
            @change=${() => {
              this._multiTimer.sound = key as NotificationSound;
              this._storage.requestSave();
            }}
          />${icon}
        </label>
      `,
    );
  }

  #handleSoundClick = () => {
    // changeの後に回す
    sleep(10).then(() => this._multiTimer.playSound());
  };

  #handleLabelChange = (): void => {
    const item = this._currentItem;
    if (!item) return;

    const input = this._labelInput;
    const newLabel =
      input.value.trim() || DEFAULT_LABELS[Array.from(this._items).indexOf(item)];
    item.label = newLabel;
    input.value = newLabel;

    this._labels = Array.from(this._items, (it) => it.label);
    this._storage.requestSave();
  };

  #handleStart = (): void => {
    const timer = this._currentItem?._timer;
    if (!timer || timer.remaining > 0 || timer.total <= 0) return;

    playBeeps(['C5', 'G5']);

    timer.start();
    this._dialog.hide();
    this.requestUpdate();
    this._storage.requestSave();
  };

  #handleStartIfEnter = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') this.#handleStart();
  };

  #handleStop = (): void => {
    const timer = this._currentItem?._timer;
    if (!timer) return;

    playBeeps(['F5', 'A4']);

    timer.reset();
    this.requestUpdate();
    this.updateComplete.then(() => this._timeInput.focus());
    this._storage.requestSave();
  };

  #applyPreset = (e: ApplyPresetEvent): void => {
    const item = this._currentItem;
    if (!item) return;

    const { label, seconds } = e.detail;
    item.label = label;
    item._timer.total = seconds * 1000;
    this._labelInput.value = label;

    this._labels = Array.from(this._items, (it) => it.label);
    this._storage.requestSave();
  };

  #handleItemClick = (e: Event): void => {
    const target = e.currentTarget as SanipadTimerItem;
    this._currentItem = target;
    target.blur();
    this._dialog.show();
    this.updateComplete.then(() => this._timeInput.focus());
  };

  #handleTimerDone = () => {
    this.requestUpdate();
    this._storage.requestSave();
  };

  #updateTimer = (): void => {
    const item = this._currentItem;
    if (!item) return;

    const { hours, minutes } = this._timeInput;
    item._timer.total = (hours * 60 + minutes) * 60_000;
    this.requestUpdate();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: SanipadTimer;
  }
}
