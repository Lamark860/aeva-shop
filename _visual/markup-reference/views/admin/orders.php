<?php
/** @var yii\web\View $this */
/** @var array $orders */
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = 'Заказы — Админ';
?>
<div class="cer-admin">
<div class="cer-container">
<?= $this->render('_nav') ?>
<?php if (Yii::$app->session->hasFlash('success')): ?>
    <div class="cer-flash"><?= Yii::$app->session->getFlash('success') ?></div>
<?php endif; ?>
<div class="cer-admin-header">
    <h1>Заказы</h1>
</div>
<?php if (empty($orders)): ?>
    <div class="cer-admin-empty"><p>Заказов пока нет</p></div>
<?php else: ?>
    <table class="cer-admin-table">
        <thead><tr><th>Дата</th><th>Имя</th><th>Email</th><th>Телефон</th><th class="cer-col-center">Статус</th><th>Действия</th></tr></thead>
        <tbody>
        <?php foreach ($orders as $order): ?>
            <tr>
                <td><?= Html::encode($order->created_at) ?></td>
                <td><strong><?= Html::encode($order->name) ?></strong></td>
                <td><?= Html::encode($order->email) ?></td>
                <td><?= Html::encode($order->phone) ?></td>
                <td class="cer-col-center"><span class="cer-badge cer-badge--<?= $order->status === 'new' ? 'new' : 'done' ?>"><?= Html::encode($order->status) ?></span></td>
                <td><div class="cer-admin-actions">
                    <a href="<?= Url::to(['/ceramic/admin/view-order', 'id' => (string)$order->_id]) ?>">Просмотр</a>
                    <?php if ($order->status === 'new'): ?>
                        <a href="<?= Url::to(['/ceramic/admin/update-order-status', 'id' => (string)$order->_id, 'status' => 'done']) ?>">✓ Выполнен</a>
                    <?php endif; ?>
                </div></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
<?php endif; ?>
</div>
</div>

