<?php

/** @var yii\web\View $this */
/** @var int $productCount */
/** @var int $categoryCount */
/** @var int $galleryCount */
/** @var int $orderCount */
/** @var int $newOrderCount */
/** @var array $recentOrders */

use yii\helpers\Html;
use yii\helpers\Url;

$this->title = 'Админ-панель — Керамика';
?>

<div class="cer-admin">
    <div class="cer-container">
        <?= $this->render('_nav') ?>

        <div class="cer-admin-header">
            <h1>Дашборд</h1>
            <form method="post" action="<?= Url::to(['/ceramic/admin/seed-demo']) ?>">
                <input type="hidden" name="<?= Yii::$app->request->csrfParam ?>" value="<?= Yii::$app->request->csrfToken ?>">
                <button type="submit" class="cer-btn cer-btn--outline cer-btn--sm" onclick="return confirm('Загрузить демо-данные в MongoDB?')">
                    Загрузить демо-данные
                </button>
            </form>
        </div>

        <?php if (Yii::$app->session->hasFlash('success')): ?>
            <div class="cer-flash"><?= Yii::$app->session->getFlash('success') ?></div>
        <?php endif; ?>

        <div class="cer-admin-stats">
            <div class="cer-admin-stat">
                <div class="cer-admin-stat__number"><?= $productCount ?></div>
                <div class="cer-admin-stat__label">Товаров</div>
            </div>
            <div class="cer-admin-stat">
                <div class="cer-admin-stat__number"><?= $categoryCount ?></div>
                <div class="cer-admin-stat__label">Категорий</div>
            </div>
            <div class="cer-admin-stat">
                <div class="cer-admin-stat__number"><?= $galleryCount ?></div>
                <div class="cer-admin-stat__label">Фото в галерее</div>
            </div>
            <div class="cer-admin-stat">
                <div class="cer-admin-stat__number"><?= $orderCount ?></div>
                <div class="cer-admin-stat__label">Заказов</div>
            </div>
            <?php if ($newOrderCount > 0): ?>
                <div class="cer-admin-stat cer-admin-stat--accent">
                    <div class="cer-admin-stat__number"><?= $newOrderCount ?></div>
                    <div class="cer-admin-stat__label">Новых заказов</div>
                </div>
            <?php endif; ?>
        </div>

        <?php if (!empty($recentOrders)): ?>
            <h3>Последние заказы</h3>
            <table class="cer-admin-table">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th class="cer-col-center">Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($recentOrders as $order): ?>
                        <tr>
                            <td><?= Html::encode($order->created_at) ?></td>
                            <td><?= Html::encode($order->name) ?></td>
                            <td><?= Html::encode($order->email) ?></td>
                            <td class="cer-col-center">
                                <span class="cer-badge cer-badge--<?= $order->status === 'new' ? 'new' : 'done' ?>">
                                    <?= Html::encode($order->status) ?>
                                </span>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>

        <?php if ($productCount == 0): ?>
            <div class="cer-admin-empty">
                <p>База данных пуста. На сайте отображаются демо-данные.</p>
                <p>Нажмите «Загрузить демо-данные» чтобы перенести их в MongoDB,<br>
                или начните добавлять контент вручную через разделы выше.</p>
            </div>
        <?php endif; ?>
    </div>
</div>

