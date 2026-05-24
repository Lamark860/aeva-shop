# Roadmap

Состояние на **2026-05-24**.

## ✅ Сделано

### Сессия 2026-05-24 (вторая часть)
- **Лид «Из шамотной глины…» на главной читался как тёмный на тёмном overlay** — `.cer-page p` (0,1,1) перебивал `.cer-hero-v3__lead` (0,1,0). Сделал двойной селектор. Превентивно поправил то же в `.cer-project-hero__lead` и `.cer-routing__card--dark .cer-routing__desc`
- **CountUp анимация чисел в метриках Horeca вернулась** — клиент-компонент `MetricValue` парсит свободную строку из Globals («12+», «50–500», «Шамот») и анимирует последнее число, текстовые значения оставляет как есть
- **Mobile-фикс /horeca** — eyebrow «ДЛЯ РЕСТОРАНОВ И КАФЕ» наезжал на логотип (centered flex + длинный title на 4 строки). Добавил `padding-top: 100px` для `.cer-project-hero--center .cer-project-hero__content` на `@media (max-width: 640px)`
- **/about и /care: subtitle и h1 встали на одну строку** — `.fx-reveal-mask { display: inline-block }`, и два `<RevealMask as="div">` подряд всё равно inline. Завернул каждый в внешний `<div>` (about/care/journal). См. CLAUDE.md
- **/about: портрет уезжал ниже viewport на десктопе** — `.cer-two-col { align-items: center }` центрировал по высоте длинной правой колонки. Изменил на `align-items: start` + добавил `position: sticky; top: 100px` для `.cer-two-col__image` на десктопе. См. CLAUDE.md
- **/gallery: добавил empty-state** «Скоро здесь будут фото из мастерской» (до этого рендерился пустой grid)
- **Mobile-адаптация админки (первая итерация)**: добавил responsive utility-классы в `admin.css` (`.cer-admin-pad`, `.cer-admin-digest`, `.cer-admin-two-panel`, `.cer-admin-order-card`, `.cer-admin-wizard-grid--two`, `.cer-admin-wizard-sizes` и др. с breakpoint 700px). Заменил inline-grids в `Dashboard.tsx`, `OrdersListView.tsx`, `ProductWizard.tsx` — на мобиле всё уходит в одну колонку, кнопки в шапке становятся full-width
- **Фикс данных**: всем 28 импортированным товарам проставлен `inStock=true` (артефакт импорта aeva — все висели с бейджем «НЕТ В НАЛИЧИИ»). Алина потом снимет реально отсутствующим

