import { css, CSSResultGroup, html, HTMLTemplateResult, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import HELP_MD from '../data/help.md?raw';
import { BUTTON_STYLE } from '../styles/button.style';
import { parseSimpleMarkdown } from '../util/markdown';
import { isAppWindow, isPopupWindow } from '../util/window';
import { SanipadArea } from './SanipadArea';
import { SanipadDialog } from './SanipadDialog';

const TAG_NAME = 'sanipad-menu';

const HELP_CONTENT = html`${unsafeHTML(parseSimpleMarkdown(HELP_MD))}`;

const STYLE = css`
  :host {
    display: flex;
    align-items: end;
    gap: 5px;
    padding: 15px 5px 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    user-select: none;
    pointer-events: auto;
    transition: opacity 0.3s ease;
  }
  :host(:not([active])) {
    opacity: 0;
    padding-top: 0;
  }
  button {
    margin: 0;
    height: 20px;
    &:hover {
      height: 30px;
    }
  }
`;

@customElement(TAG_NAME)
export class SanipadMenu extends LitElement {
  static override styles?: CSSResultGroup = [STYLE, BUTTON_STYLE];

  @query('sanipad-dialog')
  private _dialog!: SanipadDialog;

  @property({ type: Boolean, reflect: true })
  active = false;

  get parentArea() {
    return this.closest('sanipad-area')!;
  }

  private get fitTarget() {
    return this.parentArea.fitTarget;
  }
  private set fitTarget(val: SanipadArea['fitTarget']) {
    this.parentArea.fitTarget = val;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('blur', this.#handleFocusOut, { capture: true });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('blur', this.#handleFocusOut, { capture: true });
  }

  #handleFocusOut = (_e: FocusEvent): void => {
    if (!this.matches(':hover, :active, :focus')) {
      this._dialog.open = false;
    }
  };

  protected override render(): unknown {
    return html`
      <button type="button" @click=${() => this.#changeTarget('head')}>
        <ui-icon type="arrow-up"></ui-icon>
        トップ
      </button>
      <button type="button" @click=${() => this.#changeTarget('foot')}>
        <ui-icon type="arrow-down"></ui-icon>
        お知らせ
      </button>
      ${this.#renderZoomButton()}
      <button type="button" @click=${() => this._dialog.show()}>
        <ui-icon type="help"></ui-icon>
        使い方
      </button>
      <sanipad-dialog>${HELP_CONTENT}</sanipad-dialog>
    `;
  }

  #renderZoomButton(): HTMLTemplateResult | HTMLTemplateResult[] | null {
    if (!(isAppWindow() || isPopupWindow())) {
      if (this.fitTarget !== 'body') return null;

      return html`
        <button type="button" @click=${() => this.#changeTarget('body')}>
          <ui-icon type="zoom-in"></ui-icon>
          集中モード
        </button>
      `;
    }

    return [100, 90, 80, 70, 60, 50].map((percent) => {
      const labelText = `${percent}%`;
      const key = labelText.slice(-3, -2);
      const labelHTML = unsafeHTML(labelText.replace(key, `<kbd>${key}</kbd>`));
      return html`
        <button
          type="button"
          accesskey=${String(percent).slice(-2, -1)}
          title="ショートカット: Alt + ${key}"
          @click=${() => {
            this.#changeTarget('body');
            this.parentArea.resize(percent);
          }}
        >
          <ui-icon type="zoom-in"></ui-icon>
          ${labelHTML}
        </button>
      `;
    });
  }

  #changeTarget(value: SanipadArea['fitTarget']): void {
    if (this.fitTarget === value) {
      this.parentArea.adjust(); // 強制スクロール
    } else {
      this.fitTarget = value;
      this.requestUpdate();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: SanipadMenu;
  }
}
