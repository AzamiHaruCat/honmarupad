import { css, CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  AspectFitContainer,
  AspectFitController,
  AspectFitOptions,
} from '../controllers/AspectFitController';
import { isAppWindow, isPopupWindow } from '../util/window';

const TAG_NAME = 'sanipad-area';

const TARGET_WIDTH = 1136;
const TARGET_HEIGHT = 660;

const STYLE = css`
  :host {
    display: block;
    width: ${TARGET_WIDTH}px;
    height: ${TARGET_HEIGHT}px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    transform-origin: 50% 0;
    contain: layout;
  }
  :host(:not([ready])) {
    display: none;
  }
  ::slotted(*) {
    position: absolute;
  }
`;

@customElement(TAG_NAME)
export class SanipadArea extends LitElement implements AspectFitContainer {
  static override styles?: CSSResultGroup = STYLE;

  @property({ type: Boolean, reflect: true })
  ready = false;

  @property({ type: Number })
  fitWidth: AspectFitOptions['width'] = TARGET_WIDTH;

  @property({ type: Number })
  fitHeight: AspectFitOptions['height'] = TARGET_HEIGHT;

  @property()
  fitTarget: AspectFitOptions['scrollTarget'] =
    isAppWindow() || isPopupWindow() ? 'body' : 'head';

  readonly _fit: AspectFitController = new AspectFitController(this, {
    width: this.fitWidth,
    height: this.fitHeight,
    scrollTarget: this.fitTarget,
  });

  #observer?: MutationObserver;

  get #target() {
    return document.querySelector<HTMLElement>('main:has(#game_frame)');
  }

  adjust(): Promise<void> {
    return this._fit.adjust();
  }

  resize(percent: number): Promise<void> {
    return this._fit.resize(percent);
  }

  connectedCallback() {
    super.connectedCallback();
    this.#startObserving();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#observer?.disconnect();
  }

  protected override updated(changedProperties: PropertyValues): void {
    const target = this.#target;
    if (!target) return;

    if (
      changedProperties.has('fitWidth') ||
      changedProperties.has('fitHeight') ||
      changedProperties.has('fitTarget')
    ) {
      this._fit.setDimension(this.fitWidth, this.fitHeight);
      this._fit.setTarget(this.fitTarget);
      this._fit.adjust();
    }

    const computedStyle = window.getComputedStyle(target);
    const { paddingTop } = computedStyle;
    this.style.top = `calc(${target.offsetTop}px + ${paddingTop})`;
    Object.assign(target.style, {
      contain: 'layout paint',
      transformOrigin: `50% ${paddingTop}`,
      transform: this.style.transform,
    } as CSSStyleDeclaration);
  }

  protected override render(): unknown {
    return html`<slot></slot>`;
  }

  #startObserving() {
    if (this.#target) {
      this.ready = true;
      this.adjust();
      return;
    }

    this.#observer = new MutationObserver(() => {
      if (this.#target) {
        this.ready = true;
        this.adjust();
        this.#observer?.disconnect();
      }
    });

    this.#observer.observe(document.body, { childList: true, subtree: true });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: SanipadArea;
  }
}
