;(function(){

	'use strict';

	var root = this;
	var $ = root.jQuery;

	if( typeof root.blog === 'undefined' ){
		root.blog = {};
	}

	root.blog.show = {
		init:function(){
			this.initSpin()
			this.getPm2_5();
			this.getPaginationArticle();
			this.getArticleHot();
			this.getArticleNew();
			this.getKeywords();
		},
		initSpin:function(){
			    var opts = {
					lines: 12             // The number of lines to draw
					, length: 7             // The length of each line
					, width: 5              // The line thickness
					, radius: 10            // The radius of the inner circle
					, scale: 1.0            // Scales overall size of the spinner
					, corners: 1            // Roundness (0..1)
					, color: '#000'         // #rgb or #rrggbb
					, opacity: 1/4          // Opacity of the lines
					, rotate: 0             // Rotation offset
					, direction: 1          // 1: clockwise, -1: counterclockwise
					, speed: 1              // Rounds per second
					, trail: 100            // Afterglow percentage
					, fps: 20               // Frames per second when using setTimeout()
					, zIndex: 2e9           // Use a high z-index by default
					, className: 'spinner'  // CSS class to assign to the element
					, top: '50%'            // center vertically
					, left: '50%'           // center horizontally
					, shadow: false         // Whether to render a shadow
					, hwaccel: false        // Whether to use hardware acceleration (might be buggy)
					, position: 'absolute'  // Element positioning
				}
				var target = document.getElementsByClassName('spin-container');
				for(var i=0;i<target.length;i++){
					var spinner = new Spinner(opts).spin(target[i])
				}
		},
		// 获取pm2.5数据
		getPm2_5:function(){
			var params = {
				token:'5j1znBVAsnSf5xQyNQyq',
				city:'beijing'
			}
			var $container = $('.pm2_5');

			$.ajax({
				url:'../post/aqi',
				type:'get',
				dataType:'json',
				cache:true,
				beforeSend:function(){
					var $loading = '<img src="/images/loading.gif" alt="">';

					$container.append( $loading );
				},
				success:function(data){
					var pm2_5;

					if( data && data.aqi_pm25 ){
						pm2_5 = data.aqi_pm25;
						$container.html( pm2_5 );
					}
					else{
						console.warn('获取pm2.5数据出错。');
					}
				}
			});
		},
		// 获取所有文章的分页数据
		getPaginationArticle:function(){
			var _this = this;
			
			$('.x_page_container .lt-pagination').LTPagination({
				ajaxUrl:'/post/get-pagination-article',  // ajax获取数据的接口
				ajaxCallback:_this._filloutPaginationArticle,
				pageSize:15,
				ajaxExtraParam:{},     // 额外携带的参数，必须为对象。
			});
		},
		// 展示分页的文章
		_filloutPaginationArticle:function(data){
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
			$('.article-all-wrapper .spin-container').remove();
			$('.article-all').removeClass('opacity-0');
		},
		// 获取热门文章
		getArticleHot:function(){
			var _this = this;
			var sum = 10; // 最热前10
			$.get('/post/get-article-hot?sum=' + sum).done(function(data){
				_this._filloutAritcleHot(data);
			});
		},
		// 展示热门文章
		_filloutAritcleHot:function(data){
			var articles = JSON.parse( data )['msg'];

			if( typeof articles !== 'object' ){
				return console.log('数据有误');
			}
			var html = '';
			var $container = $('.article-hot');

			for( var i=0,len=articles.length;i<len;i++ ){
				html += '\
					<li>\
						<a href="' + articles[i].id + '/article/' + articles[i].title + '/" title="' + articles[i].title + '">' + articles[i].title + '</a>\
						<span class="pv pull-right">' + articles[i].pv + '</span>\
					</li>\
					';
			}
			$container.removeClass('article-hot-empty');
			$container.find('li').remove();
			$container.append( html );
			$('.article-hot-wrapper .spin-container').remove();
			$('.article-hot').removeClass('opacity-0');
		},
		// 获取最新文章
		getArticleNew:function(){
			var _this = this;
			var sum = 10; // 最热前10

			$.get('/post/get-article-new?sum=' + sum).done(function(data){
				_this._filloutAritcleNew(data);
			});
		},
		// 展示最新文章
		_filloutAritcleNew:function(data){
			var articles = JSON.parse( data )['msg'];

			if( typeof articles !== 'object' ){
				return console.log('数据有误');
			}
			var html = '';
			var $container = $('.article-latest');

			for( var i=0,len=articles.length;i<len;i++ ){
				html += '\
					<li>\
						<a href="' + articles[i].id + '/article/' + articles[i].title + '/" title="' + articles[i].title + '">' + articles[i].title + '</a>\
						<span class="pv pull-right">' + this._formatCreatetime( articles[i].create_time ) + '</span>\
					</li>\
					';
			}
			$container.append( html );
			$('.article-latest-wrapper .spin-container').remove();
			$('.article-latest').removeClass('opacity-0');
		},
		// 格式化文章的创建时间。去掉时分秒，只保留年月日
		_formatCreatetime:function(str){
			if( typeof str !== 'string' ){
				return str;
			}
			var result = str.split(' ')[0];

			return result;
		},
		// ********* tags begin **********
		// 获取所有关键词
		getKeywords:function(){
			var _this = this;

			$.get('/post/get-keywords').done(function(data){
				var keywords = JSON.parse( data );

				_this._showKeyword( keywords );
			});
		},
		// 创建关键词标签
		_showKeyword:function(str){
			if( typeof str !== 'string' ){
				return str;
			}
			var _keyword           = str.split(',');
			var $keywordsContainer = $('.tags-container');

			for( var i=0;i<_keyword.length;i++ ){

				$keywordsContainer.tags({content:_keyword[i],canRemove:'false'});
			}
			this._bindingShowKeywordArticle();
		},
		// 绑定标签功能
		_bindingShowKeywordArticle:function(){
			var _this = this;

			$('.tags-container').on('click','.tag-container',function(){
				var _keyword = $(this).find('.lt-tag').text();

				_this._getArticleByTag( _keyword );
			});			
		},
		// 按标签查询文章
		_getArticleByTag:function( tag ){
			var _this = this;

			$.get( '/post/get-article-by-tag?tag=' + tag ).done(function(data){
				data = JSON.parse( data );
				if( !data || typeof data.msg === 'fundefined' || data.msg === 'error' ){
					console.log('获取文章失败');
				}
				else{
					var articles = data.msg; 

					_this._filloutAritcleByTag( articles,tag );
				}
			});
		},
		// 展示按标签查询到的文章
		_filloutAritcleByTag:function( articles,tag ){		
			var articleHtml = '';
			
			for( var i=0,len=articles.length;i<len;i++ ){
				articleHtml += '\
					<li>\
						<a href="/article/' + articles[i].id + '/' + articles[i].title + '" title="' + articles[i].title + '" target="_blank">' + articles[i].title + '</a>\
						<span class="pv pull-right">' + this._formatCreatetime( articles[i].create_time ) + '</span>\
					</li>';
			}

			var $tagContainer = $('.tag-article-container');
			// 不是第一次按标签查询
			if( $tagContainer.length === 1 ){
				var ulTagContainer = $('.tag-article');

				ulTagContainer.html('');
				ulTagContainer.append( articleHtml );
				$('.tag-name').text( tag );
			}
			else{
				var wrapperHtml = '\
					<div class="panel panel-default tag-article-container">\
						<div class="panel-heading">\
							分类文章 : <span class="tag-name">' + ( tag || '' ) + '<span>\
						</div>\
						<div class="panel-body">\
							<ul class="tag-article">' + articleHtml + '</ul>\
						</div>\
					</div>';
				var $outerContainer = $('main.list-container');
				$outerContainer.prepend( wrapperHtml );
			}
		}
		// ********* tags end **********
	}
}).call(this);

$(document).ready(function(){
	
	'use strict';

	var root = window;
	var $ = root.jQuery;

	root.blog.show.init();
});