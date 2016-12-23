<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>
<link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt_list.min.css" />
<div class="panel panel-default">
	<div class="panel-heading">
		北京今日天气
	</div>
	<div class="panel-body">
		<span>PM2.5:</span>
		<span class="pm2_5">
			<img src="images/loading.gif" alt="">
		</span>
	</div>
</div>
<div class="panel panel-default">
	<div class="panel-heading">
		标签
	</div>
	<div class="panel-body tags-container">
		
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
					<a class="pull-left" href="<?php echo Url::base(true) ?>/article/<?php echo $listAll["id"]; ?>/<?php echo $listAll["title"]; ?>"><?php echo $listAll['title']; ?></a>
					<?php if($listAll['status'] === '2' ) { ?>
						<i class="draft-label pull-left">[草稿]</i>
					<?php } ?>
					<span class="update-time pull-right"><?= Html::encode(date('Y-m-d',strtotime($listAll['create_time']))); ?></span>
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
					<a href="<?php echo Url::base(true); ?>/article/<?php echo $listHot['id'];?>/<?php echo $listHot['title'];?>"><?php echo $listHot['title'] ;?></a>
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
					<a href="<?php echo Url::base(true); ?>/article/<?php echo $listLatest['id'];?>/<?php echo $listLatest['title'];?>"><?php echo $listLatest['title'] ;?></a>
					<span class="pv pull-right"><?= Html::encode($listLatest['create_time']); ?></span>
				</li>
			<?php } ?>
		</ul>
	</div>
</div>
<wb:share-button appkey="1621124604" addition="simple" type="button" ralateUid="1899226034" default_text="春爬村上树"></wb:share-button>
<script>
if( typeof lt_list === 'undefined' ){
	lt_list = {}
}
lt_list.keywords = '<?php echo $data['keywords']; ?>';
</script>
<script src="<?php echo Url::base(true); ?>/build/js/lt_libs.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt_global.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt_list.min.js"></script>