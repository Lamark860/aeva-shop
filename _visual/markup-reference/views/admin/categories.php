<?php
/** @var yii\web\View $this */
/** @var array $categories */
/** @var array $productCounts */
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = 'Категории — Админ';
?>
<div class="cer-admin">
<div class="cer-container">
<?= $this->render('_nav') ?>
<?php if (Yii::$app->session->hasFlash('success')): ?>
    <div class="cer-flash"><?= Yii::$app->session->getFlash('success') ?></div>
<?php endif; ?>
<div class="cer-admin-header">
    <h1>Категории</h1>
    <a href="<?= Url::to(['/ceramic/admin/create-category']) ?>" class="cer-btn cer-btn--primary">+ Добавить категорию</a>
</div>
<?php if (empty($categories)): ?>
    <div class="cer-admin-empty">
        <p>Категорий пока нет</p>
        <a href="<?= Url::to(['/ceramic/admin/create-category']) ?>" class="cer-btn cer-btn--outline">Добавить первую</a>
    </div>
<?php else: ?>
    <table class="cer-admin-table">
        <thead><tr><th>Фото</th><th>Название</th><th>Slug</th><th class="cer-col-center">Товаров</th><th class="cer-col-center">Порядок</th><th>Действия</th></tr></thead>
        <tbody>
        <?php foreach ($categories as $cat):
            $count = $productCounts[(string)$cat->_id] ?? 0;
        ?>
            <tr>
                <td><?php if ($cat->image): ?><img src="<?= Html::encode($cat->image) ?>" alt=""><?php else: ?>—<?php endif; ?></td>
                <td><strong><?= Html::encode($cat->name) ?></strong></td>
                <td><?= Html::encode($cat->slug) ?></td>
                <td class="cer-col-center">
                    <?php if ($count > 0): ?>
                        <span class="cer-badge cer-badge--featured"><?= $count ?></span>
                    <?php else: ?>
                        <span class="cer-badge cer-badge--muted">0</span>
                    <?php endif; ?>
                </td>
                <td class="cer-col-center"><?= $cat->sort_order ?></td>
                <td><div class="cer-admin-actions">
                    <a href="<?= Url::to(['/ceramic/admin/edit-category', 'id' => (string)$cat->_id]) ?>">Ред.</a>
                    <a href="<?= Url::to(['/ceramic/admin/delete-category', 'id' => (string)$cat->_id]) ?>" class="delete" onclick="return confirm('Удалить категорию?')">Удалить</a>
                </div></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
<?php endif; ?>
</div>
</div>

