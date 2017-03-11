<?php
use yii\helpers\Url;
?>
<link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt-homepage-a8c698b673.min.css" />
<div class="row">
	<main class="col-md-9 article-container list-container">
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
<script src="<?php echo Url::base(true); ?>/build/js/lt-libs-9b317b8949.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-global-323f788beb.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-homepage-c8794a90ca.min.js"></script>
