<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>
<link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt-show.min.css" />
<div class="article-desc">
	<h2><?= Html::encode($data['article']['title']); ?></h2>
	<p class="clearfix">
		<span>点击量：</span><span class="click"><?= Html::encode($data['article']['pv'] + 1); ?></span>
		<span>日期：</span><span class="update-date"><?= Html::encode(date('Y-m-d',strtotime($data['article']['create_time']))); ?></span>
		<?php if( !$data['isGuest'] ){ ?>
			<button class="btn-edit btn btn-default btn-sm pull-right">修改</button>
		<?php } ?>
		<wb:share-button appkey="1621124604" addition="simple" type="button" ralateUid="1899226034" default_text="<?= Html::encode($data['article']['title']); ?>"></wb:share-button>
	</p>
</div>
<div class="article-container">
	<?= $data['article']['content']; ?>
</div>
<div class="keyword-container">
</div>

<br />
<script>
if( typeof lt_values === 'undefined' ){
	lt_values = {};
}

if( typeof lt_values['show'] === 'undefined' ){
	lt_values['show'] = {
		articleId: '<?= Html::encode($data['article']['id']); ?>',   // 文章id
		articleTitle: '<?= Html::encode($data['article']['title']); ?>',   // 文章title
		articleKeyword: '<?= Html::encode($data['article']['keyword']); ?>',   // 文章keyword
	}
}
</script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-libs.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-global.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-show.min.js"></script>
