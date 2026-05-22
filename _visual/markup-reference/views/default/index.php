<?php

/** @var yii\web\View $this */
/** @var array $collectionPreview */
/** @var array $featuredProducts */
/** @var array $galleryItems */

use app\modules\ceramic\widgets\ProductCard;
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = 'Авторская керамика ручной работы';
?>

<!-- ===== BLOCK 1 — HERO ===== -->
<section class="cer-hero">
    <div class="cer-hero__bg">
        <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&h=1080&fit=crop&q=80"
             alt="Авторская керамика" loading="eager">
    </div>
    <div class="cer-hero__overlay"></div>
    <div class="cer-hero__content">
        <h1 class="cer-hero__title">Авторская керамика<br>ручной работы</h1>
        <div class="cer-hero__buttons">
            <a href="<?= Url::to(['/ceramic/catalog/index']) ?>" class="cer-btn cer-btn--primary">Смотреть изделия</a>
            <a href="<?= Url::to(['/ceramic/order/create']) ?>" class="cer-btn cer-btn--outline">Индивидуальный заказ</a>
        </div>
    </div>
</section>

<!-- ===== BLOCK 2 — COLLECTION PREVIEW ===== -->
<section class="cer-section">
    <div class="cer-container">
        <div class="cer-section__title cer-fade-in">
            <span class="cer-section__subtitle">Коллекция</span>
            <h2>Избранные работы</h2>
        </div>
        <div class="cer-grid cer-grid--3 cer-fade-in">
            <?php foreach ($collectionPreview as $product): ?>
                <?= ProductCard::widget(['product' => $product]) ?>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ===== BLOCK 3 — ABOUT ===== -->
<section class="cer-section cer-section--no-top">
    <div class="cer-container">
        <div class="cer-two-col">
            <div class="cer-two-col__image cer-reveal-image cer-fade-left">
                <img src="https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=1000&fit=crop&q=80"
                     alt="Мастер" loading="lazy">
            </div>
            <div class="cer-two-col__text cer-fade-right">
                <span class="cer-section__subtitle">О мастере</span>
                <h2>Каждое изделие —<br>история</h2>
                <p>Я создаю керамику вручную
в небольшой мастерской.
Каждое изделие уникально.</p>
                <p>Натуральная глина, ручная лепка, двойной обжиг — каждая деталь продумана и выполнена с любовью к материалу.</p>
                <a href="<?= Url::to(['/ceramic/gallery/index']) ?>" class="cer-btn cer-btn--ghost">Смотреть галерею</a>
            </div>
        </div>
    </div>
</section>

<!-- ===== BLOCK 4 — PROCESS ===== -->
<section class="cer-section" style="background-color: var(--cer-bg-alt);">
    <div class="cer-container">
        <div class="cer-section__title cer-fade-in">
            <span class="cer-section__subtitle">Процесс</span>
            <h2>Как создаётся керамика</h2>
        </div>
    </div>
    <div class="cer-process-wrapper cer-fade-in">
        <div class="cer-process">
            <div class="cer-process__track">
                <?php
                $steps = [
                    ['Замес глины', 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=560&h=720&fit=crop&q=80'],
                    ['Гончарный круг', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=560&h=720&fit=crop&q=80'],
                    ['Формовка', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=560&h=720&fit=crop&q=80'],
                    ['Сушка', 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=560&h=720&fit=crop&q=80'],
                    ['Обжиг', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=560&h=720&fit=crop&q=80'],
                    ['Глазурование', 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=560&h=720&fit=crop&q=80'],
                ];
                foreach ($steps as $step): ?>
                    <div class="cer-process__item">
                        <img src="<?= $step[1] ?>" alt="<?= Html::encode($step[0]) ?>" class="cer-process__image" loading="lazy">
                        <span class="cer-process__label"><?= Html::encode($step[0]) ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="cer-process-progress">
            <div class="cer-process-progress__bar"></div>
        </div>
    </div>
</section>


<!-- ===== BLOCK 5 — FEATURED ===== -->
<section class="cer-section">
    <div class="cer-container">
        <div class="cer-section__title cer-fade-in">
            <span class="cer-section__subtitle">Изделия</span>
            <h2>Популярные работы</h2>
        </div>
        <div class="cer-grid cer-grid--4 cer-fade-in">
            <?php foreach ($featuredProducts as $product): ?>
                <?= ProductCard::widget(['product' => $product, 'showCategory' => true]) ?>
            <?php endforeach; ?>
        </div>
        <div class="cer-section__cta cer-fade-in">
            <a href="<?= Url::to(['/ceramic/catalog/index']) ?>" class="cer-btn cer-btn--outline">Весь каталог</a>
        </div>
    </div>
</section>

<!-- ===== BLOCK 6 — ATMOSPHERIC ===== -->
<section class="cer-atmospheric">
    <div class="cer-atmospheric__bg">
        <img src="https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=1920&h=1080&fit=crop&q=80"
             alt="" loading="lazy">
    </div>
    <div class="cer-atmospheric__overlay"></div>
    <div class="cer-atmospheric__text">
        Каждое изделие уникально
    </div>
</section>

<!-- ===== BLOCK 7 — GALLERY MASONRY ===== -->
<section class="cer-section">
    <div class="cer-container">
        <div class="cer-section__title cer-fade-in">
            <span class="cer-section__subtitle">Галерея</span>
            <h2>Из мастерской</h2>
        </div>
        <div class="cer-masonry cer-fade-in">
            <?php foreach (array_slice($galleryItems, 0, 9) as $item):
                $img = is_array($item) ? ($item['image'] ?? '') : $item->image;
                $title = is_array($item) ? ($item['title'] ?? '') : $item->title;
            ?>
                <div class="cer-masonry__item">
                    <img src="<?= Html::encode($img) ?>" alt="<?= Html::encode($title) ?>" loading="lazy">
                    <div class="cer-masonry__caption"><?= Html::encode($title) ?></div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ===== BLOCK 8 — CUSTOM ORDER CTA ===== -->
<section class="cer-cta cer-fade-in">
    <div class="cer-container">
        <span class="cer-section__subtitle">Индивидуально</span>
        <h2>Можно создать изделие
специально для вас</h2>
        <a href="<?= Url::to(['/ceramic/order/create']) ?>" class="cer-btn cer-btn--primary">Оставить заявку</a>
    </div>
</section>

<!-- ===== BLOCK 9 — INSTAGRAM GRID ===== -->
<section class="cer-section cer-section--no-bottom">
    <div class="cer-container">
        <div class="cer-section__title cer-fade-in">
            <span class="cer-section__subtitle">@ceramic_studio</span>
            <h2>Атмосфера мастерской</h2>
        </div>
    </div>
    <div class="cer-insta-grid cer-fade-in">
        <?php
        $instaImages = [
            'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=500&h=500&fit=crop',
        ];
        foreach ($instaImages as $img): ?>
            <div class="cer-insta-grid__item">
                <img src="<?= $img ?>" alt="" loading="lazy">
            </div>
        <?php endforeach; ?>
    </div>
</section>

<!-- Lightbox -->
<div id="cer-lightbox" class="cer-lightbox">
    <button class="cer-lightbox__close">&times;</button>
    <button class="cer-lightbox__prev">&#8249;</button>
    <img src="" alt="">
    <button class="cer-lightbox__next">&#8250;</button>
</div>

