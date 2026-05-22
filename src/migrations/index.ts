import * as migration_20260522_111514_initial from './20260522_111514_initial';
import * as migration_20260522_121646_add_media from './20260522_121646_add_media';

export const migrations = [
  {
    up: migration_20260522_111514_initial.up,
    down: migration_20260522_111514_initial.down,
    name: '20260522_111514_initial',
  },
  {
    up: migration_20260522_121646_add_media.up,
    down: migration_20260522_121646_add_media.down,
    name: '20260522_121646_add_media'
  },
];
