<?php
use yii\helpers\Url;

$this->title = '星际入侵';
$this->params['breadcrumbs'][] = $this->title;
?>
<style>
.wrap,.container{
	height:100%;
}
iframe{
	width:100%;
	height:100%;
}
</style>
<iframe src="<?php echo Url::base(true); ?>/Alien Invasion/index.html" frameborder="0"></iframe>