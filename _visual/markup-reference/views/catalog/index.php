<?php

/** @var yii\web\View $this */
/** @var array $products */
/** @var array $categories */
/** @var string|null $currentCategory */

use app\modules\ceramic\widgets\ProductCard;
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = 'Каталог — Керамика';
?>

<div class="cer-page-header">
    <div class="cer-container">
        <div class="cer-text-reveal">
            <span class="cer-section__subtitle">Каталог</span>
        </div>
        <div class="cer-text-reveal">
            <h1>Изделия</h1>
        </div>
        <p>Каждое изделие создано вручную с любовью к материалу</p>
    </div>
</div>

<section class="cer-section cer-section--no-top">
    <div class="cer-container">
        <div class="cer-catalog">
            <aside class="cer-catalog__sidebar cer-fade-left">
                <div class="cer-catalog__filter-title">Категории</div>
                <ul class="cer-catalog__filter-list">
                    <li>
                        <a href="<?= Url::to(['/ceramic/catalog/index']) ?>"
                           class="<?= $currentCategory === null ? 'active' : '' ?>">Все</a>
                    </li>
                    <?php foreach ($categories as $cat):
                        $slug = is_array($cat) ? ($cat['slug'] ?? '') : $cat->slug;
                        $name = is_array($cat) ? ($cat['name'] ?? '') : $cat->name;
                    ?>
                        <li>
                            <a href="<?= Url::to(['/ceramic/catalog/index', 'category' => $slug]) ?>"
                               class="<?= $currentCategory === $slug ? 'active' : '' ?>"><?= Html::encode($name) ?></a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </aside>
            <div>
                <div class="cer-grid cer-grid--3 cer-fade-in">
                    <?php foreach ($products as $product): ?>
                        <?= ProductCard::widget(['product' => $product, 'showCategory' => true]) ?>
                    <?php endforeach; ?>
                </div>
                <?php if (empty($products)): ?>
                    <p style="text-align: center; padding: 60px 0; color: var(--cer-text-muted);">
                        В этой категории пока нет изделий
                    </p>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>

