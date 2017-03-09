;(function(){

	'use strict';

	var root = this;
	var $ = root.jQuery;

	if( typeof root.blog === 'undefined' ){
		root.blog = {};
	}

	root.blog.homepage = {
		init:function(){
            this.getKeywords();
			this.showKeywordPage();
			this.getPm2_5();
            this.getNewarticle();
		},
        getKeywords:function(){
            var _this = this;

            $.get('/post/get-keywords').done(function(data){
                _this.showKeyword(data);
            });
        },
		// 创建关键词标签
		showKeyword:function( keywords ){
			var _keyword           = JSON.parse( keywords ).split(',');
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
        getNewarticle:function(){
			var _this = this;

            $.get('/post/get-newarticle?range=1to3').done(function(data){
				if( typeof data !== 'string' ){
					return console.warn('获取文章失败');
				}
				try{
					var _data = JSON.parse( data );
				}catch(err){
					return console.log( '数据格式错误' + err );
				}
				if( _data.status && _data.status === 'error' ){
					return console.log( _data.msg );
				}
				else if( _data.status && _data.status === 'success' ){
					var $container = $('.article-container');
					var articles    = _data.msg;
					var articleHtml = '';

					for( var i=0,len=articles.length;i<len;i++ ){
						articleHtml += '\
							<article class="panel panel-default">\
								<div class="panel-heading post-head">\
									' + _this.formatTime( articles[i].update_time ) + '\
								</div>\
								<div class="panel-body post-content">\
									<h3 class="post-head">' + articles[i].title + '</h3>\
									' + _this.getFirstPara( articles[i].content ) + '\
									<a class="pull-right" href="/article/' + articles[i].id + '/' + articles[i].title + '" title="' + articles[i].title + '"> >>>查看详情</a>\
								</div>\
							</article>\
							';
					}
					$container.append( articleHtml );
				}
            });
        },
		// 格式化文章的时间，去掉时分秒，只保留年月日
		formatTime:function(str){
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
		}
	}
}).call(this);

$(document).ready(function(){
	
	'use strict';

	var root = window;
	var $ = root.jQuery;

	root.blog.homepage.init();
});