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
			this.addTag();
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
			var _this = this;

			$('.btn-submit').on('click',function(){
				// console.log('in')
				// return;
				var _title   = $('.article-title').val();
				var _content = UE.getEditor('editor').getContent();
				var _id      = $('.ariticle-id').val();
				var _status  = $('.article-status').val();
				var _keyword = _this.getKeyword();
				var _obj     = {
					id:_id,
					title:_title,
					content:_content,
					status:_status,
					keyword:_keyword
				};
				var _ajaxUrl = '';
				// 更新文章
				if( _id ){
					_ajaxUrl = 'post/update';
				}
				// 新建文章
				else {
					_ajaxUrl = 'post/save';
				}
				$.ajax({
					url:_ajaxUrl,
					type:'post',
					dataType:'json',
					data:_obj,
					success:function(data){
						if(data.result === 'success'){
							window.location.href = 'list';
						}
						else{
							alert(data.result);
						}
					}
				})
			});
		},
		getKeyword:function(){
			var $tags = $('.lt-tag');
			var tagsArr  = [];

			$.each($tags,function(index,target){
				tagsArr.push( $(target).text() );
			});
			return tagsArr.join(',');
		},
		// get the article to be editted
		getArticle:function(ue){
			var _id = $('.ariticle-id').val();
			var _data = {
				id:_id
			};

			if( _id ){
				var _url =  root.blog.global.message.url_prefix + 'post/get-article?id=' + _id;

				$.ajax({
					url:_url,
					type:'post',
					dataType:'json',
					data:_data,
					success:function(data){
						ue.setContent(data.content);
					}
				})
			}
		},
		// add a tag
		addTag:function(){
			$('.btn-addtag').on('click',function(){
				var $keyword    = $('#keyword');
				var _tagContent = $('#keyword').val();

				$('.keyword-container').tags({
					content:_tagContent
				});
				$keyword.val('');
			});
		}
	}
}).call(this);

$(document).ready(function(){
	
	'use strict';

	var root = window;
	var $ = root.jQuery;

	root.blog.create.init();
});

