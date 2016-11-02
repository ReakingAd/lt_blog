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
				var _title = lt_values['show']['articleTitle'];
				var _url = root.blog.global.message.url_prefix + 'create?title=' + _title;

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
						console.log('============== count =============');
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