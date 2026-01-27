import { css, CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { INPUT_STYLE } from '../styles/input.style';

const TAG_NAME = 'ui-time-input';

const STYLE = css`
  :host {
    display: inline-flex;
    gap: 0.5em;
  }
  input {
    width: 3em;
  }
`;

@customElement(TAG_NAME)
export class TimeInput extends LitElement {
  static override styles?: CSSResultGroup = [STYLE, INPUT_STYLE];

  @query('input[name="hours"]')
  _hoursInput!: HTMLInputElement;

  @query('input[name="minutes"]')
  _minutesInput!: HTMLInputElement;

  @property({ type: Boolean })
  autofocus = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Number })
  hours = 0;

  @property({ type: Number })
  minutes = 0;

  #isUserAction = false;
  #doneUserAction = false;

  override connectedCallback(): void {
    super.connectedCallback();
    super.addEventListener('focusout', this.#handleFocusout);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    super.removeEventListener('focusout', this.#handleFocusout);
  }

  #handleFocusout = (e: FocusEvent): void => {
    if (this.contains(e.relatedTarget as Element)) return;
    if (this.#doneUserAction) {
      this.#doneUserAction = false;
      const { hours, minutes } = this;
      this.dispatchEvent(new CustomEvent('change', { detail: { hours, minutes } }));
    }
  };

  override focus(options?: FocusOptions): void {
    this.updateComplete.then(() => this._hoursInput?.focus(options));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('hours') || changedProperties.has('minutes')) {
      const step = parseInt(this._minutesInput?.step || '1');

      let { hours, minutes } = this;

      if (hours > 99) {
        hours = 99;
      } else if (hours < 0) {
        hours = 0;
      }

      if (minutes >= 60) {
        if (hours < 99) {
          hours++;
          minutes = 0;
        } else {
          minutes = 59;
        }
      } else if (minutes < 0) {
        if (hours > 0) {
          hours--;
          minutes = 60 - step;
        } else {
          minutes = 0;
        }
      }

      this.hours = hours;
      this.minutes = minutes;

      if (this.#isUserAction) {
        this.#isUserAction = false;
        this.#doneUserAction = true;
        this.updateComplete.then(() => {
          const { hours, minutes } = this;
          this.dispatchEvent(new CustomEvent('input', { detail: { hours, minutes } }));
        });
      }
    }
  }

  protected override render(): unknown {
    return html`
      <label>
        <input
          name="hours"
          type="number"
          min="0"
          max="99"
          step="1"
          value="0"
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @focus=${(e: Event) => (e.target as HTMLInputElement).select()}
          @input=${() => {
            this.hours = Number(this._hoursInput.value);
            this.#isUserAction = true;
          }}
        />h
      </label>
      <label>
        <input
          name="minutes"
          type="number"
          min="-10"
          max="60"
          step="10"
          value="0"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @focus=${(e: Event) => (e.target as HTMLInputElement).select()}
          @input=${() => {
            this.minutes = Number(this._minutesInput.value);
            this.#isUserAction = true;
          }}
        />m
      </label>
    `;
  }

  protected override updated(_changedProperties: PropertyValues): void {
    if (Number(this._hoursInput.value) !== this.hours) {
      this._hoursInput.value = String(this.hours);
    }
    if (Number(this._minutesInput.value) !== this.minutes) {
      this._minutesInput.value = String(this.minutes);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: TimeInput;
  }
}
