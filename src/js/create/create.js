;(function(){

	'use strict';

	var root = this;
	var $ = root.jQuery;

	if( typeof root.blog === 'undefined' ){
		root.blog = {};
	}

	root.blog.create = {
		message:{

		},
		init:function(){
			this.initUeditor();
			this.submitArticle();
		},
		// initialize Ueditor
		initUeditor:function(){
			var _this = this;
			//实例化编辑器
		    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
		    var ue = UE.getEditor('editor');

		    // 给Ueditoer添加默认内容
		    ue.addListener( 'ready', function() {
		    	_this.getArticle(ue);
			});
		},
		// submit the article
		submitArticle:function(){
			$('.btn-submit').on('click',function(){
				var _title   = $('.article-title').val();
				var _content = UE.getEditor('editor').getContent();
				var _id      = $('.ariticle-id').val();
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
		},
		// get the article to be editted
		getArticle:function(ue){
			var _id = $('.ariticle-id').val();
			var _data = {
				id:_id
			};

			if( _id ){
				$.ajax({
					url:'index.php?r=post/get-article',
					type:'post',
					dataType:'json',
					data:_data,
					success:function(data){
						ue.setContent(data.content);
					}
				})
			}
		}
	}
}).call(this);

$(document).ready(function(){
	
	'use strict';

	var root = window;
	var $ = root.jQuery;

	root.blog.create.init();
});

