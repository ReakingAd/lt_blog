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
		},
		// binding edit article
		goEditArticle:function(){
			$('.btn-edit').on('click',function(){
				var _title = lt_values['show']['articleTitle'];
				var _url = '../create?title=' + _title;

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
				console.log(_keywordArr[i]);
				$container.tags({
					content:_keywordArr[i]
				});
			}
		}
	}
}).call(this);

$(document).ready(function(){
	
	'use strict';

	var root = window;
	var $ = root.jQuery;

	root.blog.show.init();
});