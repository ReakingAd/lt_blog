$(document).ready(function(){
	//实例化编辑器
    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    var ue = UE.getEditor('editor');
	$('.btn-submit').on('click',function(){
		var _title   = $('.article-title').val();
		var _content = UE.getEditor('editor').getContent();
		var _status  = $('.article-status').val();

		$.ajax({
			url:'index.php?r=post/save',
			type:'post',
			dataType:'json',
			data:'title=' + _title + '&content=' + _content + '&status=' +  _status,
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