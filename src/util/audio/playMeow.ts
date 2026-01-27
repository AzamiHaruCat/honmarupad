import { sleep } from '../sleep';
import { context, createReverb, setFrequency } from './context';
import { type PlayOptions } from './playBeep';

export interface MeowOptions extends Omit<PlayOptions, 'type'> {
  bend?: number;
}

export const playMeow = async ({ duration, bend, volume }: MeowOptions = {}) => {
  if (context.state !== 'running') return;

  duration ??= 1 + Math.random() * 0.4;
  bend ??= 0.9 + Math.random() * 0.2;
  volume ??= 0.2 + Math.random() * 0.2;

  const now = context.currentTime;

  const mainGain = context.createGain();
  mainGain.connect(context.destination);

  const oscs = (
    [
      { type: 'sawtooth', detune: 0, gain: 0.6 },
      { type: 'square', detune: 5, gain: 0.3 },
      { type: 'triangle', detune: -5, gain: 0.4 },
    ] as CatOscillatorParams[]
  ).map((params) => {
    return createCatOscillator({ ...params, startTime: now, duration, bend });
  });

  const filters: BiquadFilterNode[] = (
    [
      { qValue: 5, data: { 0.0: 3400, 0.25: 2300, 0.5: 1200, 1.0: 550 } },
      { qValue: 4, data: { 0.0: 4000, 1.0: 400 } },
      { qValue: 6, data: { 0.0: 1800, 1.0: 800 } },
    ] as { qValue: number; data: { [x: number]: number } }[]
  ).map(({ qValue, data }) => {
    const filter = context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = qValue;
    setFrequency(filter.frequency, data, { startTime: now, duration, bend });
    return filter;
  });

  const hpFilter = context.createBiquadFilter();
  hpFilter.type = 'highpass';
  hpFilter.frequency.value = 200;

  const filterMix = context.createGain();
  filters.forEach((f) => f.connect(filterMix));
  filterMix.gain.value = Math.sqrt(filters.length);
  filterMix.connect(hpFilter);

  const lfo = context.createOscillator();
  lfo.frequency.setValueAtTime(32, now);
  const lfoGain = context.createGain();
  lfoGain.gain.setValueAtTime(0.2, now);
  lfo.connect(lfoGain);

  const env = context.createGain();
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(volume, now + duration * 0.1);
  env.gain.exponentialRampToValueAtTime(volume / 2, now + duration * 0.5);
  env.gain.exponentialRampToValueAtTime(0.01, now + duration);

  const reverb = createReverb();
  const reverbGain = context.createGain();
  reverbGain.gain.value = 0.15;

  env.connect(mainGain);
  env.connect(reverb);
  reverb.connect(reverbGain);
  reverbGain.connect(mainGain);

  hpFilter.connect(env);

  oscs.forEach(({ osc, g }) => {
    lfoGain.connect(g.gain);
    filters.forEach((f) => g.connect(f));

    osc.start(now);
    osc.stop(now + duration);
  });

  await sleep(duration * 1000);
};

interface CatOscillatorParams {
  type?: OscillatorType;
  startTime?: number;
  duration?: number;
  detune?: number;
  gain?: number;
  bend?: number;
}
const createCatOscillator = ({
  type = 'sine',
  startTime,
  duration = 1,
  detune = 0,
  gain = 0.5,
  bend = 1,
}: CatOscillatorParams) => {
  startTime ??= context.currentTime;

  const osc = context.createOscillator();
  osc.type = type;
  osc.detune.setValueAtTime(detune, startTime);

  setFrequency(
    osc.frequency,
    { 0.0: 680, 0.1: 760, 0.6: 600, 0.8: 440, 1.0: 150 },
    { startTime, duration, bend },
  );

  const g = context.createGain();
  g.gain.setValueAtTime(gain, startTime);
  osc.connect(g);

  return { osc, g };
};
