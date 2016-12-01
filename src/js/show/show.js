;(function(){

	'use strict';

	var root = this;
	var $ = root.jQuery;

	if( typeof root.blog === 'undefined' ){
		root.blog = {};
	}

	root.blog.show = {
		init:function(){
			this.goEditArticle();
			this.countPv();
			this.showKeyword();
			this.toTagsList();
		},
		// binding edit article
		goEditArticle:function(){
			$('.btn-edit').on('click',function(){
				var _id  = lt_values['show']['articleId'];
				var _url = root.blog.global.message.server = '/create?id=' + _id;

				window.location.href = _url;
			});
		},
		// ajax to count PV
		countPv:function(){
			var _data = {
				title:lt_values['show']['articleTitle']
			};

			$.ajax({
				url:'../post/count-pv',
				type:'post',
				dataType:'json',
				data:_data,
				success:function(data){
					if(data.result = 'success'){
						console.log('============== count =============');
					}
				}
			});
		},
		showKeyword:function(){
			var _keyword    = lt_values.show.articleKeyword;
			var _keywordArr = _keyword.split(',');
			var $container  = $('.keyword-container');

			for( var i=0;i<_keywordArr.length;i++){
				$container.tags({
					content:_keywordArr[i],
					canRemove:'false'
				});
			}
		},
		// 跳转标签相关列表
		toTagsList:function(){
			$('.keyword-container').on('click','.tag-container',function(){
				var _tag = $(this).find('.lt-tag').text();

				window.location.href = lt_global.baseurl + '/list/tags/' + _tag;
			});
		}
	}
}).call(this);

$(document).ready(function(){
	
	'use strict';

	var root = window;
	var $ = root.jQuery;

	root.blog.show.init();
});