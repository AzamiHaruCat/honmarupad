import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const TAG_NAME = 'sanipad-honmarupad';

const STYLE = css`
  :host {
    display: contents;
    font:
      14px / 1.5 Verdana,
      'Noto Sans JP',
      sans-serif;
    pointer-events: none;
  }
`;

@customElement(TAG_NAME)
export class SanipadHonmarupad extends LitElement {
  static override styles?: CSSResultGroup = STYLE;

  @state()
  private _isActive = false;

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('blur', this.#inactivate);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('blur', this.#inactivate);
  }

  protected override render(): unknown {
    return html`
      <sanipad-area id="area">
        <sanipad-menu
          id="menu"
          ?active=${this._isActive}
          @focusin=${this.#activate}
          @mouseenter=${this.#activate}
        ></sanipad-menu>
        <sanipad-timer id="timer" ?active=${this._isActive}></sanipad-timer>
      </sanipad-area>
    `;
  }

  #activate = (): void => {
    if (!this.matches(':focus')) window.focus();
    this._isActive = true;
  };

  #inactivate = (): void => {
    this._isActive = false;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: SanipadHonmarupad;
  }
}
