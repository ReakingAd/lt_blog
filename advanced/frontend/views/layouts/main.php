<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use frontend\assets\AppAsset;
use common\widgets\Alert;
use yii\helpers\Url;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt_global-e77a0d4644.min.css" />
    <link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt_libs-1d3fa32d56.min.css" />
</head>
<body>
<script>
if( typeof lt_global === 'undefined' ){
    var lt_global = {}
}
lt_global = {
    baseurl:'<?php echo Url::base(true); ?>'
}
</script>
<?php $this->beginBody() ?>

<header></header>
<nav class="home-nav">
    <ul>
        <li class="<?php if($this->title == '首页'){ echo 'nav-active';} ?>" name="homepage"><a href="/" title="春爬村上树-首页">首页</a></li>
        <li class="<?php if($this->title == '博文列表'){ echo 'nav-active';} ?>" name="list"><a href="post/list" title="春爬村上树-博文列表">博文</a></li>
        <li class="<?php if($this->title == '下载'){ echo 'nav-active';} ?>" name="downlad"><a href="site/download" title="春爬村上树-下载">下载</a></li>
        <li class="<?php if($this->title == '关于我'){ echo 'nav-active';} ?>" name="aboutme"><a href="/" title="春爬村上树-个人简介">关于</a></li>
    </ul>
</nav>

<section class="container">
    <?= Breadcrumbs::widget([
        'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
    ]) ?>
    <?= Alert::widget() ?>
    <?= $content ?>
</section>

<footer class="footer">
    <div class="container">
        <p class="pull-left">京ICP备 16033395号-1</p>
        <p class="pull-right"><?= Yii::myPowered() ?> &copy; <?= date('Y'); ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>