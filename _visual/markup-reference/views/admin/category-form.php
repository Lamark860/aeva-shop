<?php
/** @var yii\web\View $this */
/** @var app\modules\ceramic\models\Category $model */
/** @var bool $isNew */
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = ($isNew ? 'Новая категория' : 'Редактировать: ' . $model->name) . ' — Админ';
?>
<div class="cer-admin">
<div class="cer-container">
<?= $this->render('_nav') ?>
<div class="cer-admin-header">
    <h1><?= $isNew ? 'Новая категория' : 'Редактировать категорию' ?></h1>
    <a href="<?= Url::to(['/ceramic/admin/categories']) ?>" class="cer-btn cer-btn--outline">← Назад</a>
</div>
<form method="post" class="cer-admin-form">
    <input type="hidden" name="<?= Yii::$app->request->csrfParam ?>" value="<?= Yii::$app->request->csrfToken ?>">
    <div class="form-group">
        <label>Название</label>
        <input type="text" name="Category[name]" value="<?= Html::encode($model->name) ?>" required>
    </div>
    <div class="form-group">
        <label>Slug (URL)</label>
        <input type="text" name="Category[slug]" value="<?= Html::encode($model->slug) ?>" placeholder="Автоматически">
    </div>
    <div class="form-group">
        <label>Описание</label>
        <textarea name="Category[description]" rows="3"><?= Html::encode($model->description) ?></textarea>
    </div>
    <div class="form-group">
        <label>Изображение (URL)</label>
        <input type="text" name="Category[image]" value="<?= Html::encode($model->image) ?>" placeholder="https://...">
    </div>
    <div class="form-group">
        <label>Порядок сортировки</label>
        <input type="number" name="Category[sort_order]" value="<?= $model->sort_order ?? 0 ?>">
    </div>
    <button type="submit" class="cer-btn cer-btn--primary"><?= $isNew ? 'Создать' : 'Сохранить' ?></button>
</form>
</div>
</div>

