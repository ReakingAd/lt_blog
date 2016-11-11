<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>
<link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt_list.min.css" />
<div class="panel panel-default">
	<div class="panel-heading">
		标签
	</div>
	<div class="panel-body tags-container">
		<?php var_dump($data['keywords']); ?>
<?php 
// $keywordsArr = Array();
// foreach( $data['keywords'] as $key => $value ){
// 	array_push($keywordsArr,$value['keyword']);
// }
// var_dump(array_unique( explode( ',',implode(',',$keywordsArr) ) ));
?>

	</div>
</div>
<div class="panel panel-default">
	<div class="panel-heading">
		文章列表
	</div>
	<div class="panel-body">
		<ul>
			<?php foreach($data['listAll'] as $listAll) {?>
				<li>
					<a class="pull-left" href="<?php echo Url::base(true) ?>/show/<?php echo $listAll["title"]; ?>"><?php echo $listAll['title']; ?></a>
					<?php if($listAll['status'] === '2' ) { ?>
						<i class="draft-label pull-left">[草稿]</i>
					<?php } ?>
					<span class="update-time pull-right"><?= Html::encode(date('Y-m-d',strtotime($listAll['update_time']))); ?></span>
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
			<?php foreach( $data['listHot'] as $listHot ){ ?>
				<li>
					<a href="<?php echo Url::base(true); ?>/show/<?php echo $listHot['title'];?>"><?php echo $listHot['title'] ;?></a>
					<span class="pv pull-right"><?= Html::encode($listHot['pv']); ?></span>
				</li>
			<?php } ?>
		</ul>
	</div>
</div>
<div class="panel panel-default">
	<div class="panel-heading">
		最新文章
	</div>
	<div class="panel-body">
		<ul>
			<?php foreach( $data['listLatest'] as $listLatest ){ ?>
				<li>
					<a href="<?php echo Url::base(true); ?>/show/<?php echo $listLatest['title'];?>"><?php echo $listLatest['title'] ;?></a>
					<span class="pv pull-right"><?= Html::encode($listLatest['update_time']); ?></span>
				</li>
			<?php } ?>
		</ul>
	</div>
</div>