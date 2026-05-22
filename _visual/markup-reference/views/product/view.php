<?php

/** @var yii\web\View $this */
/** @var array $product */

use yii\helpers\Html;
use yii\helpers\Url;

$name = $product['name'] ?? '';
$price = $product['formatted_price'] ?? number_format($product['price'] ?? 0, 0, ',', ' ') . ' ₽';
$description = $product['description'] ?? '';
$images = $product['images'] ?? [];
$mainImage = $product['main_image'] ?? ($images[0] ?? '');
$category = $product['category'] ?? '';
$slug = $product['slug'] ?? '';

$this->title = $name . ' — Керамика';
?>

<div class="cer-page-header">
    <div class="cer-container">
        <span class="cer-section__subtitle">
            <a href="<?= Url::to(['/ceramic/catalog/index']) ?>">Каталог</a>
        </span>
    </div>
</div>

<section class="cer-section cer-section--no-top">
    <div class="cer-container">
        <div class="cer-product">
            <!-- Gallery -->
            <div class="cer-product__gallery cer-fade-left">
                <img src="<?= Html::encode($mainImage) ?>"
                     alt="<?= Html::encode($name) ?>"
                     class="cer-product__main-image">
                <?php if (count($images) > 1): ?>
                    <div class="cer-product__thumbs">
                        <?php foreach ($images as $i => $img): ?>
                            <img src="<?= Html::encode($img) ?>"
                                 alt="<?= Html::encode($name) ?>"
                                 class="cer-product__thumb <?= $i === 0 ? 'cer-product__thumb--active' : '' ?>">
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Info -->
            <div class="cer-product__info cer-fade-right">
                <?php if ($category): ?>
                    <div class="cer-product__category"><?= Html::encode($category) ?></div>
                <?php endif; ?>
                <h1 class="cer-product__name"><?= Html::encode($name) ?></h1>
                <span class="cer-product__price"><?= $price ?></span>

                <?php
                $lines = array_filter(array_map('trim', explode("\n", $description)));
                if (!empty($lines)): ?>
                    <ul class="cer-product__features">
                        <?php foreach ($lines as $line): ?>
                            <li><?= Html::encode($line) ?></li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
                <div class="cer-product__actions">
                    <a href="<?= Url::to(['/ceramic/order/create', 'product' => $slug]) ?>"
                       class="cer-btn cer-btn--primary">Заказать</a>
                    <a href="<?= Url::to(['/ceramic/catalog/index']) ?>"
                       class="cer-btn cer-btn--outline">Назад в каталог</a>
                </div>
            </div>
        </div>
    </div>
</section>

