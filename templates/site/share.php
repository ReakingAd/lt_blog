<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>
<link rel="stylesheet" href="<?php echo Url::base(true); ?>/build/css/lt-share.min.css" />
<div class="row">
	<div class="panel panel-default">
		<div class="panel-heading">
			下载列表
		</div>
		<div class="panel-body">
			<ul>
				<li>
					<a href="<?php echo Url::base(true); ?>/site/getfile?n=PHP manual.chm" title="PHP中文手册">PHP manual.chm</a>
				</li>
				<li>
					<a href="<?php echo Url::base(true); ?>/site/getfile?n=mysql manual.chm" title="mysql中文手册">mysql.chm</a>
				</li>
				<li>
					<a href="<?php echo Url::base(true); ?>/site/getfile?n=城市站号.xls" title="百度城市站号表">城市站号.xls</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="panel panel-default">
		<div class="panel-heading">
			资源链接
		</div>
		<div class="panel-body">
			<ul>
				<li>
					<a href="http://es6.ruanyifeng.com/#README" title="ECMAScript6入门" target="_blank">ECMAScript6入门--阮一峰</a>
				</li>
				<li>
					<a href="http://react-china.org/" title="React中文论坛" target="_blank">React China</a>
				</li>
				<li>
					<a href="https://cnodejs.org/" title="国内最大的nodejs开源技术社区" target="_blank">cnode</a>
				</li>
			</ul>
		</div>
	</div>
</div>
