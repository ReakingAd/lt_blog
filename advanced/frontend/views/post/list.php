<?php
use yii\helpers\Html;
?>
<div class="panel panel-default">
	<div class="panel-heading">
		文章列表
	</div>
	<div class="panel-body">
		<ul>
			<?php foreach($data['list'] as $article) {?>
				<li>
					<a class="pull-left" href="../show/<?php echo $article["title"]; ?>"><?php echo $article['title']; ?></a>
					<span class="update-time pull-right"><?= Html::encode(date('Y-m-d',strtotime($article['update_time']))); ?></span>
				</li>
			<?php } ?>
		</ul>
<style>
.update-time{
	color:#ccc;
}
li{
	border:1px solid transparent;
}
</style>
	</div>
</div>