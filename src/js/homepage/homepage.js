;(function(){

	'use strict';

	var root = this;
	var $ = root.jQuery;

	if( typeof root.blog === 'undefined' ){
		root.blog = {};
	}

	root.blog.homepage = {
		message:{
			latestTo:''
		},
		init:function(){
			this.showBtns();
            this.getKeywords();
			this.getPm2_5();
            this.getNewarticle();
			this.initBtnLoading();
			this.bindingBtnGetMore();
		},
		showBtns:function(){
			Pubsub.listen('articleLoaded',function(){
				$('.btn-container').removeClass('lt-hide');
				$('footer').show();
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
        getNewarticle:function(){
			var _this = this;

            $.get('/post/get-article-new?range=1to3').done(function(data){
				if( typeof data !== 'string' ){
					return console.warn('获取文章失败');
				}
				try{
					data = JSON.parse( data );
				}catch(err){
					return console.log( '数据格式错误' + err );
				}
				if( data.status && data.status === 'error' ){
					return console.log( data.msg );
				}
				else if( data.status && data.status === 'success' ){
					var articles    = data.msg;
					_this._filloutMoreArticle(articles);
				}
            });
        },
		// 展示新获取的文章
		_filloutMoreArticle:function(articles){
			var $container     = $('.article-container');
			var articleHtml    = '';
			var draftLabelHtml = '<i class = "draft-label">[草稿]</i>';

			for( var i=0,len=articles.length;i<len;i++ ){
				// 如果这篇文章不是草稿,将“草稿”label置为空
				if( articles[i].status !== '2' ){
					draftLabelHtml = '';
				}
				articleHtml += '\
					<article class="panel panel-default" data-create-time="' + articles[i].create_time + '">\
						<div class="panel-heading post-head">\
							' + this._formatCreatetime( articles[i].update_time ) + '\
						</div>\
						<div class="panel-body post-content">\
							<h3 class="post-head">' + articles[i].title + draftLabelHtml + '</h3>\
							' + this.getFirstPara( articles[i].content ) + '\
							<a class="pull-right" href="/article/' + articles[i].id + '/' + articles[i].title + '" title="' + articles[i].title + '"> >>>查看详情</a>\
						</div>\
					</article>\
					';
			}
			$container.append( articleHtml );
			Pubsub.trigger('articleLoaded');
			this._enableLoading('off');
		},
		// 格式化文章的时间，去掉时分秒，只保留年月日
		_formatCreatetime:function(str){
			if( typeof str !== 'string' ){
				return str;
			}
			var result = str.split(' ')[0];

			return result;
		},
		// 取文章的第一个p标签的内容
		getFirstPara:function(str){
			if( typeof str !== 'string' ){
				return '';
			}
			var rFisrtP = /<p>[\s\S]*?<\/p>/g;
			var result  = str.match( rFisrtP );
			var content = result[0];

			return content;
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
			this._showKeywordPage();
		},
		// 绑定标签功能
		_showKeywordPage:function(){
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
						<a href="' + articles[i].id + '/article/' + articles[i].title + '/" title="' + articles[i].title + '">' + articles[i].title + '</a>\
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
		},
		// ********* tags end **********
		initBtnLoading:function(){
			    var opts = {
					lines: 9             // The number of lines to draw
					, length: 7             // The length of each line
					, width: 3              // The line thickness
					, radius: 5            // The radius of the inner circle
					, scale: 0.5            // Scales overall size of the spinner
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
				var target = document.getElementsByClassName('btn-loading')[0];
				var spinner = new Spinner(opts).spin(target)
		},
		bindingBtnGetMore:function(){
			var _this = this;

			$('.btn-getMore').on('click',function(){
				_this._enableLoading('on');
				var create_time = $('article').last().data('create-time');

				$.get('/post/get-article-new?timeFlag=' + create_time + '&range=1to3').done(function(data){
					try{
						data = JSON.parse( data );
					}catch(err){
						return console.log( '数据格式错误' + err );
					}
					if( data.status && data.status === 'error' ){
						return console.log( data.msg );
					}
					else if( data.status && data.status === 'success' ){
						var articles    = data.msg;
						_this._filloutMoreArticle(articles);
					}
				});
			});
		},
		// 切换“获取更多”按钮的状态
		_enableLoading:function(flag){
			if( typeof flag !== 'string' ){
				return;
			}
			var $btn = $('.btn-getMore');
			if( flag === 'on' ){
				$btn.addClass('lt-hide');
				$btn.attr('disabled','disabled');
				$btn.siblings('.btn-loading').removeClass('lt-hide');
			}
			else if( flag === 'off' ){
				$btn.removeAttr('disabled');
				$btn.removeClass('lt-hide');
				$btn.siblings('.btn-loading').addClass('lt-hide');
			}
		}

	}
}).call(this);

$(document).ready(function(){
	
	'use strict';

	var root = window;
	var $ = root.jQuery;

	root.blog.homepage.init();
});