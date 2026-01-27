import { css } from 'lit';

export const INPUT_STYLE = css`
  :where(
    input:not(
      [type='hidden'],
      [type='checkbox'],
      [type='radio'],
      [type='button'],
      [type='submit'],
      [type='reset']
    )
  ) {
    all: unset;
    display: inline-block;

    &:is([hidden], #_#_#_#_#_) {
      display: none;
    }

    margin: 2px;
    padding: 0.2em;
    border: 1px solid #aaa;
    border-radius: 1px;
    color: #333;
    background: #fff;
    box-sizing: border-box;
    contain: paint;

    &::selection {
      color: currentColor;
      background: #cef;
    }

    cursor: text;
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

      &:where(:focus-visible, :active) {
        outline: 2px solid #4f88;
      }
    }
  }
`;
