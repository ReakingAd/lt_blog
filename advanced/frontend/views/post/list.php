<div class="panel panel-default">
	<div class="panel-heading">
		文章列表
	</div>
	<div class="panel-body">
		<ul>
			<?php foreach($data['list'] as $article) {?>
				<li><a href="../show/<?php echo $article["id"]; ?>"><?php echo $article['title']; ?></a></li>
			<?php } ?>
		</ul>
	</div>
</div>