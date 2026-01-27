import { css, CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { requestSave } from '../controllers/StorageController';
import { TimerContainer, TimerController } from '../controllers/TimerController';
import HOURGLASS_SVG from '../data/hourglass.svg?raw';

const TAG_NAME = 'sanipad-timer-item';

const HOURGLASS_TEMPLATE = html`${unsafeHTML(HOURGLASS_SVG)}`;

const STYLE = css`
  :host {
    display: block;
    width: 8em;
    white-space: nowrap;
    transition:
      opacity 0.1s ease-out,
      transform 0.1s ease-out;
  }
  :host(:not([active], [completed])) {
    opacity: 0;
    transform: translateY(30px);
  }
  [hidden] {
    display: none !important;
  }
  button {
    all: unset;
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    position: relative;
    cursor: pointer;
  }
  svg {
    display: block;
    width: 80px;
    height: 80px;
    pointer-events: auto;
    filter: contrast(130%);
    transition: padding 0.2s ease-in;
  }
  :host(:not([completed], [running])) {
    :hover svg {
      padding-bottom: 10px;
    }
    :is(:hover, :active, :focus, :host([completed])) svg {
      animation: sway 0.5s ease-in infinite;
    }
  }
  span {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: fit-content;
    filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 2px #fff) drop-shadow(0 0 2px #fff)
      drop-shadow(0 0 2px #fff) drop-shadow(0 0 2px #fff);
  }
  .remaining,
  .completion,
  .completed {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }
  .remaining {
    top: 20px;
    font-weight: bold;
    text-decoration: underline;
  }
  .completion {
    top: 45px;
    font-size: 85%;
    flex-flow: row;
  }
  .completed {
    top: 20px;
    font-weight: bold;
    strong {
      display: block;
      color: #e40;
      border: 1px solid currentColor;
      border-radius: 80% / 100%;
      padding: 0 0.5em;
    }
  }
  @keyframes sway {
    0%,
    100% {
      transform-origin: 50%;
    }
    25% {
      transform-origin: 50% 25%;
      transform: rotate(5deg);
    }
    75% {
      transform-origin: 50% 75%;
      transform: rotate(-5deg);
    }
  }
`;

@customElement(TAG_NAME)
export class SanipadTimerItem extends LitElement implements TimerContainer {
  static override styles?: CSSResultGroup = STYLE;

  readonly _timer: TimerController = new TimerController(this);

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: Boolean, reflect: true })
  completed = false;

  @property({ type: Boolean, reflect: true })
  running = false;

  @query('button')
  _button!: HTMLButtonElement;

  @state()
  private _hidden = true;

  #hiddenTimer?: number;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.#hiddenTimer);
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('active') && this.active) {
      clearTimeout(this.#hiddenTimer);
      this._hidden = false;
    }

    this.completed = this._timer.isCompleted;
    this.running = this._timer.isRunning;
  }

  protected override render(): unknown {
    const status = this.completed
      ? html`<span class="completed">
          <time>${this._timer.formatCompletion()}</time>
          <strong>完了</strong>
        </span>`
      : this.running
        ? html`
            <span class="remaining">${this._timer.formatRemaining()}</span>
            <span class="completion">
              <time>${this._timer.formatCompletion()}</time>完了
            </span>
          `
        : null;

    return html`
      <button
        type="button"
        aria-label="${this.label} タイマー"
        ?hidden=${this._hidden && !this.completed}
        @click=${this.#handleClick}
      >
        <main class="visual">${HOURGLASS_TEMPLATE}</main>
        <main class="status">
          <span class="label">${this.label}</span>
          ${status}
        </main>
      </button>
    `;
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('active') && !this.active) {
      clearTimeout(this.#hiddenTimer);
      this.#hiddenTimer = setTimeout(() => (this._hidden = true), 200);
    }
  }

  #handleClick = (e: Event): void => {
    if (this.completed) {
      e.stopPropagation();

      this._timer.endTime = 0;
      this.requestUpdate();
      requestSave(this);

      this.blur();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: SanipadTimerItem;
  }
}
