<?php

/** @var yii\web\View $this */

use yii\helpers\Url;

$currentAction = Yii::$app->controller->action->id ?? '';
$items = [
    ['label' => 'Дашборд', 'url' => '/ceramic/admin', 'action' => 'index'],
    ['label' => 'Товары', 'url' => '/ceramic/admin/products', 'action' => 'products'],
    ['label' => 'Категории', 'url' => '/ceramic/admin/categories', 'action' => 'categories'],
    ['label' => 'Галерея', 'url' => '/ceramic/admin/gallery', 'action' => 'gallery'],
    ['label' => 'Заказы', 'url' => '/ceramic/admin/orders', 'action' => 'orders'],
];
?>
<nav class="cer-admin-nav">
    <?php foreach ($items as $item): ?>
        <a href="<?= Url::to([$item['url']]) ?>"
           class="<?= $currentAction === $item['action'] ? 'active' : '' ?>"><?= $item['label'] ?></a>
    <?php endforeach; ?>
    <a href="<?= Url::to(['/ceramic/default/index']) ?>" class="cer-admin-nav__back">← На сайт</a>
</nav>

