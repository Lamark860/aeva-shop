# Handoff · aeva-shop · кастомная админка

## Что это

Дизайн-референсы для кастомизации админки **Payload 3** в `aeva-shop`.

**`AdminMockups.html`** — design canvas с 9 статичными макетами в стилистике сайта (терракота / кремовый / Playfair). Не живой прототип — это эскизы для разработчика.

> Это **референсы**, не production-код. Реализовать нужно поверх Payload 3, используя его механизмы кастомизации, а не переписывать UI с нуля.

## Степень детализации

**High-fidelity** для визуала (цвета, типографика, расположение). Поведение описано словами — фактическая работа полей делегируется Payload.

---

## Зачем кастомизация

Стандартная админка Payload — для разработчиков. Если сайтом будут пользоваться **другие мастера**, типовой UI их напряжёт: технические лейблы (`short_description`, `sort_order`), простыни полей, таблицы вместо галерей.

Цель — превратить админку в продолжение сайта: дружелюбные русские лейблы, подсказки, фотографии в первую очередь, дашборд-«todo» вместо оглавления коллекций.

---

## Что в макетах (артборды)

| Артборд | Что показывает | Приоритет |
|---|---|---|
| **Login** | Сдержанная форма входа в стиле сайта (Playfair, кремовый фон) | низкий — косметика |
| **Dashboard** | Главный экран: «4 новые заявки за сутки», дайджест-цифры, последние заявки + последние изделия | **высокий** — это первое, что видит мастер |
| **Products list** | Галерея карточек с фото вместо таблицы. Бейдж «Избранное», чипы-фильтры по категориям | **высокий** |
| **Wizard step 1 — Фото** | Drop-zone, единственное действие | высокий |
| **Wizard step 2 — Название** | Превью загруженного фото слева, 3 поля справа с подсказками | высокий |
| **Wizard step 3 — Размеры** | Три поля размеров + материал, явная «Пропустить шаг» | средний |
| **Wizard step 4 — История** | Главное textarea + тогл «Опубликовать сразу» | высокий |
| **Product edit** | Табы (Основное / Фото / Размеры / Уход / SEO), подсказки курсивом под полями | **высокий** |
| **Media library** | Drag-and-drop, бейджи «не используется», фильтры по разделам сайта | **высокий** |
| **Orders list** | Карточки заявок со статусами, бейдж HoReCa, структурированные поля видны без открытия | **высокий** |
| **Order detail** | Большое сообщение, 4 ключевых поля, **«моя заметка» (приватная)**, действия Архив/В работу/Ответить | средний |

---

## Как это реализовать в Payload 3

### Уровень 1 — без React-компонентов (часы работы)

Покрывает 60% эффекта. Делается в конфиге коллекций и через CSS.

#### 1.1 Брендинг и глобальный CSS

`payload.config.ts`:
```ts
admin: {
  meta: {
    titleSuffix: '— Керамика',
    favicon: '/admin-favicon.ico',
    ogImage: '/admin-og.png',
  },
  components: {
    graphics: {
      Logo: '@/admin/Logo.tsx',     // SVG-лого с Playfair
      Icon: '@/admin/Icon.tsx',     // маленькая иконка
    },
  },
  css: '/path/to/admin-overrides.css',  // переопределение CSS-переменных Payload
},
```

В `admin-overrides.css` — заматчить цвета и шрифты Payload с дизайн-системой сайта:
```css
:root {
  --theme-elevation-0: #F6F3EF;       /* фон */
  --theme-elevation-100: #FFFFFF;     /* панели */
  --theme-elevation-150: #E6DED6;     /* alt-фон */
  --theme-text: #2B2B2B;
  --theme-success-500: #B7795A;       /* терракота как success/primary */
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-serif: 'Playfair Display', serif;
}

h1, h2, h3, .nav__label {
  font-family: var(--font-serif);
  font-weight: 400;
}
```

#### 1.2 Человеческие лейблы и подсказки

В каждой коллекции — переименовать поля и добавить `admin.description`. Пример для `Products`:

