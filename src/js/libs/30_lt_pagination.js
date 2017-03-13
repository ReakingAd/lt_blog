/*
*@Class 	LTPagination
*@author 	Litao
*@require 	jQuery,bootstrap		
*@param		btnContainer		分页按钮的容器
			totalCount			数据的最大条数
			ajaxUrl				点击页码后，ajax获取数据的接口
			ajaxExtraParam		ajax的额外携带参数(没有特殊需要可以设置为空)
			ajaxCallback 		获取数据后，对数据进行处理的回调函数
			pageSize			单页展现的数据数量（缺省为10）
*@usage     
	HTML::
			<!-- 分页页码 -->
			<div class="x_page_container">
			    <div class="btn-group pull-right">
			        <ul class="lt-pagination">
			        </ul>
			    </div>
			</div>
			<!-- /分页页码 -->
			<script src="js/global/lt_pagination.js"></script>
	CSS:: 	lt_pagination.scss
	JS::
			$('.x_page_container .lt-pagination').LTPagination({
				ajaxUrl:'../post/search-article'',  // ajax获取数据的接口
				ajaxCallback:function(){}, // 获取到数据后，对数据进行处理的回调。例如绘制table
				ajaxExtraParam:{}     // 额外携带的参数，必须为对象。
			});
*/ 
function LTPagination(btnContainer,ajaxUrl,ajaxExtraParam,ajaxCallback,pageSize,pageNum){
	this.$btnContainer             = btnContainer;  	// 页码所在容器(jQuery对象) 
	this.ajaxUrl                   = ajaxUrl;       	// ajax获取数据的接口
	this.ajaxCallback              = ajaxCallback;  	// 点击页码，ajax获取后台数据后，更新数据的展示
	this.pageSize                  = pageSize || 10;	// 带数字的页码个数(默认10)
	this.pageNum                   = pageNum || 1;		// 读取第几页(默认1)
	this.ajaxExtraParam            = ajaxExtraParam;	// ajax的额外携带参数(没有特殊需要可以设置为空)
	
	this.totalCount                = null;    			// 数据总条数
	this.pageCount				   = null;				// 数据的分页总数
}

LTPagination.prototype.init = function(){
	// 修正传进来的pageNum值
	if( this.pageNum === 'undefined' || !this.pageNum ){
		this.pageNum = 1;
	}
	var _this = this;
	var _ajaxSendData = 'pageNum=' + _this.pageNum+ '&pageSize=' + _this.pageSize;

	if(this.ajaxExtraParam && $.type(this.ajaxExtraParam) === 'object'){
		this.ajaxExtraParam = $.param(this.ajaxExtraParam);  // 将对象转换为查询字符串
		_ajaxSendData = this.ajaxExtraParam + '&' + _ajaxSendData;
	}
	$.ajax({
        url:_this.ajaxUrl,
        type:'get',
        dataType:'json',
        data: _ajaxSendData,
        xhrFields: {
			withCredentials: true
		},
        success:function(data){
        	if( data.list && data.list.length === 0 ){
        		console.warn('查询结果为空，请核对参数。');
        	}
        	else{
        		// console.warn('返回数据格式不正确。');
        	}
        	_this.ajaxCallback(data);
        	_this.totalCount = data.totalCount;
        	// 当数据总数大于单页中的数据数时，才引入分页DOM
			if(_this.totalCount > _this.pageSize){	
				_this._drawPageBtn();
				_this._updateDisabled();
				_this._pagination_userinfo();
			}
			else{
				$('.ds-pagination').html('');
				console.warn('::Small number of data,there is no need to set pagination.');
			}
        }
    });	
}

