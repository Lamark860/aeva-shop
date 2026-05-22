<?php
/** @var yii\web\View $this */
/** @var app\modules\ceramic\models\Order $order */
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = 'Заказ от ' . $order->name . ' — Админ';
?>
<div class="cer-admin">
<div class="cer-container">
<?= $this->render('_nav') ?>
<div class="cer-admin-header">
    <h1>Заказ от <?= Html::encode($order->name) ?></h1>
    <a href="<?= Url::to(['/ceramic/admin/orders']) ?>" class="cer-btn cer-btn--outline">← Назад</a>
</div>
<div class="cer-admin-form">
    <div class="form-group">
        <label>Статус</label>
        <p><span class="cer-badge cer-badge--<?= $order->status === 'new' ? 'new' : 'done' ?>"><?= Html::encode($order->status) ?></span></p>
    </div>
    <div class="form-group">
        <label>Дата</label>
        <p><?= Html::encode($order->created_at) ?></p>
    </div>
    <div class="form-group">
        <label>Имя</label>
        <p><?= Html::encode($order->name) ?></p>
    </div>
    <div class="form-group">
        <label>Email</label>
        <p><a href="mailto:<?= Html::encode($order->email) ?>"><?= Html::encode($order->email) ?></a></p>
    </div>
    <div class="form-group">
        <label>Телефон</label>
        <p><?= Html::encode($order->phone ?: '—') ?></p>
    </div>
    <div class="form-group">
        <label>Сообщение</label>
        <p style="white-space: pre-line"><?= Html::encode($order->message) ?></p>
    </div>
    <?php if ($order->status === 'new'): ?>
        <a href="<?= Url::to(['/ceramic/admin/update-order-status', 'id' => (string)$order->_id, 'status' => 'done']) ?>"
           class="cer-btn cer-btn--primary">Отметить выполненным</a>
    <?php endif; ?>
</div>
</div>
</div>