### Сессия 2026-05-23 / 2026-05-24 (первая часть)
- **Контакты Алины** в footer: реальные Instagram/Telegram/WhatsApp ссылки (email — ждёт от Алины)
- **Очищено 21 dummy-запись**: 9 Products + 3 Projects + 9 Gallery — через `scripts/cleanup-dummy.ts` (npm run cleanup:dummy)
- **Featured**: 4 вазы отмечены (Black Oil, Loni, Mramor, Aria) через `scripts/feature-vases.ts`
- **imageSizes во frontend** (ROADMAP #5 закрыт): `src/lib/data.ts` отдаёт `large` (1600) вместо оригинала (2400) для карточек/heroes; `card` (900) для process-steps/insta/project-gallery. Helper `pickSize()`. Gallery-masonry оставлено на оригинале (Lightbox несовместим)
- **revalidate hooks доработаны**: Products/Categories теперь сбрасывают `/catalog`; Pages умеет маппинг `about/care/horeca` → корневые роуты (`KNOWN_PAGE_ROUTES` в `src/collections/Pages.ts`)
- **Admin-кнопка «Обновить сайт»**: `src/admin/RevalidateButton.tsx` + endpoint `src/app/api/revalidate-all/route.ts` (auth-required, ребилдит 12 шаблонов). В Dashboard рядом с «+ Добавить изделие»
- **Care страница редактируемая**: Global `care-page` (subtitle/title/lead + items[] + footer). Frontend `/care` использует `getCarePage()` с дефолтами. Миграция `20260523_200625_care_page_global`
- **About расширена**: Global `about-page` (portraitPhoto, quote, material{photo,subtitle,heading,paragraphs[]}, triptych[], types{subtitle,heading,items[]}, cta{...}). Intro по-прежнему через Pages doc `slug=about`. Миграция `20260523_200914_about_page_global`
- **Horeca редактируемая**: Global `horeca-page` (hero, metrics[], cases{subtitle,heading}, process{subtitle,heading,steps[]}, form{subtitle,heading,lead,btnText}). Форма-поля не трогали. CountUp анимация убрана — metric value теперь свободная строка (поддерживает «12+», «50–500», «Шамот»). Миграция `20260523_201227_horeca_page_global`
- **Globals префиллены дефолтами** (`scripts/seed-globals.ts`, `npm run seed:globals`): Care/About/Horeca в админке теперь показывают реальные тексты сайта, Алина видит что менять. Идемпотентно — не перезаписывает уже изменённые поля
- **Zero-downtime инфра (ROADMAP #12 готово, не задеплоено)**: `/api/healthz` endpoint + `HEALTHCHECK` в Dockerfile + `docker-compose.prod-bg.yml` (blue/green с Traefik loadbalancer.healthcheck) + `scripts/deploy.sh` (определяет активный цвет, поднимает второй, ждёт healthy, гасит старый). См. memory `project-ceramic-zero-downtime` для пошаговой инструкции переключения на VPS

### Главный сайт

### Главный сайт
- 12 страниц витрины: `/`, `/catalog`, `/product/[slug]`, `/about`, `/care`, `/horeca`,
  `/journal`, `/gallery`, `/order`, `/projects`, `/projects/[slug]`, `/pages/[slug]`
- Дизайн 1:1 с `_visual/`: sticky-nav с двумя состояниями (transparent над hero / cream после),
  Hero V3 full-screen с kenburns, Footer V2 «три трека», страница товара со sticky CTA
  и JSON-LD, sortable каталог
- Анимации: FadeIn, RevealMask, Parallax, CountUp (метрики /horeca), view-transitions,
  print-стили, `prefers-reduced-motion`
- `next/image` повсюду (кроме Lightbox-привязанной масонри — там нативный `<img>` нужен
  для оригинала в lightbox)
- Sitemap.xml, robots.txt, OpenGraph, JSON-LD Product

### Админка
- Кастомизация: admin.css с токенами сайта (Playfair, терракотовый акцент),
  Logo + Icon SVG, `titleSuffix: ' — Керамика'`
- ImageCell в списке Products (миниатюра 48×48 первого фото)
- Кастомный Dashboard: приветствие по времени суток, цифры (новые заявки за 24ч,
  всего изделий/заявок/подписчиков), последние 5 заявок (объединено Orders + HoReCa
  с бейджем HoReCa), последние 4 изделия, CTA «+ Добавить изделие»
- OrdersListView (применён к `Orders` и `HorecaInquiries`): карточки вместо таблицы,
  цветные статусы (`new`/`in-progress`/`done`), чипы-фильтры
- ProductWizard: 4 шага (Фото → Название → Размеры → История), отдельный admin-route
  `/admin/products/wizard`
- Tabs в Products (Основное / Фото / Размеры / Уход), русские лейблы,
  `admin.description` на полях
- `internalNote` в Orders / HorecaInquiries с `access.read` (приватно)

### Контент с shop-aeva.ru
- **16 ваз** в категории «Вазы» (Black Oil, Loni, Mramor, Aria, Satu, Ura, Oma,
  Тишина Луны, Точка Замерзания, След Ветра, Лесная, Линия Вечности, Деталь,
  Блюдо Эхо, Жар, Острова Тишины) — с описаниями, размерами, ценами, 49 фото
- **12 единиц посуды** в категории «Посуда» (тарелки, боулы, чайные пары,
  стаканы) — 61 фото
- Pages: `/pages/about`, `/pages/delivery`, `/pages/contacts` — редактируются в админке,
  автолинк URL/телефонов на фронте
- `/about` обновлён: тянет текст из Pages doc `slug='about'` + первое фото
  из Media (`aeva-about-0`), с fallback на старый dummy
- Hero на главной — реальное фото мастера с керамической вазой
- Footer-ссылки на «Доставка»/«Контакты»

### Инфраструктура
- **Dev полностью в Docker**: `docker-compose.dev.yml` с app на :3070, postgres на :5470
  (нестандартные порты, чтобы не конфликтовать с другими проектами на VPS).
  Hot reload через bind mount, `node_modules`/`.next` в анонимных volumes
- `inStock` в Products + миграция + бейдж «НЕТ В НАЛИЧИИ» на карточках
- Pages collection + `/pages/[slug]` для редактируемых текстовых страниц
- Media: Sharp resize до 2400px по большей стороне, JPEG q=82 mozjpeg,
  EXIF strip, imageSizes (thumbnail 400×400 / card 900×900 / large 1600×1600),
  focalPoint
- Импортёр `scripts/import-aeva.ts`: идемпотентный по slug, заливает Categories /
  Media / Products / Pages, обновляет Homepage.heroPhoto

---

## 🔴 До запуска (must-have)

### 1. Email Алины в footer ⏳ waiting on external
В `src/components/Shell.tsx:80-82` сейчас три ссылки (Insta/Telegram/WhatsApp).
Email удалён — **ждём адрес от Алины**, после получения добавить mailto-ссылкой четвёртой.
Не наш блокер: ничего сделать сейчас нельзя, кроме напоминания.

### 2. Реальные галерея / блог
- `/gallery` — сейчас 9 dummy unsplash. Залить реальные фото изделий
- `/journal` — пусто. Перенести 6 статей блога Алины (`shop-aeva.ru/blog`)

### 3. Развернуть blue-green на VPS
Инфра готова (`docker-compose.prod-bg.yml` + `scripts/deploy.sh` + healthz),
но прод ещё на single-instance compose. Шаги — в memory
`project-ceramic-zero-downtime`. Разово ~30 сек простоя при первом переходе,
дальше каждый `./scripts/deploy.sh` без даунтайма.

---

## 🟡 Важно (post-launch)

### 4. Email-уведомления о заявках (#22)
Сейчас `nodemailer` пишет в консоль (`No email adapter provided`).
Подключить:
- SMTP-адаптер (Resend / Яндекс.Почта для бизнеса) в `payload.config.ts`
- Шаблон письма клиенту после `createOrder` (благодарность + что ждать)
- Уведомление Алине о новой заявке в Telegram (`TELEGRAM_BOT_TOKEN`/`CHAT_ID`
  уже в .env.example)

---

## 🟢 Полировка

### 8. Login логотип крупнее
Сейчас маленький Playfair italic «Керамика» центрирован высоко. Можно сделать
крупный SVG-знак как в `design_handoff_admin/admin/login.jsx`.

### 9. Кастомный Edit-view для заявок
Из `design_handoff_admin/admin/orders.jsx` (раздел AdminOrderDetail): структурированные
блоки с метаданными, «Моя заметка» на кремовом фоне, кнопки «Архив» / «В работу» /
«Ответить на email» (последняя — `mailto:` или открытие почтового клиента).

### 10. Media library с бейджами «не используется»
Кастомный list-view для коллекции `media`: сетка миниатюр + бейдж «не используется»
если файл не привязан ни к одному Product / Page / Global. Запрос через related-query.

### 11. Очистка категорий
В категориях остались `chashi`/`tarelki`/`kruzhki`/`dekor`/`nabory` из старого seed
(в них нет реальных товаров). Удалить или переименовать под реальную ситуацию
у Алины. Также можно подумать о подкатегориях посуды.

---

## ⏸ Отложено

### 12. ~~Zero-downtime деплой~~ — инфра реализована (см. «До запуска #4» и memory)

### 13. Mailcatcher в dev
Сейчас email уходит в console. Когда подключим SMTP — поднять MailHog в
`docker-compose.dev.yml` (:1025 SMTP / :8025 UI) чтобы видеть письма локально.

### 14. Storybook / визуальное регрессионное тестирование
Сейчас визуал проверяется глазами через chrome-devtools MCP. Когда дизайн
устаканится — Storybook + Chromatic / Playwright snapshots.