```ts
fields: [
  {
    name: 'name',
    type: 'text',
    required: true,
    label: 'Название изделия',
    admin: { description: 'Как изделие отображается на сайте. Например: «Ваза „Тишина“».' },
  },
  {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    admin: { hidden: true },  // генерится автоматически в beforeChange-хуке
    hooks: {
      beforeChange: [({ data, value }) => value || slugify(data?.name)],
    },
  },
  {
    name: 'short_description',
    type: 'text',
    label: 'Короткое описание',
    admin: { description: '1–2 предложения, видны в карточке каталога.' },
  },
  {
    name: 'priceFrom',
    type: 'number',
    required: true,
    label: 'Цена-ориентир, от (₽)',
    admin: {
      description: 'На сайте показывается с приставкой «от». Можно менять при разговоре с клиентом.',
      step: 100,
    },
  },
  {
    name: 'featured',
    type: 'checkbox',
    label: 'Показывать в «Избранных» на главной',
    admin: { description: 'Не больше 4–5 одновременно — это лицо сайта.' },
  },
  {
    name: 'story',
    type: 'textarea',
    label: 'История изделия',
    admin: {
      description: 'Маленький рассказ — как родилась форма, что особенного. Клиенту это важнее размеров.',
    },
  },
  // ...
],
```

#### 1.3 Группировка через табы

Простыня полей в `Product edit` превращается в табы:

```ts
fields: [
  {
    type: 'tabs',
    tabs: [
      { label: 'Основное', fields: [/* name, category, priceFrom, featured, story */] },
      { label: 'Фотографии', fields: [/* images */] },
      { label: 'Размеры и материал', fields: [/* sizes (group), material */] },
      { label: 'Уход', fields: [/* care */] },
      { label: 'SEO', fields: [/* metaTitle, metaDescription */] },
    ],
  },
],
```

#### 1.4 Кастомные ячейки в списке продуктов

```ts
admin: {
  useAsTitle: 'name',
  defaultColumns: ['image', 'name', 'category', 'priceFrom', 'featured'],
  components: {
    views: {
      List: {
        Component: '@/admin/ProductsListView.tsx',  // см. уровень 2
      },
    },
  },
},
```

Если совсем без своих компонентов — хотя бы добавь миниатюру через field-level `admin.components.Cell`:
```ts
{
  name: 'mainImage',
  type: 'upload',
  relationTo: 'media',
  admin: {
    components: {
      Cell: '@/admin/ImageCell.tsx',  // <img src={doc.url} width={48} height={48} />
    },
  },
},
```

### Уровень 2 — с кастомными компонентами (1-2 дня работы)

Покрывает остальные 40%. Каждый компонент — это React-файл, который Payload подгружает.

#### 2.1 Кастомный дашборд

Заменить дефолтный list-of-collections экран:

```ts
admin: {
  components: {
    views: {
      Dashboard: {
        Component: '@/admin/Dashboard.tsx',
      },
    },
  },
},
```

`Dashboard.tsx` — React server component. Внутри запрос через `payload.find()` к Orders (status=new, limit=5), Products (sort: -createdAt, limit=4), плюс агрегаты count. Layout — как в макете `dashboard`.

#### 2.2 Визард создания нового изделия

Payload разрешает заменить view создания через `admin.components.views.Edit`. Альтернативный путь — отдельный admin route:

```ts
admin: {
  components: {
    routes: [
      {
        path: '/products/new-wizard',
        Component: '@/admin/ProductWizard.tsx',
      },
    ],
  },
},
```

Кнопка «Добавить изделие» на дашборде ведёт на `/admin/products/new-wizard`. Каждый шаг — отдельный React-стейт, на финальном шаге `payload.create()`.

Логика шагов — как в макетах:
1. **Фото** — `<input type="file">` → upload в коллекцию `media` → запомнить `mediaId`
2. **Название** — name, category, priceFrom
3. **Размеры** — sizes.height, sizes.diameter, sizes.volume, material (все опциональны)
4. **История** — story (textarea), `_status: published | draft`

После сохранения — редирект на `/admin/collections/products/{id}` (обычный edit view).

#### 2.3 Кастомный список заявок

