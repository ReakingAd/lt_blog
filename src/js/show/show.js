;(function(){

	'use strict';

	var root = this;
	var $ = root.jQuery;

	if( typeof root.blog === 'undefined' ){
		root.blog = {};
	}

	root.blog.show = {
		init:function(){
			this.getAritcleById();
			this.goEditArticle();
			this.countPv();
			this.getRelatedAritlce();
			this.filloutArticle();
			this.showKeyword();
		},
		// 获得当前页面的文章id
		_getCurrentId:function(){
			var path = window.location.pathname;
			var id = path.split('/')[2];

			return id;
		},
		// 通过id，获取指定文章
		getAritcleById:function(){
			var _this = this;
			var _id = this._getCurrentId();

			$.get( '/post/get-article-by-id?id=' + _id ).done(function(data){
				if( typeof data !== 'string' ){
					return console.log( '文章有误' );
				}
				data = JSON.parse( data );
				if( typeof data.status === 'undefined' || data.status === 'error' ){
					return console.log( '文章有误' + data.msg ? msg : '');
				}
				var article = data.msg;

				Pubsub.trigger('gotAritcle',article);
			});
		},
		// 展示指定文章
		filloutArticle:function(){
			Pubsub.listen('gotAritcle',function(article){
				if( typeof article === 'undefined' ){
					return console.log('获取文章失败');
				}
				var isGuset = lt_values.show.isGuest;
				// 填充文章title及相关信息
				var editBtn = isGuset === '1' ? '' : '<button class="btn-edit btn btn-default btn-sm pull-right">修改</button>';
				var descHtml = '\
					<h2>' + ( article.title || '' ) + '</h2>\
					<p class="clearfix">\
						<span>点击量：</span><span class="click">' + ( article.pv || '') + '</span>\
						<span>日期：</span><span class="update-date">' + ( article.create_time || '' )+ '</span>\
							' + editBtn + '\
					</p>\
				';
				var $descContainer = $('.article-desc');
				$descContainer.append( descHtml );

				// 填充文章主体
				var contentHtml = article.content || '';
				var $contentContainer = $('.article-container')

				$contentContainer.append( contentHtml );
			});
		},
		// 绑定，点击跳转编辑界面
		goEditArticle:function(){
			var _this = this;

			$('.article-desc').on('click','.btn-edit',function(){
				var _id  = _this._getCurrentId();
				var _url = root.blog.global.message.server = '/create?id=' + _id;

				window.location.href = _url;
			});
		},
		// 提交当前文章的点击量 +1
		countPv:function(){
			var _this = this;
			var _data = {
				id:_this._getCurrentId()
			};

			$.ajax({
				url:'/post/count-pv',
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
		// 展示关键词 
		showKeyword:function(){
			Pubsub.listen('gotAritcle',function(str){
				var _keyword    = str.keyword;
				var _keywordArr = _keyword.split(',');
				var $container  = $('.keyword-container');

				for( var i=0;i<_keywordArr.length;i++){
					$container.tags({
						content:_keywordArr[i],
						canRemove:'false'
					});
				}
			});
		},
		// 获取相关文章
		getRelatedAritlce:function(){
			Pubsub.listen('gotAritcle',function(article){
				if( typeof article === 'undefined' ){
					return console.log('wrong param');
				}
				var tags = article.keyword;
				var tagArr = tags.split(',');
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