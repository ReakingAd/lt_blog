;(function(){

	'use strict';

	var root = this;
	var $ = root.jQuery;

	if( typeof root.blog === 'undefined' ){
		root.blog = {};
	}

	root.blog.show = {
		init:function(){
			this.showKeyword();
			this.showKeywordPage();
		},
		// 创建关键词标签
		showKeyword:function(){
			var _keyword           = lt_list.keywords.split(',');
			var $keywordsContainer = $('.tags-container');

			for( var i=0;i<_keyword.length;i++ ){

				$keywordsContainer.tags({content:_keyword[i],canRemove:'false'});
			}

		},
		// 绑定标签功能
		showKeywordPage:function(){
			$('.tags-container').on('click','.tag-container',function(){
				var _keyword = $(this).find('.lt-tag').text();

				window.location.href = lt_global.baseurl + '/list/tags/' + _keyword;
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