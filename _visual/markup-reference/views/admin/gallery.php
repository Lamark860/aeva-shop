<?php
/** @var yii\web\View $this */
/** @var array $items */
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = 'Галерея — Админ';
?>
<div class="cer-admin">
<div class="cer-container">
<?= $this->render('_nav') ?>
<?php if (Yii::$app->session->hasFlash('success')): ?>
    <div class="cer-flash"><?= Yii::$app->session->getFlash('success') ?></div>
<?php endif; ?>
<div class="cer-admin-header">
    <h1>Галерея</h1>
    <a href="<?= Url::to(['/ceramic/admin/create-gallery-item']) ?>" class="cer-btn cer-btn--primary">+ Добавить фото</a>
</div>
<?php if (empty($items)): ?>
    <div class="cer-admin-empty">
        <p>Галерея пуста</p>
        <a href="<?= Url::to(['/ceramic/admin/create-gallery-item']) ?>" class="cer-btn cer-btn--outline">Добавить первое фото</a>
    </div>
<?php else: ?>
    <table class="cer-admin-table">
        <thead><tr><th>Фото</th><th>Название</th><th class="cer-col-center">Размер</th><th class="cer-col-center">Порядок</th><th>Действия</th></tr></thead>
        <tbody>
        <?php foreach ($items as $item): ?>
            <tr>
                <td><img src="<?= Html::encode($item->image) ?>" alt=""></td>
                <td><?= Html::encode($item->title) ?></td>
                <td class="cer-col-center"><?= Html::encode($item->size) ?></td>
                <td class="cer-col-center"><?= $item->sort_order ?></td>
                <td><div class="cer-admin-actions">
                    <a href="<?= Url::to(['/ceramic/admin/edit-gallery-item', 'id' => (string)$item->_id]) ?>">Ред.</a>
                    <a href="<?= Url::to(['/ceramic/admin/delete-gallery-item', 'id' => (string)$item->_id]) ?>" class="delete" onclick="return confirm('Удалить?')">Удалить</a>
                </div></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
<?php endif; ?>
</div>
</div>

