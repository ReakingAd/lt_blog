<?php
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = '下载';
$this->params['breadcrumbs'][] = $this->title;
?>

<h1>资源列表</h1>
<ul>
	<li>
		<a href="<?php echo Url::base(true); ?>/site/getfile?n=PHP manual.chm">PHP manual.chm</a>
	</li>
	<li>
		<a href="<?php echo Url::base(true); ?>/site/getfile?n=mysql manual.chm">mysql.chm</a>
	</li>
</ul>