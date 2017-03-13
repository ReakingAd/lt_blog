/**
 * @desc 提供三个jQuery的静态方法。$.ltPopup()  $.ltAlert() $.ltConfirm()
 * @issue  xss跨站脚本攻击怎么办？需要加入字符串检测<script>。eval()呢？
 * @issue  加入单例模式？好处是什么？是否是针对页面中同时实例化多个弹窗的情况？
 */
;(function(window,factory){

    factory( window,window.jQuery );

})(window,function( window,jQuery ){

'use strict';

var $ = jQuery;
/**
 * @name LTPopup
 * @desc 自定义弹窗构造函数
 */
function LTPopup(options){
    this.msg              = options.msg;  // 提示信息内容
    this.title            = options.title;  // 弹窗title
    this.btns             = options.btns; // 按钮
    this.confirmHandler   = options.confirm; // 点击“确认”的回调
    this.cancelHandler    = options.cancel; // 点击“取消”的回调
    this.freeClose        = options.freeClose; // 是否点击遮罩层也能关闭popup。默认false
    this.freeCloseHandler = options.freeCloseHandler;  // 点击遮罩层关闭popup后的回调。如果不传这个参数
    this.closeIcon        = options.closeIcon;  // 是否在弹窗右上角提供一个关闭icon
    this.closeIconHandler = options.closeIconHandler;
}

// 初始化
LTPopup.prototype.init = function(){
    this.checkOptions();
    this.createPopup();
    this.setStyle();
    this.bindEventHandler();
}

// 初始化popup前，先检测配置项的可用性。
LTPopup.prototype.checkOptions = function(){
    if( typeof this.msg === 'number' ){
        this.msg = this.msg.toString();
    }
    if( typeof this.msg !== 'string' || this.msg.length === 0 ){
        throw new Error('wrong param: msg');
    }
    if( $.type( this.btns ) !== 'array' ){
        throw new Error('wrong param: btns');
    }
    // 如果配置中没有confirm确认按钮，默认加上它
    if( this.btns.indexOf('confirm') === -1 ){
        this.btns.push('confirm');
    }
    if( typeof this.freeClose !== 'boolean' ){
        throw new Error('wrong param: freeClose');
    }
    if( typeof this.confirmHandler !== 'function' ){
        throw new Error('wrong param: confirmHandler');
    }
    if( typeof this.cancelHandler !== 'function' ){
        throw new Error('wrong param: cancelHandler');
    }
    if( typeof this.freeCloseHandler !== 'function' ){
        throw new Error('wrong param: freeCloseHandler');
    }
    if( typeof this.closeIcon !== 'boolean' ){
        throw new Error('wrong param: closeIcon');
    }
}

LTPopup.prototype.createPopup = function(){
    var titleClass    = this.title ? 'lt-popup-hastitle': ''; // 如果传入了 title 配置项，则启用这个样式类
    var closeIconHtml = this.closeIcon ? '<span class   = "close-icon pull-right"></span>': '';
    var buttonHtml    = this._createBtnHtml();
    var _html = '\
        <div class="lt-overlay">\
        </div>\
        <div class="lt-popup">\
            <div class="lt-popup-head ' + titleClass + '">\
                <span class="">' + this.title + '</span>\
                ' + closeIconHtml + '\
            </div>\
            <div class="lt-popup-msg-container">\
                ' + this.msg + '\
            </div>\
            <div class="lt-popup-btn-container">\
                ' + buttonHtml + '\
            </div>\
        </div>\
    '; 
    $('body').append( _html );
}

// 根据配置参数，返回所需按钮的HTML代码
LTPopup.prototype._createBtnHtml = function(){
    var btnsOption = this.btns;
    var _html      = '';

    if( btnsOption.indexOf('confirm') !== -1 ){
        _html += '<button class="btn btn-default btn-confirm">确认</button>';
    }
    if( btnsOption.indexOf('cancel') !== -1 ){
        _html += '<button class="btn btn-default btn-cancel">取消</button>';
    }

    return _html;
}
// 设置弹窗的样式
LTPopup.prototype.setStyle = function(){
    var _windowHeight = window.innerHeight;
    var _windowWidth  = window.innerWidth;
    var _popupWidth   = _windowWidth / 4;
    _popupWidth       = _popupWidth > 400 ? 400: _popupWidth; // 弹窗宽度最大值 400px
    var _positionLeft = ( _windowWidth - 300 ) / 2;
    var _positionTop  = ( _windowHeight -300 ) / 2;

    $('.lt-overlay').css({
        'height':_windowHeight,
        'width':_windowWidth,
        'left':0,
        'top':0
    });
    $('.lt-popup').css({
        'width':_popupWidth,
        'left':_positionLeft,
        'top':_positionTop
    });
}

// 绑定按钮事件
LTPopup.prototype.bindEventHandler = function(){
    var _this = this;
    
    // 点击“确认”按钮关闭popup，并调用配置项中的回调
    $('.lt-popup').on('click','.btn-confirm',function(){
        _this.confirmHandler();
        _this._closePopup();
    });
    // 点击“取消”按钮关闭popup，并调用配置项中的回调
    $('.lt-popup').on('click','.btn-cancel',function(){
        _this.cancelHandler();
        _this._closePopup();
    });
    // 点击 overlay 关闭弹窗。
    if( _this.freeClose ){
        $('.lt-overlay').on('click',function(){
            _this._closePopup();
            _this.freeCloseHandler();
        });
    }
    // 点击关闭icon，关闭弹窗
    if( _this.closeIcon ){
        $('.lt-popup').on('click','.close-icon',function(){
            _this._closePopup();
            _this.closeIconHandler();
        });
    }
}

// 关闭popup
LTPopup.prototype._closePopup = function(){
    $('.lt-overlay').remove();
    $('.lt-popup').remove();
}

// 将自定义的弹窗方法加入jQuery的命名空间
jQuery.extend({
    /**
     * @desc 提供可定制的弹窗，是高级弹窗jQuery.ltAlert()和jQuery.ltConfirm()的基础
     * @requires jQuery lt_popup.scss bootstrap.scss 
     * @param {String} msg  提示信息内容
     * @param {String} title 弹窗title文字
     * @param {Array} btns 弹窗内按钮名字组成的数组。只有confirm,cancel两个值是有效元素
     * @param {Boolean} freeClose 是否启用点击overlay关闭popup的功能
     * @param {Function} freeCloseHandler 点击overlay，关闭popup后的回调函数
     * @param {Boolean} closeIcon 是否启用弹窗右上角的关闭icon
     * @param {Function} closeIconHandler 点击右上方关闭icon，关闭popup后的回调函数
     * @param {Function} confirm 点击“确定”按钮，关闭popup后回调
     * @param {Function} cancel 点击“取消”按钮，关闭popup后的回调
     * @example 
     *          $.ltPopup({
     *              msg:'我是信息',
     *              title:'我是title',
     *              btns:['confirm','cancel'],
     *              freeClose:true,
     *              freeCloseHandler:function(){
     *                  console.log('clicked overlay');
     *              },
     *              closeIcon:true,
     *              closeIconHandler:function(){
     *                  console.log('clicked close icon');
     *              },
     *              confirm:function(){
     *                  console.log('clicked button confirm');
     *              },
     *              cancel:function(){
     *                  console.log('clicked button cancel');
     *              }
     *          })
     */
    ltPopup:function(options){
        var defaultOptions = {
            msg:'',
            title:'',
            btns:['confirm'],
            freeClose:false,
            freeCloseHandler:function(){},
            closeIcon:true,
            closeIconHandler:function(){},
            confirm:function(){},
            cancel:function(){}
        }
        var _options = $.extend({},defaultOptions,options);
        var ltPopup  = new LTPopup( _options );

        ltPopup.init(); 
    },
    /**
     * @desc 类似于window.alert()
     * @param {String} msg 弹窗显示的文字
     * @example   
     *          $.ltAlert('恭喜，注册成功!');
     */
    ltAlert:function( msg ){
        if( typeof msg === 'number' ){
            msg = msg.toString();
        }
        if( typeof msg !== 'string' ){
            throw new Error('wrong param');
        }
        // 此处不能写成return jQuery.ltPopup() 必须得用return this.ltPopup()。为什么呢？
        return jQuery.ltPopup({
            msg:msg,
            title:'提醒',
            freeClose:true,
            closeIcon:true
        });
    },
    /**
     * @desc 类似于window.confirm()弹窗。但是二者使用方法完全不一样。且本方法不会阻塞js。
     * @param {String}  msg 要显示的内容。
     * @param {Function}  func1  点击“确定”的回调
     * @param {Function}  func2 点击“取消”和关闭icon的回调
     * @example 
     *          $.ltConfirm('确定要删除吗？',function(){
     *              // post a delete request here
     *          },function(){
     *              // do not post request
     *          })
     */
    ltConfirm:function(msg,func1,func2){
        var msg = arguments[0];

        if( typeof msg === 'number' ){
            msg = msg.toString();
        }
        if( typeof msg !== 'string' || typeof arguments[1] !== 'function' || typeof arguments[2] !== 'function'){
            throw new Error('wrong param');
        }

        return jQuery.ltPopup({
            msg:msg,
            btns:['confirm','cancel'],
            confirm:arguments[1],
            cancel:arguments[2],
            closeIconHandler:arguments[2]
        });
    }
});

});




