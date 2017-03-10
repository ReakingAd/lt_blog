<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>
<link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt-show-d48dbd6d1d.min.css" />
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
<script src="<?php echo Url::base(true); ?>/build/js/lt-libs-608d93d1e7.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-global-323f788beb.min.js"></script>
<script src="<?php echo Url::base(true); ?>/build/js/lt-show-c9f7134e06.min.js"></script>
