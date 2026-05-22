<?php

/** @var yii\web\View $this */
/** @var app\modules\ceramic\models\OrderForm $model */

use yii\helpers\Html;
use yii\widgets\ActiveForm;

$this->title = 'Индивидуальный заказ — Керамика';
?>

<div class="cer-page-header">
    <div class="cer-container">
        <span class="cer-section__subtitle">На заказ</span>
        <h1>Индивидуальный заказ</h1>
        <p>Можно создать изделие специально для вас</p>
    </div>
</div>

<section class="cer-section cer-section--no-top">
    <div class="cer-container">
        <div class="cer-order">
            <?php if (Yii::$app->session->hasFlash('success')): ?>
                <div class="cer-flash">
                    <?= Yii::$app->session->getFlash('success') ?>
                </div>
            <?php endif; ?>

            <?php $form = ActiveForm::begin([
                'id' => 'order-form',
                'options' => ['class' => 'cer-order__form'],
                'fieldConfig' => [
                    'template' => "{label}\n{input}\n{error}",
                    'errorOptions' => ['class' => 'help-block'],
                ],
            ]); ?>

            <?= $form->field($model, 'name')->textInput(['placeholder' => 'Как к вам обращаться']) ?>

            <?= $form->field($model, 'email')->textInput(['placeholder' => 'your@email.com', 'type' => 'email']) ?>

            <?= $form->field($model, 'phone')->textInput(['placeholder' => '+7 (___) ___-__-__']) ?>

            <?= $form->field($model, 'message')->textarea([
                'placeholder' => 'Опишите, какое изделие вы хотели бы заказать — форму, размер, цвет, назначение...',
                'rows' => 5,
            ]) ?>

            <?= Html::hiddenInput('OrderForm[product_id]', $model->product_id) ?>

            <div class="cer-order__submit">
                <?= Html::submitButton('Отправить заявку', ['class' => 'cer-btn cer-btn--primary']) ?>
            </div>

            <?php ActiveForm::end(); ?>
        </div>
    </div>
</section>

