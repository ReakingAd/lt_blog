/**
 * @name   Tags
 * @author Ltvieri
 * @desc   jQuery插件。在指定容器中，添加一个带文字的小标签。例如文章的keyword
 * @param  {string}  content  标签内要显示的文字 
 * 		   {string}  canRemove  是否支持删除功能。'true'支持删除功能或'false'不支持删除功能。缺省为 'true'
 * @require jQuery  tags.scss[需要编译为css]
 * @example  
 * 			html:
*				<div class="foo"></div>
*			js:
*				$('div.foo').tags({content:'标签'});
 */
;(function(window,document,$,undefined){

'use strict';
/**
 * @desc  Tags构造函数，被用于创建jQuery.Tags()插件。
 * @param {selector或jQuery对象} container 盛放标签的容器
 * @param {string} content  便签内要显示的文字 
 * @param {string} canRemove 只支持两个值。'true'支持删除功能或'false'不支持删除功能。缺省为 'true' 
 */
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