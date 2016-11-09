;(function(window,document,$,undefined){

'use strict';

function Tags(container,content){
	this.container = container;
	this.content   = content;

	this.btn_close = 'lt-tag-close';
}

Tags.prototype.init = function(){
	this.createDOM();
	this.bindingRemove();
}

Tags.prototype.createDOM = function(){
	var _html = ''
	+ 	'<div class="tag-container">'
	+ 	'	<span class="lt-tag">' + this.content+ '</span>'
	+ 	'	<span class="' + this.btn_close + '" aria-hidden="true">×</span>'
	+ 	'</div>';
	
	$(this.container).append(_html);
}

Tags.prototype.bindingRemove = function(){
	$(this.container).on('click','.' + this.btn_close,function(){
		$(this).parent('.tag-container').remove();
	});
}

jQuery.prototype.tags = function(content){
	if( !content || typeof content !== 'string' ){
		console.warn('::string is needed');
		return ;
	}
	var _content = content ? content : '123';
	var _Tags = new Tags($(this),_content);
	
	_Tags.init();
}

})(window,document,jQuery);