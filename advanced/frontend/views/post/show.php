<?php
use yii\helpers\Html;
?>
<?php
var_dump( date('Y-m-d h:i:s') );
?>
<div class="article-desc">
	<h2><?= Html::encode($data['article']['title']); ?></h2>
	<p>
		<span>点击量：</span><span class="click">0</span>
		<span>日期：</span><span class="update-date"><?= Html::encode(date('Y-m-d',strtotime($data['article']['update_time']))); ?></span>
	</p>
</div>
<div class="article-container">
	<?= $data['article']['content']; ?>
</div>
<script src="build/js/lt_libs.min.js"></script>
<script src="build/js/lt_global.min.js"></script>
<script src="build/js/lt_show.min.js"></script>
<style>
.click{
	margin-right: 20px;
}
.article-desc{
	border-bottom: 1px solid #ccc;
}
.article-container{
	padding-top:20px;
}
</style>