<?php
/** @var yii\web\View $this */
/** @var app\modules\ceramic\models\Product $model */
/** @var array $categories */
/** @var bool $isNew */
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = ($isNew ? 'Новый товар' : 'Редактировать: ' . $model->name) . ' — Админ';
$imagesText = is_array($model->images) ? implode("\n", $model->images) : '';
?>
<div class="cer-admin">
<div class="cer-container">
<?= $this->render('_nav') ?>
<div class="cer-admin-header">
    <h1><?= $isNew ? 'Новый товар' : 'Редактировать товар' ?></h1>
    <a href="<?= Url::to(['/ceramic/admin/products']) ?>" class="cer-btn cer-btn--outline">← Назад</a>
</div>
<form method="post" class="cer-admin-form">
    <input type="hidden" name="<?= Yii::$app->request->csrfParam ?>" value="<?= Yii::$app->request->csrfToken ?>">
    <div class="form-group">
        <label>Название</label>
        <input type="text" name="Product[name]" value="<?= Html::encode($model->name) ?>" required>
    </div>
    <div class="form-group">
        <label>Slug (URL)</label>
        <input type="text" name="Product[slug]" value="<?= Html::encode($model->slug) ?>" placeholder="Автоматически из названия">
        <div class="form-hint">Оставьте пустым для авто-генерации</div>
    </div>
    <div class="form-group">
        <label>Цена (₽)</label>
        <input type="number" name="Product[price]" value="<?= $model->price ?>" step="100" required>
    </div>
    <div class="form-group">
        <label>Категория</label>
        <select name="Product[category_id]">
            <option value="">— Без категории —</option>
            <?php foreach ($categories as $cat): ?>
                <option value="<?= (string)$cat->_id ?>" <?= (string)($model->category_id ?? '') === (string)$cat->_id ? 'selected' : '' ?>>
                    <?= Html::encode($cat->name) ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>
    <div class="form-group">
        <label>Краткое описание</label>
        <input type="text" name="Product[short_description]" value="<?= Html::encode($model->short_description) ?>">
    </div>
    <div class="form-group">
        <label>Описание</label>
        <textarea name="Product[description]" rows="4"><?= Html::encode($model->description) ?></textarea>
    </div>
    <div class="form-group">
        <label>Изображения (URL, по одному на строку)</label>
        <textarea name="Product[images_text]" rows="4" placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"><?= Html::encode($imagesText) ?></textarea>
        <div class="form-hint">Каждый URL на отдельной строке. Первое изображение = главное фото.</div>
    </div>
    <div class="form-group">
        <label>Порядок сортировки</label>
        <input type="number" name="Product[sort_order]" value="<?= $model->sort_order ?? 0 ?>">
    </div>
    <div class="form-group">
        <div class="form-check">
            <input type="checkbox" name="Product[featured]" value="1" <?= $model->featured ? 'checked' : '' ?>>
            <label class="cer-admin-form__check-label">Показывать в избранном на главной</label>
        </div>
    </div>
    <button type="submit" class="cer-btn cer-btn--primary"><?= $isNew ? 'Создать' : 'Сохранить' ?></button>
</form>
</div>
</div>

