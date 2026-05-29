import * as migration_20260522_111514_initial from './20260522_111514_initial';
import * as migration_20260522_121646_add_media from './20260522_121646_add_media';
import * as migration_20260522_124242_add_homepage_global from './20260522_124242_add_homepage_global';
import * as migration_20260522_134535_add_handoff_data_model from './20260522_134535_add_handoff_data_model';
import * as migration_20260523_111255_add_media_sizes from './20260523_111255_add_media_sizes';
import * as migration_20260523_122232_add_product_in_stock from './20260523_122232_add_product_in_stock';
import * as migration_20260523_122406_add_pages from './20260523_122406_add_pages';
import * as migration_20260523_200625_care_page_global from './20260523_200625_care_page_global';
import * as migration_20260523_200914_about_page_global from './20260523_200914_about_page_global';
import * as migration_20260523_201227_horeca_page_global from './20260523_201227_horeca_page_global';

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
    name: '20260522_134535_add_handoff_data_model',
  },
  {
    up: migration_20260523_111255_add_media_sizes.up,
    down: migration_20260523_111255_add_media_sizes.down,
    name: '20260523_111255_add_media_sizes',
  },
  {
    up: migration_20260523_122232_add_product_in_stock.up,
    down: migration_20260523_122232_add_product_in_stock.down,
    name: '20260523_122232_add_product_in_stock',
  },
  {
    up: migration_20260523_122406_add_pages.up,
    down: migration_20260523_122406_add_pages.down,
    name: '20260523_122406_add_pages',
  },
  {
    up: migration_20260523_200625_care_page_global.up,
    down: migration_20260523_200625_care_page_global.down,
    name: '20260523_200625_care_page_global',
  },
  {
    up: migration_20260523_200914_about_page_global.up,
    down: migration_20260523_200914_about_page_global.down,
    name: '20260523_200914_about_page_global',
  },
  {
    up: migration_20260523_201227_horeca_page_global.up,
    down: migration_20260523_201227_horeca_page_global.down,
    name: '20260523_201227_horeca_page_global'
  },
];
