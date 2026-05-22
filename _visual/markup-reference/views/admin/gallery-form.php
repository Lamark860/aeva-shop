<?php
/** @var yii\web\View $this */
/** @var app\modules\ceramic\models\GalleryItem $model */
/** @var bool $isNew */
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = ($isNew ? 'Новое фото' : 'Редактировать: ' . $model->title) . ' — Админ';
?>
<div class="cer-admin">
<div class="cer-container">
<?= $this->render('_nav') ?>
<div class="cer-admin-header">
    <h1><?= $isNew ? 'Новое фото' : 'Редактировать фото' ?></h1>
    <a href="<?= Url::to(['/ceramic/admin/gallery']) ?>" class="cer-btn cer-btn--outline">← Назад</a>
</div>
<form method="post" class="cer-admin-form">
    <input type="hidden" name="<?= Yii::$app->request->csrfParam ?>" value="<?= Yii::$app->request->csrfToken ?>">
    <div class="form-group">
        <label>Название</label>
        <input type="text" name="GalleryItem[title]" value="<?= Html::encode($model->title) ?>">
    </div>
    <div class="form-group">
        <label>Изображение (URL)</label>
        <input type="text" name="GalleryItem[image]" value="<?= Html::encode($model->image) ?>" required placeholder="https://...">
    </div>
    <div class="form-group">
        <label>Описание</label>
        <textarea name="GalleryItem[description]" rows="2"><?= Html::encode($model->description) ?></textarea>
    </div>
    <div class="form-group">
        <label>Размер в сетке</label>
        <select name="GalleryItem[size]">
            <option value="normal" <?= ($model->size ?? '') === 'normal' ? 'selected' : '' ?>>Обычный</option>
            <option value="tall" <?= ($model->size ?? '') === 'tall' ? 'selected' : '' ?>>Высокий</option>
            <option value="wide" <?= ($model->size ?? '') === 'wide' ? 'selected' : '' ?>>Широкий</option>
        </select>
    </div>
    <div class="form-group">
        <label>Порядок сортировки</label>
        <input type="number" name="GalleryItem[sort_order]" value="<?= $model->sort_order ?? 0 ?>">
    </div>
    <button type="submit" class="cer-btn cer-btn--primary"><?= $isNew ? 'Создать' : 'Сохранить' ?></button>
</form>
</div>
</div>

