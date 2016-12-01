;(function(){

	'use strict';

	var root = this;
	var $ = root.jQuery;

	if( typeof root.blog === 'undefined' ){
		root.blog = {}
	}

	root.blog.global = {
		message:{
			server:window.location.origin,
			url_prefix:'../',
			url_suffix:'.html'
		},
		init:function(){
		}
	};

	root.blog.global.init();

}).call(this);