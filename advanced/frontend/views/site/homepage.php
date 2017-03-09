<?php
use yii\helpers\Url;

?>
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
if( typeof lt_homepage === 'undefined' ){
	lt_homepage = {}
}
</script>
<script src="<?php echo Url::base(true); ?>/build/js/lt_libs-442392e6b3.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt_global-47024ca277.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt_homepage-b0eec5f7a0.min.js"></script>
