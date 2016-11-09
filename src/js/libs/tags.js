/*
* @name		Tags
* @author	Ltvieri
* @require	jQuery
*			tags.scss [which is need to be compiled to css file]
* @usage	html:
*			<div class="foo"></div>
*			js:
*			$('div.foo').tags({content:'标签'});
* @params	content   ----- string	            ----- 标签内容			
*			canRemove ----- 'true' or 'false'	----- 是否支持移除功能	
*/
;(function(window,document,$,undefined){

'use strict';

function Tags(container,content,canRemove){
	this.container = container;					// 标签容器
	this.content   = content;					// 标签内容
	this.canRemove = canRemove || 'true';		// 是否支持移除功能

	this._btn_close = 'lt-tag-close';
}

Tags.prototype.init = function(){
	this.createDOM();
	if( this.canRemove === 'true' ){
		this.bindingRemove();
	}
}

Tags.prototype.createDOM = function(){
	var _btn_remove = 
		this.canRemove === 'true' ? 
		'<span class="' + this._btn_close + '" aria-hidden="true">×</span>' 
		: '';
	var _html = ''
	+ 	'<div class="tag-container ' + (this.canRemove === 'true' ? '' : 'tag-no-remove') + '">'
	+ 	'	<span class="lt-tag">' + this.content+ '</span>'
	+ 	_btn_remove
	+ 	'</div>';
	
	$(this.container).append(_html);
}

Tags.prototype.bindingRemove = function(){
	$(this.container).on('click','.' + this._btn_close,function(){
		$(this).parent('.tag-container').remove();
	});
}

jQuery.prototype.tags = function(options){
	console.log('in')
	if( typeof options !== 'object' ){
		console.error('tags.js参数错误。需要一个对象。');
		return ;
	}
	var default_options = {
		content:'标签',
		canRemove:'true'
	};
	var _options = $.extend({},default_options,options);
	
	if( !_options.content || typeof _options.content !== 'string' ){
		console.warn('::string is needed');
		return ;
	}
	var _Tags = new Tags($(this),_options.content,_options.canRemove);
	
	_Tags.init();
}

})(window,document,jQuery);