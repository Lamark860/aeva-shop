# Модель данных — ceramic

Реляционная (в оригинале была MongoDB, но связи чисто реляционные — переводим на SQL).

## category
| поле        | тип       | примечание                    |
|-------------|-----------|-------------------------------|
| id          | pk        |                               |
| name        | string    | «Чаши»                        |
| slug        | string    | уникальный, для URL           |
| description | text      |                               |
| image       | string    | URL обложки категории         |
| sort_order  | int       | порядок вывода                |

## product
| поле              | тип       | примечание                          |
|-------------------|-----------|-------------------------------------|
| id                | pk        |                                     |
| name              | string    |                                     |
| slug              | string    | уникальный, для URL                 |
| description       | text      | многострочное → рендерится списком  |
| short_description | string    |                                     |
| price             | int/dec   | в рублях                            |
| category_id       | fk → category |                                 |
| images            | string[]  | массив URL (первый = главный)       |
| featured          | bool      | показывать в «Популярные»           |
| sort_order        | int       |                                     |
| created_at        | datetime  |                                     |

## gallery_item
| поле        | тип       | примечание                          |
|-------------|-----------|-------------------------------------|
| id          | pk        |                                     |
| title       | string    |                                     |
| image       | string    | URL                                 |
| description | text      | опционально                         |
| size        | enum      | normal / wide / tall (для masonry)  |
| sort_order  | int       |                                     |

## order  (заявка на индивидуальный заказ)
| поле        | тип       | примечание                          |
|-------------|-----------|-------------------------------------|
| id          | pk        |                                     |
| name        | string    | обязательное                        |
| email       | string    | обязательное, валидируется          |
| phone       | string    |                                     |
| message     | text      | обязательное                        |
| product_id  | fk → product (nullable) | если заявка по товару |
| status      | enum      | new / done                          |
| created_at  | datetime  |                                     |

## Helpers (логика, которую надо повторить на новом стеке)
- `formatted_price` = `number_format(price, 0, ',', ' ') . ' ₽'` → «3 200 ₽»
- `main_image` = `images[0]`
- генерация `slug` из кириллицы — транслитерация (см. AdminController::generateSlug в оригинале)
- описание товара: каждая строка (split по `\n`) выводится как пункт `.cer-product__features li`
