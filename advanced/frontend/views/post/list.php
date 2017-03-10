<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>
<link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt-list-7189f0feed.min.css" />
<div class="row">
	<main class="col-md-9 list-container">
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
				</ul>
			</div>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading">
				最新文章
			</div>
			<div class="panel-body">
				<ul class="article-latest">
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
</script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-libs-5b35f0a97d.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-global-323f788beb.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-list-3ee0b71fa4.min.js"></script>