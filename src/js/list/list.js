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
			this.getPm2_5();
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
		},
		getPm2_5:function(){
			var params = {
				token:'5j1znBVAsnSf5xQyNQyq',
				city:'beijing'
			}
			$.ajax({
				url:'../post/aqi',
				type:'get',
				dataType:'json',
				cache:true,
				success:function(data){
					// console.log(data);
					var pm2_5;

					if( data && !$.isEmptyObject(data) ){
						pm2_5 = data[data.length-1]['pm2_5'];
						$('.pm2_5').html(pm2_5);
					}
					else{
						console.warn('获取pm2.5数据出错。');
					}
				}
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