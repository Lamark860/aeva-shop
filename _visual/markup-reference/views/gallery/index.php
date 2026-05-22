<?php

/** @var yii\web\View $this */
/** @var array $items */

use yii\helpers\Html;

$this->title = 'Галерея — Керамика';
?>

<div class="cer-page-header">
    <div class="cer-container">
        <div class="cer-text-reveal">
            <span class="cer-section__subtitle">Галерея</span>
        </div>
        <div class="cer-text-reveal">
            <h1>Из мастерской</h1>
        </div>
        <p>Процесс создания, детали изделий, атмосфера</p>
    </div>
</div>

<section class="cer-section cer-section--no-top">
    <div class="cer-container">
        <div class="cer-masonry cer-fade-in">
            <?php foreach ($items as $item):
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

<!-- Lightbox -->
<div id="cer-lightbox" class="cer-lightbox">
    <button class="cer-lightbox__close">&times;</button>
    <button class="cer-lightbox__prev">&#8249;</button>
    <img src="" alt="">
    <button class="cer-lightbox__next">&#8250;</button>
</div>

