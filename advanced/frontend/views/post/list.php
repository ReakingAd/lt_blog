<h1>Here is article list.</h1>
<table border="1">
	<tr>
		<th>id</th>
		<th>title</th>
		<th>content</th>
	</tr>
	<?php foreach($data['list'] as $article) {?>
		<tr>
			<td><?php echo $article['id']; ?></td>
			<td><a href="index.php?r=post/show&id=<?php echo $article["id"]; ?>"><?php echo $article['title']; ?></a></td>
			<td><?php echo $article['content']; ?></td>
		</tr>
	<?php }?>	
</table>
<style>
	ta
</style>