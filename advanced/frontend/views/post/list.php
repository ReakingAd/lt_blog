<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>
<link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt_list-4bdfa16b8e.min.css" />
<div class="row">
	<main class="col-md-9">
		<div class="panel panel-default">
			<div class="panel-heading">
				文章列表
			</div>
			<div class="panel-body">
				<ul class="article-all"></ul>
			</div>
		</div>
		<!-- 分页页码 -->
		<div class="x_page_container">
			<div class="btn-group pull-right">
				<ul class="lt-pagination">
				</ul>
			</div>
		</div>
		<!-- /分页页码 -->
		<div class="panel panel-default">
			<div class="panel-heading">
				热门排行
			</div>
			<div class="panel-body">
				<ul class="article-hot">
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
				<ul class="article-latest">
					<?php foreach( $data['listLatest'] as $listLatest ){ ?>
						<li>
							<a href="<?php echo Url::base(true); ?>/article/<?php echo $listLatest['id'];?>/<?php echo $listLatest['title'];?>"><?php echo $listLatest['title'] ;?></a>
							<span class="pv pull-right"><?= Html::encode($listLatest['create_time']); ?></span>
						</li>
					<?php } ?>
				</ul>
			</div>
		</div>
	</main>
	<aside class="col-md-3">
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
	</aside>
</div>




<script>
if( typeof lt_list === 'undefined' ){
	lt_list = {}
}
lt_list.keywords = '<?php echo $data['keywords']; ?>';
</script>
<script src="<?php echo Url::base(true); ?>/build/js/lt_libs-442392e6b3.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt_global-47024ca277.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt_list-6cab118b2f.min.js"></script>