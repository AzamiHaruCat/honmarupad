import { sleep } from '../sleep';
import { context } from './context';
import { playBeep, type PlayOptions, type SequenceOptions } from './playBeep';

export const playChord = (chord: (string | number)[], options: PlayOptions = {}) => {
  if (context.state !== 'running') return;

  let { volume = 0.5 } = options;
  volume /= Math.sqrt(chord.length);
  return Promise.all(chord.map((note) => playBeep(note, { ...options, volume })));
};

export const playChords = async (
  chords: (string | number)[][],
  options: SequenceOptions = {},
) => {
  if (context.state !== 'running') return;

  const { delay = 0.1 } = options;
  const lastIndex = chords.length - 1;
  for (let i = 0; i < chords.length; i++) {
    const promise = playChord(chords[i], options);
    await (i === lastIndex ? promise : sleep(delay * 1000));
  }
};
