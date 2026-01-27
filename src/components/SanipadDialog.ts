import { css, CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

const TAG_NAME = 'sanipad-dialog';

const STYLE = css`
  :host {
    display: contents;
    pointer-events: auto;
  }
  dialog {
    color: #333;
    background: #fff;
    padding: 1em;
    border: 0;
    border-radius: 0.5em;
    box-shadow: 0 10px 25px #0002;
    overflow: visible;
    &::backdrop {
      background-color: #8888;
    }
  }
  form {
    max-width: min(60vw, 40em);
    max-height: 80vh;
    overflow: auto;
    padding: 0.5em;
  }
  button {
    all: unset;
    display: flex;
    cursor: pointer;
    position: absolute;
    top: -0.5em;
    right: -0.5em;
    color: #fff;
    background: #333;
    &:is(:hover, :active, :focus) {
      background: #666;
    }
    &:is(:focus-visible, :active) {
      outline: 2px solid #4f88;
    }
  }
  ::slotted(:is(*, #_)) {
    border-color: #8888;
  }
  ::slotted(:is(h1, h2, h3, h4, h5, h6, #_)) {
    color: #666;
  }
  ::slotted(:is(h1, h2, h3, h4, h5, h6):first-child) {
    margin-top: 0;
    font-size: 1.4rem;
  }
  ::slotted(h1) {
    font-size: 1.4rem;
    border-bottom: 3px double;
  }
  ::slotted(h2) {
    font-size: 1.3rem;
    border-bottom: 1px solid;
  }
  ::slotted(h3) {
    font-size: 1.2rem;
    border-bottom: 1px dashed;
  }
  ::slotted(h4) {
    font-size: 1.1rem;
  }
  ::slotted(h5) {
    font-size: 1rem;
  }
  ::slotted(h6) {
    font-size: 0.9rem;
  }
  ::slotted(p) {
    text-align: justify;
  }
`;

@customElement(TAG_NAME)
export class SanipadDialog extends LitElement {
  static override styles?: CSSResultGroup = STYLE;

  @query('dialog')
  private _dialog!: HTMLDialogElement;

  @property({ type: Boolean })
  open = false;

  protected override render(): unknown {
    return html`
      <dialog @close=${() => this.hide()} @mousedown=${this.#handleMouseDown}>
        <form method="dialog">
          <slot></slot>
          <button aria-label="ダイアログを閉じる">
            <ui-icon type="close"></ui-icon>
          </button>
        </form>
      </dialog>
    `;
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('open')) {
      if (this._dialog.open) {
        if (!this.open) this._dialog.close();
      } else {
        if (this.open) this._dialog.showModal();
      }
    }
  }

  show(): void {
    this.open = true;
  }

  hide(): void {
    this.open = false;
  }

  #handleMouseDown = (e: MouseEvent): void => {
    const rect = this._dialog.getBoundingClientRect();
    if (
      e.clientX < rect.x ||
      e.clientX > rect.x + rect.width ||
      e.clientY < rect.y ||
      e.clientY > rect.y + rect.height
    ) {
      this.hide();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: SanipadDialog;
  }
}
