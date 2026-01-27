import {
  css,
  CSSResultGroup,
  html,
  HTMLTemplateResult,
  LitElement,
  TemplateResult,
} from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';
import { PRESETS } from '../constatnts/presets';
import { BUTTON_STYLE } from '../styles/button.style';

const TAG_NAME = 'sanipad-timer-presets';

const STYLE = css`
  ul,
  li,
  details,
  summary {
    all: unset;
  }
  :host {
    display: block;
    user-select: none;
  }
  :host > ul {
    display: grid;
    gap: 0.5em;
    grid-template: repeat(5, auto) / auto 1fr;
    & > :has([open]) {
      grid-column: 2;
      grid-row: 1 / -1;
    }
    & > :where(:nth-child(1)) {
      grid-row: 1;
    }
    & > :where(:nth-child(2)) {
      grid-row: 2;
    }
    & > :where(:nth-child(3)) {
      grid-row: 3;
    }
    & > :where(:nth-child(4)) {
      grid-row: 4;
    }
    & > :where(:nth-child(5)) {
      grid-row: 5;
    }
  }
  details {
    display: block;
    border: 1px solid #ccc;
    border-radius: 1px;
    summary {
      display: flex;
      padding: 0.2em 0;
      padding-right: 0.5em;
      cursor: pointer;
    }
    ul {
      display: block;
      margin: 0.5em;
    }
    li {
      display: flex;
    }
  }
  button {
    flex: 1;
    justify-content: space-between;
    gap: 0.5em;
    padding: 0.2em 0.5em;
  }
  ui-icon {
    display: none;
  }
  details[open] ui-icon.open {
    display: inline-block;
  }
  details:not([open]) ui-icon.close {
    display: inline-block;
  }
`;

export class ApplyPresetEvent extends CustomEvent<{ label: string; seconds: number }> {
  constructor(label: string, seconds: number) {
    super('apply-preset', { detail: { label, seconds } } as CustomEventInit);
  }
}

@customElement(TAG_NAME)
export class SanipadTimerPresets extends LitElement {
  static override styles?: CSSResultGroup = [STYLE, BUTTON_STYLE];

  @queryAll('details')
  _details!: NodeListOf<HTMLDetailsElement>;

  protected override render(): unknown {
    return html`
      <ul>
        ${Object.entries(PRESETS).map(
          ([category, data]) => html` <li>${this.#renderCategory(category, data)}</li> `,
        )}
      </ul>
    `;
  }

  #renderCategory(category: string, data: Record<string, number>): HTMLTemplateResult {
    return html`
      <details>
        <summary @click=${this.#closeOtherDetails}>
          <ui-icon class="close" type="arrow-right"></ui-icon>
          <ui-icon class="open" type="arrow-down"></ui-icon>
          ${category}
        </summary>
        <ul>
          ${Object.entries(data).map(
            ([label, sec]) => html`<li>${this.#renderButton(label, sec)}</li>`,
          )}
        </ul>
      </details>
    `;
  }

  #renderButton(label: string, sec: number): TemplateResult {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const time = [`${hours}h`, `${minutes}m`].filter((s) => s[0] !== '0').join(' ');
    return html`
      <button @click=${() => this.#applyPreset(label, sec)}>
        ${label} <small>(${time})</small>
      </button>
    `;
  }

  #applyPreset = (label: string, seconds: number): void => {
    this.dispatchEvent(new ApplyPresetEvent(label, seconds));
    this._details.forEach((el) => (el.open = false));
  };

  #closeOtherDetails = (e: Event): void => {
    const target = e.target as HTMLElement;

    this._details.forEach((details) => {
      if (details.open && !details.contains(target)) {
        details.open = false;
      }
    });
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: SanipadTimerPresets;
  }
}
