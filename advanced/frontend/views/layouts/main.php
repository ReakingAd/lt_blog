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
<!DOCTYPE html xmlns:wb="http://open.weibo.com/wb">
<html lang="<?= Yii::$app->language ?>" xmlns:wb="http://open.weibo.com/wb">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="wb:webmaster" content="763685fa26fc02c5" />
    <script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js" type="text/javascript" charset="utf-8"></script>
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt_global.min.css" />
    <link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt_libs.min.css" />
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

<div class="wrap">
    <?php
    NavBar::begin([
        'brandLabel' => '春爬村上树',
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top',
        ],
    ]);
    $menuItems = [
        ['label' => '博文', 'url' => ['/post/list']],
        // ['label' => 'About', 'url' => ['/site/about']],
        // ['label' => 'Contact', 'url' => ['/site/contact']],
        ['label' => '下载', 'url' => ['/site/download']],
        ['label' => '游戏', 'url' => ['/game']],
    ];
    if (Yii::$app->user->isGuest) {
        // $menuItems[] = ['label' => 'Signup', 'url' => ['/site/signup']];
        $menuItems[] = ['label' => '登录', 'url' => ['/site/login']];
    } else {
        $menuItems[] = '<li>'
            . Html::beginForm(['/site/logout'], 'post')
            . Html::submitButton(
                '登出 (' . Yii::$app->user->identity->username . ')',
                ['class' => 'btn btn-link']
            )
            . Html::endForm()
            . '</li>';
    }
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => $menuItems,
    ]);
    NavBar::end();
    ?>

    <div class="container">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= Alert::widget() ?>
        <?= $content ?>
    </div>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">京ICP备 16033395号-1</p>
        <p class="pull-right"><?= Yii::myPowered() ?> &copy; <?= date('Y'); ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
<script src="http://s4.cnzz.com/z_stat.php?id=1259343606&web_id=1259343606" language="JavaScript"></script>
</body>
</html>
<?php $this->endPage() ?>