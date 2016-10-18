<?php
use yii\helpers\Html;
?>
<div class="article-desc">
	<h2><?= Html::encode($data['article']['title']); ?></h2>
	<p class="clearfix">
		<span>点击量：</span><span class="click">0</span>
		<span>日期：</span><span class="update-date"><?= Html::encode(date('Y-m-d',strtotime($data['article']['update_time']))); ?></span>
		<button class="btn-edit btn btn-default btn-sm pull-right">修改</button>
	</p>
</div>
<div class="article-container">
	<?= $data['article']['content']; ?>
</div>
<script src="build/js/lt_libs.min.js"></script>
<script src="build/js/lt_global.min.js"></script>
<script src="build/js/lt_show.min.js"></script>
<script>
window.lt_show = {};
window.lt_show.id = '<?= Html::encode($data['article']['id']); ?>';
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
</style>