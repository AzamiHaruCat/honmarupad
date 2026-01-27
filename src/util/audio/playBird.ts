import { sleep } from '../sleep';
import { context, createReverb, setFrequency } from './context';
import { type PlayOptions, type SequenceOptions } from './playBeep';

export const playBirdChirp = async (
  baseFreq?: number,
  options: Omit<PlayOptions, 'type'> = {},
) => {
  if (context.state !== 'running') return;

  baseFreq ??= 3000 + Math.random() * 1000;

  const { duration = 0.05 + Math.random() * 0.1, volume = 0.3 } = options;

  const now = context.currentTime;
  const mainGain = context.createGain();
  mainGain.connect(context.destination);

  const osc = context.createOscillator();
  osc.type = 'sine';

  setFrequency(
    osc.frequency,
    {
      0.0: baseFreq,
      0.2: baseFreq * 1.5,
      0.5: baseFreq * 0.8,
      1.0: baseFreq * 1.2,
    },
    { startTime: now, duration },
  );

  const env = context.createGain();
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(volume, now + 0.01);
  env.gain.exponentialRampToValueAtTime(0.01, now + duration);

  const reverb = createReverb();
  const reverbGain = context.createGain();
  reverbGain.gain.value = 0.1;

  osc.connect(env);
  env.connect(mainGain);
  env.connect(reverb);
  reverb.connect(reverbGain);
  reverbGain.connect(mainGain);

  osc.start(now);
  osc.stop(now + duration);

  await sleep(duration * 1000);
};

export const playBirdSong = async (
  baseFreq?: number,
  options: Omit<SequenceOptions, 'type'> = {},
) => {
  if (context.state !== 'running') return;

  baseFreq ??= 3500;

  const { duration = 0.5 } = options;

  const promises: Promise<void>[] = [];
  for (let i = 0; i < 3; i++) {
    const isLast = i >= 2;
    const dur = duration * (isLast ? 0.4 : 0.3) + Math.random() * 0.1;
    const freq = baseFreq + (isLast ? 1000 : 0) + Math.random() * 500;

    promises.push(playBirdChirp(freq, { ...options, duration: dur }));

    if (i < 2) await sleep(30 + Math.random() * 80);
  }

  await Promise.all(promises);
};
