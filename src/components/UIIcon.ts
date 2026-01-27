import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const TAG_NAME = 'ui-icon';

const STYLE = css`
  :host {
    display: inline-flex;
    vertical-align: middle;
    width: 1.5em;
    height: 1.5em;
  }
  svg {
    vertical-align: middle;
    flex: 1;
    place-self: center;
    justify-self: stretch;
    fill: currentColor;
  }
  path {
    transform-box: view-box;
    transform-origin: center;
  }
`;

type PathAttr = {
  d: string;
  fill?: string;
  transform?: string;
};

const PATH_ATTRS = new (class PathAttrs {
  arrowhead: PathAttr = { d: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z' };
  'arrow-up': PathAttr = this.arrowhead;
  'arrow-down': PathAttr = { ...this.arrowhead, transform: 'rotate(180)' };
  'arrow-left': PathAttr = { ...this.arrowhead, transform: 'rotate(-90)' };
  'arrow-right': PathAttr = { ...this.arrowhead, transform: 'rotate(90)' };

  close: PathAttr = {
    d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  };

  swap: PathAttr = {
    d: 'M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z',
  };
  'swap-vertical': PathAttr = this.swap;
  'swap-horizontal': PathAttr = { ...this.swap, transform: 'rotate(90)' };

  'zoom-in': PathAttr = {
    d: 'M11 4C7.13 4 4 7.13 4 11s3.13 7 7 7c1.56 0 2.99-.51 4.15-1.37l2.14 2.14c.39.39 1.03.39 1.42 0s.39-1.03 0-1.42l-2.14-2.14C17.49 13.99 18 12.56 18 11c0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm3-5.5h-2.5V8h-1v2.5H8v1h2.5V14h1v-2.5H14v-1z',
  };

  help: PathAttr = {
    d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
    transform: 'scale(0.8)',
  };

  settings: PathAttr = {
    d: 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.41 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z',
    transform: 'scale(0.8)',
  };

  error: PathAttr = {
    d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    fill: '#ff4444',
  };
})();

export type UIIconType = keyof typeof PATH_ATTRS;

@customElement(TAG_NAME)
export class UIIcon extends LitElement {
  static styles = STYLE;

  @property({ reflect: true })
  type!: UIIconType;

  protected override render(): unknown {
    const key = this.type in PATH_ATTRS ? this.type : 'error';
    return html`<svg viewBox="0 0 24 24" role="presentation">
      <path
        d="${PATH_ATTRS[key].d}"
        transform="${PATH_ATTRS[key].transform ?? null}"
        fill=${PATH_ATTRS[key].fill ?? null}
      />
    </svg>`;
  }

  protected override firstUpdated(): void {
    this.setAttribute('role', 'presentation');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: UIIcon;
  }
}
