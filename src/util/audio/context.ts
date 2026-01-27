export const context = new AudioContext();

(() => {
  const unlock = async () => {
    window.removeEventListener('click', unlock);
    window.removeEventListener('keyup', unlock);
    if (context.state === 'suspended') await context.resume();
  };
  window.addEventListener('click', unlock);
  window.addEventListener('keyup', unlock);
})();

interface FrequencyOptions {
  startTime?: number;
  duration?: number;
  bend?: number;
}
export const setFrequency = (
  frequency: AudioParam,
  data: { [x: number]: number },
  { startTime, duration = 1, bend = 1 }: FrequencyOptions,
): void => {
  startTime ??= context.currentTime;

  Object.entries(data).forEach(([pos, freq]) => {
    if (Number(pos) === 0) {
      frequency.setValueAtTime(freq * bend, startTime);
    } else {
      frequency.exponentialRampToValueAtTime(
        freq * bend,
        startTime + duration * Number(pos),
      );
    }
  });
};

let reverbBuffer: AudioBuffer;
export const createReverb = (length = 1): ConvolverNode => {
  length *= context.sampleRate;

  if (!reverbBuffer) {
    reverbBuffer = context.createBuffer(2, length, context.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = reverbBuffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }
  }

  const convolver = context.createConvolver();
  convolver.buffer = reverbBuffer;
  return convolver;
};
