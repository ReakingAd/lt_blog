$(document).ready(function(){
	//实例化编辑器
    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    var ue = UE.getEditor('editor');
    // 给Ueditoer添加默认内容
    ue.addListener( 'ready', function() {
    	ue.setContent(create.article.content);
	});

	$('.btn-submit').on('click',function(){
		var _title   = $('.article-title').val();
		var _content = UE.getEditor('editor').getContent();
		var _id      = create.article.id;
		var _status  = $('.article-status').val();
		var _obj     = {
			id:_id,
			title:_title,
			content:_content,
			status:_status
		};

		var _ajaxUrl = '';
		// 更新文章
		if( _id ){
			_ajaxUrl = 'index.php?r=post/update';
		}
		// 新建文章
		else {
			_ajaxUrl = 'index.php?r=post/save';
		}

		$.ajax({
			url:_ajaxUrl,
			type:'post',
			dataType:'json',
			data:_obj,
			success:function(data){
				if(data.result === 'success'){
					window.location.href = 'index.php?r=post/index';
				}
				else{
					alert(data.result);
				}
			}
		})
	});
	

});