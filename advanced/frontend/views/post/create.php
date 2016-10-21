<?php
use yii\helpers\Html;
?>
<form class="article-form" action="" method="post">
	<div class="form-group">
		<label for="title">标题:</label>
		<input class="article-title form-control" id="title" name='title' type="text" value="<?= Html::encode(isset($data['article']['title']) ? $data['article']['title'] : '' ); ?>" />
	</div>
	<div class="form-group">
		<label for="content">内容:</label>
		<div class="editor-container" id="content">
		    <script id="editor" type="text/plain" style="height:500px;"></script>
		</div>
	</div>
	<div class="form-group">
		<label for="status">状态:</label>
		<select class="article-status" name="status" id="status">
			<option value="1">发布</option>
			<option value="2">草稿</option>
			<option value="3">已存档</option>
		</select>
	</div>
	<input class="btn-submit btn btn-info" type="button" value="提交" />
</form>

<script src="build/js/lt_libs.min.js"></script>
<script src="build/js/lt_global.min.js"></script>
<script type="text/javascript" charset="utf-8" src="build/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="build/ueditor/ueditor.all.min.js"> </script>
<!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
<!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
<script type="text/javascript" charset="utf-8" src="build/ueditor/lang/zh-cn/zh-cn.js"></script>
<script>
var create = {};
create.article = {};
create.article.id = '<?= Html::encode( isset($data['article']['id']) ? $data['article']['id'] : '' ); ?>'
create.article.content = '<?= Html::encode( isset($data['article']['content'])) ? $data['article']['content'] : ''; ?>';
</script>
<script src="build/js/lt_create.min.js"></script>
