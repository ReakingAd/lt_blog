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
				
				window.location.href = 'index.php?r=post/create&id=' + _id;
			});
		},
		// ajax to count PV
		countPv:function(){
			var _data = {
				id:lt_values['show']['articleId']
			};

			$.ajax({
				url:'index.php?r=post/count-pv',
				type:'post',
				dataType:'json',
				data:_data,
				success:function(data){
					console.log(data);
					if(data.result = 'success'){
						console.log('count')
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