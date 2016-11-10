<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>
<link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt_list.min.css" />
<div class="panel panel-default">
	<div class="panel-heading">
		文章列表
	</div>
	<div class="panel-body">
		<ul>
			<?php foreach($data['list'] as $article) {?>
				<li>
					<a class="pull-left" href="<?php echo Url::base(true) ?>/show/<?php echo $article["title"]; ?>"><?php echo $article['title']; ?></a>
					<?php if($article['status'] === '2' ) { ?>
						<i class="draft-label pull-left">[草稿]</i>
					<?php } ?>
					<span class="update-time pull-right"><?= Html::encode(date('Y-m-d',strtotime($article['update_time']))); ?></span>
				</li>
			<?php } ?>
		</ul>
	</div>
</div>
<div class="panel panel-default">
	<div class="panel-heading">
		热门排行
	</div>
	<div class="panel-body">
		<ul>
			<li>1</li>
			<li>2</li>
			<li>3</li>
		</ul>
		<?php var_dump($data['listHot']); ?>
	</div>
</div>