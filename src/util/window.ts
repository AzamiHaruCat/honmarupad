export const isAppWindow = () =>
  window.matchMedia('(display-mode: standalone), (display-mode: minimal-ui)').matches;

const windowHasName = !!window.name;
export const isPopupWindow = () => windowHasName && window === window.top;