LTPagination.prototype._drawPageBtn = function (){
	this.pageCount = Math.ceil(this.totalCount / this.pageSize); // 带数字按钮的个数
	var _numHtml  = '';

	var _previousHtml = '<li class="pagination-btn previous " data-id="prev">上一页</li>';
	var _nextHtml     = '<li class="pagination-btn next" data-id="next">下一页</li>';
	var abbrLi = '<li class="pagination-abbr" data-id="abbr">...</li>';	// 多页码省略显示时使用
	// 如果分页所需页码小于等于10页
	if( this.pageCount <= 10 ){
		for(var i=1;i<=this.pageCount;i++){
			if( i == this.pageNum ){
				_numHtml = _numHtml + '<li class="pagination-btn page-active" data-id="'+i+'">'+i+'</li>';
			}
			else{
				_numHtml = _numHtml + '<li class="pagination-btn" data-id="'+i+'">'+i+'</li>';
			}
		}
	}
	// 如果分页所需页码大于10页
	else{
		var _start,_end;
		// 如果请求的页面号码，与第一页的距离小于5，则修正显示的页面号码范围从1开始
		if( this.pageNum - 5 < 1){
			_start = 1;
			_end = _start + 9;
			_nextHtml = abbrLi + _nextHtml;
		}
		// 如果请求的页面号码，与最后一页的距离小于5，则修正显示的页面号码范围已最后一页结束
		else if( this.pageCount - this.pageNum - 5 < 1 ){
			_end = this.pageCount;
			_start = _end - 9;
			_previousHtml = _previousHtml + abbrLi;
		}
		else{
			_start = this.pageNum - 4;
			_end = _start + 9;
			_previousHtml = _previousHtml + abbrLi;
			_nextHtml = abbrLi + _nextHtml;
		}
		for(var i=_start;i<=_end;i++){
			if( i == this.pageNum ){
				_numHtml = _numHtml + '<li class="pagination-btn page-active" data-id="'+i+'">'+i+'</li>';
			}
			else{
				_numHtml = _numHtml + '<li class="pagination-btn" data-id="'+i+'">'+i+'</li>';
			}
		}
		// 绘制调转按钮
		var _jumpBtnHtml = '\
			<div class="pagination-jump">\
			    <input class="pagination-input-jump" type="text" />\
			    <span class="pagination-btn-jump">确定</span>\
			</div>\
		';
	}
	var _html = _previousHtml + _numHtml + _nextHtml;

	this.$btnContainer.html('');  // 针对多次重复创建分页，先清空已经创建过的分页按钮。
	this.$btnContainer.append(_html);
	if(_jumpBtnHtml){
		this.$btnContainer.parent().find('.pagination-jump').remove();
		this.$btnContainer.parent().append(_jumpBtnHtml);
	}
}

// 绑定新建按钮的点击事件。
LTPagination.prototype._pagination_userinfo = function(){
	var _this = this;

	// 给每个btn绑定click事件
	this.$btnContainer.off('click'); // 避免重复创建分页按钮时，绑定多次click事件，导致执行不正确的回调函数。
	this.$btnContainer.on('click','li',function(){
		var $this = $(this);
		// 遇到被禁用的按钮，则跳出本次函数。
		var _isDisabled = $this.hasClass('page-disabled'); // 当前按钮是否不可用

		if(_isDisabled){
			return ;
		}
		var clickedNum = $this.data('id');
		// 如果点击了缩略按钮，则跳出当前event handler
		if( clickedNum === 'abbr' ){
			return ;
		}
		// 点击“上一页”，修正页码值为当前页码减1
		else if( clickedNum === 'prev' ){
			clickedNum = _this.pageNum - 1;
		}
		// 点击“下一页”，修正页码值为当前页码加1
		else if( clickedNum === 'next' ){
			clickedNum = _this.pageNum + 1;
		}
		_this.pageNum = clickedNum; // 被点击要请求的的页面号码
		_this._getPageData();
	});

	var $paginationJump = $('.pagination-jump');
	// 如果页面上添加了跳转按钮，则为其绑定点击事件。
	if( $paginationJump ){
		$paginationJump.off('click');
		$paginationJump.on('click','.pagination-btn-jump',function(){
			var _wantedPage = $('.pagination-input-jump').val();
			if( !_wantedPage ){
				$.ltAlert('请先填写跳转页码!');
				return;
			}
			_wantedPage = parseInt(_wantedPage);
			if( isNaN(_wantedPage) || _wantedPage < 1 || _wantedPage > _this.pageCount ){
				$.ltAlert('请填写正确的页码。\r\n必须为小于等于 ' + _this.pageCount + ' 的正整数');
				return ;
			}
			_this.pageNum = _wantedPage; // 被点击要请求的的页面号码
			_this._getPageData();
		});
	}
}

// 禁用该禁用的按钮
LTPagination.prototype._updateDisabled = function (){
	var $_active_page = $('.x_page_container li[data-id=' + this.pageNum + ']');
	$_active_page.addClass('page-disabled'); // 禁用当前页面
	$_active_page.siblings().not('.prevous,.next').removeClass('page-disabled');
	// // 第一页时，禁用“上一页”
	if(this.pageNum == 1){
		$('.previous').addClass('page-disabled');
	}
	else{
		$('.previous').removeClass('page-disabled');
	}
	// // 最后一页时，禁用“下一页”
	if(this.pageNum == this.pageCount){
		$('.next').addClass('page-disabled');
	}
	else{
		$('.next').removeClass('page-disabled');	
	}
}

