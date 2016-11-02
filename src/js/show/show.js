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
		},
		// binding edit article
		goEditArticle:function(){
			$('.btn-edit').on('click',function(){
				var _id = lt_values['show']['articleId'];
				var _url = root.blog.global.message.url_prefix + 'create?id=' + _id;
				// console.log(_url);
				// return;
				window.location.href = _url;
			});
		},
		// ajax to count PV
		countPv:function(){
			var _data = {
				id:lt_values['show']['articleId']
			};

			$.ajax({
				url:'../post/count-pv',
				type:'post',
				dataType:'json',
				data:_data,
				success:function(data){
					if(data.result = 'success'){
						console.log('============== count =============')
					}
				}
			})
		}
	}
}).call(this);

$(document).ready(function(){
	
	'use strict';

	var root = window;
	var $ = root.jQuery;

	root.blog.show.init();
});