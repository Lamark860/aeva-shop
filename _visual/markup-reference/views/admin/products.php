<?php
/** @var yii\web\View $this */
/** @var array $products */
/** @var array $categories */
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = 'Товары — Админ';
$catMap = [];
foreach ($categories as $cat) {
    $catMap[(string)$cat->_id] = $cat->name;
}
?>
<div class="cer-admin">
<div class="cer-container">
<?= $this->render('_nav') ?>
<?php if (Yii::$app->session->hasFlash('success')): ?>
    <div class="cer-flash"><?= Yii::$app->session->getFlash('success') ?></div>
<?php endif; ?>
<div class="cer-admin-header">
    <h1>Товары</h1>
    <a href="<?= Url::to(['/ceramic/admin/create-product']) ?>" class="cer-btn cer-btn--primary">+ Добавить товар</a>
</div>
<?php if (empty($products)): ?>
    <div class="cer-admin-empty">
        <p>Товаров пока нет</p>
        <a href="<?= Url::to(['/ceramic/admin/create-product']) ?>" class="cer-btn cer-btn--outline">Добавить первый товар</a>
    </div>
<?php else: ?>
    <table class="cer-admin-table">
        <thead><tr><th>Фото</th><th>Название</th><th>Категория</th><th class="cer-col-right">Цена</th><th class="cer-col-center">★</th><th>Действия</th></tr></thead>
        <tbody>
        <?php foreach ($products as $product): ?>
            <tr>
                <td><?php if ($img = $product->getMainImage()): ?><img src="<?= Html::encode($img) ?>" alt=""><?php else: ?>—<?php endif; ?></td>
                <td><strong><?= Html::encode($product->name) ?></strong></td>
                <td><?= Html::encode($catMap[(string)($product->category_id ?? '')] ?? '—') ?></td>
                <td class="cer-col-right"><?= $product->getFormattedPrice() ?></td>
                <td class="cer-col-center"><?= $product->featured ? '<span class="cer-badge cer-badge--featured">★</span>' : '' ?></td>
                <td><div class="cer-admin-actions">
                    <a href="<?= Url::to(['/ceramic/admin/edit-product', 'id' => (string)$product->_id]) ?>">Ред.</a>
                    <a href="<?= Url::to(['/ceramic/admin/delete-product', 'id' => (string)$product->_id]) ?>" class="delete" onclick="return confirm('Удалить?')">Удалить</a>
                </div></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
<?php endif; ?>
</div>
</div>