LTPagination.prototype._getPageData = function(){
	var _this        = this;
	var ajaxSendData = 'pageNum=' + _this.pageNum + '&pageSize=' + _this.pageSize;
	// 如果用户设置了ajaxExtraParam，拼接进ajax要发送的数据中。
	if(this.ajaxExtraParam){
		ajaxSendData = this.ajaxExtraParam + '&' + ajaxSendData;
	}

    $.ajax({
        url:_this.ajaxUrl,
        type:'get',
        dataType:'json',
        data:ajaxSendData,
        xhrFields: {
			withCredentials: true
		},
        success:function(data){
        	_this._drawPageBtn();
        	_this._updateDisabled();
			_this._pagination_userinfo();
        	_this.ajaxCallback(data);
        }
    });
};
;(function(window,document,$,undefined){

	'use strict';
	
	$.fn.extend({
		LTPagination:function(options){
			var default_options = {
				btnContainer:$(this),
				pageSize:'',
				pageNum:1,
				ajaxUrl:'',
				ajaxExtraParam:'',
				ajaxCallback:function(){},
			}
			var _options = $.extend({},default_options,options);
			var myPagination = new LTPagination(
					_options.btnContainer,
					_options.ajaxUrl,
					_options.ajaxExtraParam,
					_options.ajaxCallback,
					_options.pageSize,
					_options.pageNum
				);
			myPagination.init();
		}
	});
})(window,document,jQuery);
/*
*@name   tableSort()
*@author   Litao
*@description   1.为table增加排序功能。可以配合DsPagination使用，待其回调函数生成完table后，调用tableSort()方法。
				如需给th加上icon和其他样式，需要在DsPagination的回调中添加。本函数不具有此功能。
				2.如果table的某一列都是数字，需要按照数学意义上的大小准确排序，可以在th上加属性 data-numsort="true"。但是如果排序的
				内容有中文的话，这个属性会使排序算法失效。
*@require  jQuery
*@usage    $('#datatable').tableSort();
*
*/
;(function(window,document,$,undefined){

	'use strict';

	$.fn.tableSort = function(){
		var $table = $(this);
		var $th    = $table.find('th');
		// 显示排序icon
		// var _btnHtml = '<span class="glyphicon glyphicon-sort-by-attributes"></span>';
		// $th.each(function(index,item){
		// 	$(item).addClass('sort-icon-wrapper').append(_btnHtml);
		// });
		// 去重
	    Array.prototype.unique = function(){
	        var _result = [];
	        for (var i=0;i<this.length;i++){
	            if (_result.indexOf(this[i]) == -1 ){
	                _result.push(this[i]);
	            }   
	        }
	        return _result;
	    }

		$th.on('click',function(){
			var _sortAsNumber = $(this).data('numsort') + ''; // 是否按数学意义的数字排序。【这里转换为字符串类型】
			var $container    = $table.find('tbody');
			var _index        = $(this).index();
			var $trs          = $container.find('tr');
			var _trMap        = {};
			var $tdIndexArr   = [];

			for( var i=0;i<$trs.length;i++ ){
				var $tdIndex = $trs.eq(i).find('td').eq(_index).text();

				$tdIndexArr.push($tdIndex);
				if( !( _trMap[ $tdIndex ] instanceof Array ) ){
					_trMap[ $tdIndex ] = [];
				}
				_trMap[ $tdIndex ].push( $trs.eq(i) )
			}

			// 根据jQuery对象中的data-numsort属性，确定排序时使用的排序规则。
			// 只有当data-numsort的值是 'true'时，才使用下方的匿名函数作为排序规则。
			var compare = _sortAsNumber === 'true' ? 
				function(value1,value2){
					return value1 - value2;
				}
				: undefined;

			$tdIndexArr = $tdIndexArr.unique().sort(compare);  // 去重，排序
			$container.html('');
			for( var i=0;i<$tdIndexArr.length;i++ ){
				var _trHtmlArr = _trMap[ $tdIndexArr[i] ];

				for( var j=0;j<_trHtmlArr.length;j++ ){
					$container.append(_trHtmlArr[j]);
				}
			}
		});
	}
})(window,document,jQuery);