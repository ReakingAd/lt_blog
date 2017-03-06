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
			this.searchArticle();
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
					var pm2_5;

					if( data && data.aqi_pm25 ){
						pm2_5 = data.aqi_pm25;
						$('.pm2_5').html(pm2_5);
					}
					else{
						console.warn('获取pm2.5数据出错。');
					}
				}
			});
		},
		searchArticle:function(){
			var _this = this;

			$('.x_page_container .lt-pagination').LTPagination({
				ajaxUrl:'../post/search-article',  // ajax获取数据的接口
				ajaxCallback:_this.filloutArticleList,
				ajaxExtraParam:{},     // 额外携带的参数，必须为对象。
			});
		},
		filloutArticleList:function(data){
			var _list = [];
			if( data && data.list.length > 0 ){
				_list = data.list;
			}
			else{
				return console.log( '无可用数据.');
			}
			var _li = '';

			for( var i=0;i<_list.length;i++ ){
				var _title       = _list[i].title;
				var _create_time = _list[i].create_time.split(' ')[0];
				var _href        = '/article/' + _list[i].id + '/' + _list[i].title;
				var _status      = _list[i].status;
				var _draftMark   = '';
				if( _status === '2' ){
					_draftMark = '<i class="draft-label pull-left">[草稿]</i>';
				}
				_li += '<li><a class="pull-left" href="' + _href + '">' + _title + '</a>' + _draftMark + '<span class="update-time pull-right">' + _create_time + '</span></li>';
			}

			var $container = $('.article-all');

			$container.html('');
			$container.append( _li );
		}
	}
}).call(this);

$(document).ready(function(){
	
	'use strict';

	var root = window;
	var $ = root.jQuery;

	root.blog.show.init();
});