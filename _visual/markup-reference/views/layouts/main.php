<?php

/** @var yii\web\View $this */
/** @var string $content */

use app\modules\ceramic\assets\CeramicAsset;
use yii\helpers\Html;
use yii\helpers\Url;

CeramicAsset::register($this);

$this->registerCsrfMetaTags();
$this->registerMetaTag(['charset' => Yii::$app->charset], 'charset');
$this->registerMetaTag(['name' => 'viewport', 'content' => 'width=device-width, initial-scale=1']);
$this->registerMetaTag(['name' => 'description', 'content' => $this->params['meta_description'] ?? 'Авторская керамика ручной работы']);

$currentController = Yii::$app->controller->id ?? '';
$currentAction = Yii::$app->controller->action->id ?? '';
$isHeroPage = ($currentController === 'default' && $currentAction === 'index');
$navClass = 'cer-nav' . ($isHeroPage ? '' : ' cer-nav--inner');
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body class="cer-page">
<?php $this->beginBody() ?>

<!-- Scroll progress bar -->
<div class="cer-scroll-progress"></div>

<!-- Grain texture overlay -->
<div class="cer-grain"></div>

<!-- Custom cursor (gallery) -->
<div class="cer-cursor"></div>

<!-- Navigation -->
<nav class="<?= $navClass ?>">
    <div class="cer-nav__inner">
        <a href="<?= Url::to(['/ceramic/default/index']) ?>" class="cer-nav__brand">Керамика</a>
        <button class="cer-nav__toggle" aria-label="Меню">
            <span></span><span></span><span></span>
        </button>
        <ul class="cer-nav__links">
            <li><a href="<?= Url::to(['/ceramic/default/index']) ?>" class="cer-nav__link <?= $currentController === 'default' ? 'cer-nav__link--active' : '' ?>">Главная</a></li>
            <li><a href="<?= Url::to(['/ceramic/catalog/index']) ?>" class="cer-nav__link <?= $currentController === 'catalog' ? 'cer-nav__link--active' : '' ?>">Каталог</a></li>
            <li><a href="<?= Url::to(['/ceramic/gallery/index']) ?>" class="cer-nav__link <?= $currentController === 'gallery' ? 'cer-nav__link--active' : '' ?>">Галерея</a></li>
            <li><a href="<?= Url::to(['/ceramic/order/create']) ?>" class="cer-nav__link <?= $currentController === 'order' ? 'cer-nav__link--active' : '' ?>">На заказ</a></li>
            <li><a href="<?= Url::to(['/ceramic/admin/index']) ?>" class="cer-nav__link <?= $currentController === 'admin' ? 'cer-nav__link--active' : '' ?>">Админ</a></li>
        </ul>
    </div>
</nav>

<!-- Content -->
<?= $content ?>

<!-- Footer -->
<footer class="cer-footer">
    <div class="cer-container">
        <div class="cer-footer__inner">
            <div>
                <div class="cer-footer__brand">Керамика</div>
                <p>Авторская керамика<br>ручной работы</p>
            </div>
            <div>
                <div class="cer-footer__heading">Навигация</div>
                <ul class="cer-footer__links">
                    <li><a href="<?= Url::to(['/ceramic/default/index']) ?>">Главная</a></li>
                    <li><a href="<?= Url::to(['/ceramic/catalog/index']) ?>">Каталог</a></li>
                    <li><a href="<?= Url::to(['/ceramic/gallery/index']) ?>">Галерея</a></li>
                    <li><a href="<?= Url::to(['/ceramic/order/create']) ?>">Индивидуальный заказ</a></li>
                </ul>
            </div>
            <div>
                <div class="cer-footer__heading">Контакты</div>
                <ul class="cer-footer__links">
                    <li>hello@ceramic-studio.ru</li>
                    <li>+7 (999) 123-45-67</li>
                </ul>
                <div class="cer-footer__socials">
                    <a href="#">Instagram</a>
                    <a href="#">Telegram</a>
                    <a href="#">VK</a>
                </div>
            </div>
        </div>
        <div class="cer-footer__copy">
            &copy; <?= date('Y') ?> Керамика. Все изделия выполнены вручную.
        </div>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>

