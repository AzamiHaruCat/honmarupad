import { css } from 'lit';

export const BUTTON_STYLE = css`
  :where(button) {
    all: unset;
    display: inline-flex;

    &:is([hidden], #_#_#_#_#_) {
      display: none;
    }

    align-items: baseline;
    justify-content: center;

    &:where(:has(ui-icon)) {
      align-items: center;
    }

    margin: 2px;
    padding: 0.2em;
    border: 1px solid #aaa;
    border-radius: 0.25em / 35%;
    color: #333;
    background: #fff;
    box-shadow: 0 1px 2px -1px #8888;
    box-sizing: border-box;
    contain: paint;

    cursor: pointer;
    user-select: none;
    pointer-events: auto;

    &:is([disabled], #_#_#_#_#_) {
      cursor: default;
      pointer-events: none;
      filter: contrast(25%) brightness(150%);
    }

    &:where(:not([disabled])) {
      transition:
        all 0.2s ease-out,
        outline 0s;

      &:where(:hover, :active, :focus) {
        color: #820;
        background: #fec;
        border-color: currentColor;
      }

      &:where(:focus-visible, :active) {
        outline: 2px solid #4f88;
      }
    }

    :where(kbd) {
      all: unset;
      text-decoration: underline;
    }
  }
`;
