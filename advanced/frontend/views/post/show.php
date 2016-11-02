<?php
use yii\helpers\Html;
?>
<div class="article-desc">
	<h2><?= Html::encode($data['article']['title']); ?></h2>
	<p class="clearfix">
		<span>点击量：</span><span class="click"><?= Html::encode($data['article']['pv'] + 1); ?></span>
		<span>日期：</span><span class="update-date"><?= Html::encode(date('Y-m-d',strtotime($data['article']['update_time']))); ?></span>
		<?php if( !$data['isGuest'] ){ ?>
			<button class="btn-edit btn btn-default btn-sm pull-right">修改</button>
		<?php } ?>
	</p>
</div>
<wb:share-button addition="full" type="button" ralateUid="1899226034"></wb:share-button>
<div class="article-container">
	<?= $data['article']['content']; ?>
</div>

<br />
<script src="../build/js/lt_libs.min.js"></script>
<script src="../build/js/lt_global.min.js"></script>
<script src="../build/js/lt_show.min.js"></script>
<script>
if( typeof lt_values === 'undefined' ){
	lt_values = {};
}

if( typeof lt_values['show'] === 'undefined' ){
	lt_values['show'] = {
		articleId: '<?= Html::encode($data['article']['id']); ?>',   // 文章id
		articleTitle: '<?= Html::encode($data['article']['title']); ?>'   // 文章title
	}
}
</script>
<style>

.click{
	margin-right: 20px;
}
.article-desc{
	border-bottom: 1px solid #ccc;
}
.article-desc p span{
	line-height: 2;
}
.article-container{
	padding-top:20px;
}
table td{
	border:1px solid #000;
}
.capture-pic{
	border:1px solid #000;
}
</style>