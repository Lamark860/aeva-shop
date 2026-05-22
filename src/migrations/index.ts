import * as migration_20260522_111514_initial from './20260522_111514_initial';
import * as migration_20260522_121646_add_media from './20260522_121646_add_media';
import * as migration_20260522_124242_add_homepage_global from './20260522_124242_add_homepage_global';
import * as migration_20260522_134535_add_handoff_data_model from './20260522_134535_add_handoff_data_model';

export const migrations = [
  {
    up: migration_20260522_111514_initial.up,
    down: migration_20260522_111514_initial.down,
    name: '20260522_111514_initial',
  },
  {
    up: migration_20260522_121646_add_media.up,
    down: migration_20260522_121646_add_media.down,
    name: '20260522_121646_add_media',
  },
  {
    up: migration_20260522_124242_add_homepage_global.up,
    down: migration_20260522_124242_add_homepage_global.down,
    name: '20260522_124242_add_homepage_global',
  },
  {
    up: migration_20260522_134535_add_handoff_data_model.up,
    down: migration_20260522_134535_add_handoff_data_model.down,
    name: '20260522_134535_add_handoff_data_model'
  },
];
