import * as migration_20260522_111514_initial from './20260522_111514_initial';

export const migrations = [
  {
    up: migration_20260522_111514_initial.up,
    down: migration_20260522_111514_initial.down,
    name: '20260522_111514_initial'
  },
];
