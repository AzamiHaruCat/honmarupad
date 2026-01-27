import { sleep } from '../sleep';
import { context } from './context';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const noteToFreq = (note: string): number => {
  const match = /^([A-G]#?)(\d)$/.exec(note);
  if (!match) return 440;

  const [, name, octaveStr] = match;
  const octave = parseInt(octaveStr, 10);

  const semitones = notes.indexOf(name) + (octave - 4) * 12 - 9;

  return 440 * Math.pow(2, semitones / 12);
};

export interface PlayOptions {
  type?: OscillatorType;
  duration?: number;
  volume?: number;
}

export interface SequenceOptions extends PlayOptions {
  delay?: number;
}

export const playBeep = async (
  frequency: string | number = 880,
  options: PlayOptions = {},
) => {
  if (context.state !== 'running') return;

  if (typeof frequency === 'string') frequency = noteToFreq(frequency);

  const { type = 'sine', duration = 0.2, volume = 0.3 } = options;

  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, context.currentTime);

  gain.gain.setValueAtTime(volume, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);

  osc.connect(gain);
  gain.connect(context.destination);

  osc.start();
  osc.stop(context.currentTime + duration);

  await sleep(duration * 1000);
};

export const playBeeps = async (
  freqs: (string | number)[],
  options: SequenceOptions = {},
) => {
  if (context.state !== 'running') return;

  const { delay = 0.1 } = options;
  const lastIndex = freqs.length - 1;
  for (let i = 0; i < freqs.length; i++) {
    const promise = playBeep(freqs[i], options);
    await (i === lastIndex ? promise : sleep(delay * 1000));
  }
};