Стандартный list view Payload — это таблица. Чтобы получить карточки со статусами и бейджами HoReCa:

```ts
// Orders collection
admin: {
  components: {
    views: {
      List: { Component: '@/admin/OrdersListView.tsx' },
      Edit: { Component: '@/admin/OrderEditView.tsx' },  // карточка с заметкой
    },
  },
},
```

В `OrdersListView.tsx` — `payload.find()` с фильтром + ручной рендер карточек.

#### 2.4 «Заметка для себя» в карточке заявки

Это поле, скрытое для клиента, доступное в админке. В Payload:

```ts
{
  name: 'internalNote',
  type: 'textarea',
  label: 'Моя заметка (только для меня)',
  admin: {
    description: 'Клиент это не увидит. Например: позвонить в субботу, переслать ссылку на похожее.',
  },
  access: {
    // Скрыть из API, чтобы случайно не утекло
    read: ({ req }) => Boolean(req.user),
  },
},
```

Если хочется выделить визуально (кремовый фон, как в макете) — обернуть в группу или кастомный field component.

#### 2.5 Бейдж HoReCa в списке Orders

Самое простое — отдельная коллекция `horecaInquiries` или поле `source: 'private' | 'horeca'` в Orders. В кастомном list view — условный рендер бейджа.

---

## Маппинг макетов → файлы кода

```
admin/login.jsx               → admin-overrides.css (только CSS-вариативность)
                                 + опционально graphics.Logo
admin/dashboard.jsx           → @/admin/Dashboard.tsx
                                 + admin.components.views.Dashboard

admin/products.jsx            → @/admin/ProductsListView.tsx
                                 + admin.components.views.List в Products
admin/create-wizard.jsx       → @/admin/ProductWizard.tsx
                                 + admin.components.routes
admin/product-edit.jsx        → tabs в Products.fields
                                 + admin.description на каждом поле
                                 + опционально custom Edit view

admin/media.jsx               → @/admin/MediaListView.tsx
                                 + admin.components.views.List в Media
                                 (Payload уже умеет drag-drop upload —
                                  кастомизация в основном про сетку с миниатюрами
                                  и бейдж «не используется» через related-queries)

admin/orders.jsx (list)       → @/admin/OrdersListView.tsx
admin/orders.jsx (detail)     → tabs/группы в Orders.fields
                                 + кастомный internalNote field
                                 + опционально custom Edit view
```

---

## Что точно НЕ делать

- ❌ Заменять весь UI Payload фронтенд-проектом — оставит без обновлений безопасности и сломает интеграции с REST/GraphQL API
- ❌ Хардкодить дизайн только в CSS, игнорируя `admin.description` — лейблы и подсказки важнее цветов
- ❌ Делать визард единственным способом создания продукта — оставь и обычный edit view для редактирования

---

## Дизайн-токены (взять из `ceramic.css`)

```css
--cer-bg: #F6F3EF;                /* основной фон админки */
--cer-bg-alt: #E6DED6;            /* alt-фон для заметок, карточек-советов */
--cer-text: #2B2B2B;              /* основной текст, sidebar background */
--cer-text-muted: #5A524D;        /* вторичный текст */
--cer-text-light: #7A726C;        /* третичный, метки */
--cer-accent: #B7795A;            /* терракота — primary action, статусы */
--cer-accent-hover: #A06845;
--cer-border: rgba(43, 43, 43, 0.08);
--cer-font-heading: 'Playfair Display', serif;
--cer-font-body: 'Inter', sans-serif;
```

**Цветовое кодирование статусов** (из макетов Orders):
- `new`: bg `rgba(183,121,90,0.12)`, color `var(--cer-accent)`
- `in-progress`: bg `rgba(212,165,116,0.15)`, color `#A06845`
- `done`: bg `rgba(43,43,43,0.06)`, color `var(--cer-text-muted)`

---

## Файлы в этой папке

- `README.md` — этот файл
- `AdminMockups.html` — design canvas с 9 артбордами (открыть в браузере)
- `admin/` — JSX-исходники макетов
- `design-canvas.jsx` — движок канваса
- `ceramic.css` — дизайн-токены и базовые стили
