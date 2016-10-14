<?php
use yii\helpers\Html;
?>
This is a article show.

<h1>
	<span>标题：</span>
	<span>
		<?= Html::encode($data['article']['title']); ?>
	</span>
</h1>
<h4>
	<span>状态：</span>
	<span>
		<?= Html::encode($data['article']['status']); ?></h4>
	</span>
<p>
	<span>内容：</span>
	<span>
		<?= Html::encode($data['article']['content']); ?>
	</span>
</p>