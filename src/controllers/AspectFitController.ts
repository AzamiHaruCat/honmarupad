import { ReactiveController, ReactiveControllerHost } from 'lit';
import { skipFrame, sleep } from '../util/sleep';
import { isAppWindow, isPopupWindow } from '../util/window';

export interface AspectFitOptions {
  width: number;
  height: number;
  scrollTarget: 'head' | 'body' | 'foot';
}

export interface AspectFitContainer extends ReactiveControllerHost, HTMLElement {}

export class AspectFitController implements ReactiveController {
  #host: AspectFitContainer;

  readonly options: AspectFitOptions = {
    width: 0,
    height: 0,
    scrollTarget: 'head',
  };

  scale = 1;
  aspectRatio!: number;

  #scrollingPromise: Promise<void> | null = null;
  #resizeTimer?: number;
  #isResizing = false;

  get isScrollable(): boolean {
    return this.options.scrollTarget !== 'body';
  }

  constructor(host: AspectFitContainer, options: AspectFitOptions) {
    (this.#host = host).addController(this);
    this.setDimension(options.width, options.height);
    this.setTarget(options.scrollTarget);
  }

  hostConnected(): void {
    window.addEventListener('resize', this.handleResize);
  }

  hostDisconnected(): void {
    window.removeEventListener('resize', this.handleResize);
    clearTimeout(this.#resizeTimer);
  }

  setDimension(width: number, height: number): void {
    Object.assign(this.options, { width, height });
    this.aspectRatio = width / height;
  }

  setTarget(value: AspectFitOptions['scrollTarget']): void {
    this.options.scrollTarget = value;
  }

  handleResize = (): void => {
    clearTimeout(this.#resizeTimer);
    this.#resizeTimer = window.setTimeout(this.adjust, 200);
  };

  hideScrollbar = (): void => {
    const value = this.isScrollable ? '' : 'hidden';
    document.body.style.overflow = value;
  };

  adjust = async (): Promise<void> => {
    if (this.#isResizing) return;

    this.hideScrollbar();
    await skipFrame();

    const { width, height } = this.options;
    const { clientWidth, clientHeight } = document.documentElement;
    if (clientWidth === 0 || clientHeight === 0) return;

    const screenRatio = clientWidth / clientHeight;
    this.scale =
      screenRatio > this.aspectRatio ? clientHeight / height : clientWidth / width;

    if (this.isScrollable) {
      this.#host.style.transform = '';
    } else {
      const isMaximized =
        window.outerWidth >= screen.availWidth &&
        window.outerHeight >= screen.availHeight;

      if (!isMaximized && (isAppWindow() || isPopupWindow())) {
        const { clientWidth, clientHeight } = document.documentElement;
        if (
          Math.abs(clientWidth - width * this.scale) > 1 ||
          Math.abs(clientHeight - height * this.scale) > 1
        ) {
          await this.resize(100 * this.scale);
          clearTimeout(this.#resizeTimer);
        }
      }

      this.#host.style.transform = `scale(${this.scale})`;
    }

    this.#host.requestUpdate();
    await this.#host.updateComplete;
    await this.scrollToTarget();
  };

  resize = async (percent: number): Promise<void> => {
    if (!(isAppWindow() || isPopupWindow())) return;

    if (this.#isResizing) return;

    this.hideScrollbar();
    await skipFrame();

    const { width, height } = this.options;
    const targetWidth = Math.round((width * percent) / 100);
    const targetHeight = Math.round((height * percent) / 100);

    const getMargin = () => ({
      width: window.outerWidth - document.documentElement.clientWidth,
      height: window.outerHeight - document.documentElement.clientHeight,
    });

    const initialMargin = getMargin();
    const sizeMatch =
      Math.abs(window.outerWidth - (targetWidth + initialMargin.width)) < 1 &&
      Math.abs(window.outerHeight - (targetHeight + initialMargin.height)) < 1;

    if (sizeMatch) return;

    this.#isResizing = true;
    try {
      window.resizeBy(-1, -1);
      window.resizeBy(1, 1);
      await sleep(100);

      const margin = getMargin();
      window.resizeTo(targetWidth + margin.width, targetHeight + margin.height);
      await sleep(100);
    } finally {
      this.#isResizing = false;
    }
  };

  scrollToTarget = (): Promise<void> => {
    const target = this.options.scrollTarget;
    const rect = this.#host.getBoundingClientRect();

    const top =
      target === 'body'
        ? window.scrollY + rect.y || 0
        : target === 'foot'
          ? window.scrollY + rect.y + rect.height || 0
          : 0;

    let left = 0;
    if (target === 'body') {
      left = window.scrollX + rect.x;

      const { clientWidth } = document.documentElement;
      if (rect.width < clientWidth) {
        left -= (clientWidth - rect.width) / 2;
      }

      left = Math.max(0, left);
    }

    window.scrollTo({ top, left, behavior: 'smooth' });
    return this.waitForScroll();
  };

  waitForScroll = (): Promise<void> => {
    if (this.#scrollingPromise) return this.#scrollingPromise;

    return (this.#scrollingPromise = (async () => {
      let lastX = window.scrollX;
      let lastY = window.scrollY;
      let frameCount = 0;

      while (true) {
        await skipFrame();

        const currentX = window.scrollX;
        const currentY = window.scrollY;

        if (currentX !== lastX || currentY !== lastY) {
          lastX = currentX;
          lastY = currentY;
          frameCount = 0;
        } else if (frameCount++ < 5) {
          continue;
        } else {
          break;
        }
      }

      this.#scrollingPromise = null;
    })());
  };
}
