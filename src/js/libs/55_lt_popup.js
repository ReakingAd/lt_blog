;(function(window,document,$,undefined){

/**
 * 
 * @param {*} options 
 * @issue  xss跨站脚本攻击怎么办？需要加入字符串检测<script>。eval()呢？
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

LTPopup.prototype.init = function(){
    this.checkOptions();
    this.createPopup();
    this.setStyle();
    this.bindEventHandler();
}

// 初始化popup前，先检测配置项的可用性。
LTPopup.prototype.checkOptions = function(){
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
    var titleClass = this.title ? 'lt-popup-hastitle' : ''; // 如果传入了 title 配置项，则启用这个样式类
    var closeIconHtml = this.closeIcon ? '<span class="close-icon pull-right"></span>' : '';
    var buttonHtml = this._createBtnHtml();
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
    var _html = '';

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
    var _windowWidth = window.innerWidth;
    var _left = ( _windowWidth - 300 ) / 2;
    var _top = ( _windowHeight -300 ) / 2;

    $('.lt-overlay').css({
        'height':_windowHeight,
        'width':_windowWidth,
        'left':0,
        'top':0
    });
    $('.lt-popup').css({
        'left':_left,
        'top':_top
    });
}

// 绑定按钮事件
LTPopup.prototype.bindEventHandler = function(){
    var _this = this;
    
    // 点击“确认”按钮关闭popup，并调用配置项中的回调
    $('.lt-popup').on('click','.btn-confirm',function(){
        _this.confirmHandler();
        _this.closePopup();
    });
    // 点击“取消”按钮关闭popup，并调用配置项中的回调
    $('.lt-popup').on('click','.btn-cancel',function(){
        _this.cancelHandler();
        _this.closePopup();
    });
    // 点击 overlay 关闭弹窗。
    if( _this.freeClose ){
        $('.lt-overlay').on('click',function(){
            _this.closePopup();
            _this.freeCloseHandler();
        });
    }
    // 点击关闭icon，关闭弹窗
    if( _this.closeIcon ){
        $('.lt-popup').on('click','.close-icon',function(){
            _this.closePopup();
            _this.closeIconHandler();
        });
    }
}

// 关闭popup
LTPopup.prototype.closePopup = function(){
    $('.lt-overlay').remove();
    $('.lt-popup').remove();
}

$.extend({
    ltPopup:function(options){
        var defaultOptions = {
            msg:'',
            title:'',
            btns:['confirm'],
            freeClose:false,
            closeIcon:true,
            closeIconHandler:function(){},
            freeCloseHandler:function(){},
            confirm:function(){},
            cancel:function(){}
        }
        var _options = $.extend({},defaultOptions,options);
        var ltPopup = new LTPopup( _options );

        ltPopup.init(); 
    },
    /**
     * @param {String} str 弹窗显示的文字
     * @example   
     *          $.ltAlert('恭喜，注册成功!');
     */
    ltAlert:function(str){
        $.ltPopup({
            msg:str,
            title:'提醒',
            freeClose:true
        });
    },
    /**
     * @param {String} 要显示的内容。
     * @param {Function}  点击“确定”的回调
     * @param {Function}  点击“取消”和关闭icon的回调
     * @example 
     *          $.ltConfirm('确定要删除吗？',function(){
     *              // post a delete request here
     *          },function(){
     *              // do not post request
     *          })
     */
    ltConfirm:function(){
        var msg = arguments[0];

        if( typeof msg === 'number' ){
            msg = msg.toString();
        }
        if( typeof msg !== 'string' || typeof arguments[1] !== 'function' || typeof arguments[2] !== 'function'){
            throw new Error('wrong param');
        }
        var _options = {
            msg:msg,
            btns:['confirm','cancel'],
            confirm:arguments[1],
            cancel:arguments[2],
            closeIconHandler:arguments[2]
        }
        $.ltPopup(_options);
    }
});


})(window,document,jQuery);
