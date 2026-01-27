import { sleep } from '../sleep';
import { context, createReverb } from './context';
import { noteToFreq, type PlayOptions, type SequenceOptions } from './playBeep';

export const playBell = async (
  baseFreq?: string | number,
  options: Omit<PlayOptions, 'type'> = {},
) => {
  if (context.state !== 'running') return;

  baseFreq = typeof baseFreq === 'string' ? noteToFreq(baseFreq) : (baseFreq ?? 880);
  const { duration = 2, volume = 0.3 } = options;

  const now = context.currentTime;

  const mainGain = context.createGain();
  mainGain.connect(context.destination);

  const ratios = [1.0, 1.5, 2.0, 2.51, 3.2];

  const oscs = ratios.map((ratio, i) => {
    const osc = context.createOscillator();
    const g = context.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * ratio, now);

    g.gain.setValueAtTime((volume * 0.6) / (i + 1), now);
    g.gain.exponentialRampToValueAtTime(0.001, now + duration / (i + 1));

    osc.connect(g);
    return { osc, g };
  });

  const masterEnv = context.createGain();
  oscs.forEach(({ g }) => g.connect(masterEnv));

  masterEnv.gain.setValueAtTime(0, now);
  masterEnv.gain.linearRampToValueAtTime(volume, now + 0.005);
  masterEnv.gain.exponentialRampToValueAtTime(0.001, now + duration);

  const hpFilter = context.createBiquadFilter();
  hpFilter.type = 'highpass';
  hpFilter.frequency.value = 150;

  masterEnv.connect(hpFilter);
  hpFilter.connect(mainGain);

  const reverb = createReverb(3.0);
  const reverbGain = context.createGain();
  reverbGain.gain.value = 0.3;

  masterEnv.connect(mainGain);
  masterEnv.connect(reverb);
  reverb.connect(reverbGain);
  reverbGain.connect(mainGain);

  oscs.forEach(({ osc }) => {
    osc.start(now);
    osc.stop(now + duration);
  });

  await sleep(duration * 1000);
};

export const playBells = async (
  baseFreqs: (string | number)[],
  options: Omit<SequenceOptions, 'type'> = {},
) => {
  if (context.state !== 'running') return;

  const { duration = 2 } = options;
  const { delay = duration * 0.3 } = options;
  const lastIndex = baseFreqs.length - 1;
  for (let i = 0; i < baseFreqs.length; i++) {
    const promise = playBell(baseFreqs[i], { ...options, duration });
    await (i === lastIndex ? promise : sleep(delay * 1000));
  }
};
