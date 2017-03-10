<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>
<link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt-show.min.css" />
<div class="article-desc">
	
</div>
<div class="article-container">
</div>
<div class="keyword-container">
</div>

<br />
<script>
if( typeof lt_values === 'undefined' ){
	lt_values = {};
}

if( typeof lt_values['show'] === 'undefined' ){
	lt_values['show'] = {
		isGuest:'<?= Html::encode( $data['isGuest'] ); ?>'
	}
}
</script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-libs.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-global.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-show.min.js"></script>
