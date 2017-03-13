<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
	<!--<div class="lt-overlay">
	</div>
	<div class="lt-popup">
		<div class="lt-popup-head">
			<span class="">lt-popup</span>
			<span class="pull-right">关闭</span>
		</div>
		<div class="lt-popup-msg-container">
			xxxxxxxxxxxxxxxx
		</div>
		<div class="lt-popup-btn-container">
			<button class="btn btn-default btn-confirm">确认</button>
			<button class="btn btn-default btn-cancel">取消</button>
		</div>
	</div>-->
	<link rel="stylesheet" href="./bootstrap.css" />
	
	<style>
		*{
			padding:0;
			margin:0;
		}
		.lt-overlay{
			background-color:#000;
			opacity:0.3;
			position:absolute;
			/*left:0;*/
			/*top:0;*/
			width:100%;
			height:100%;
		}
		.lt-popup{
			position:absolute;
			width:300px;
			border:1px solid #999;
			/*left:300px;*/
			/*top:200px;*/
			background-color:#fff;
			border-radius:5px;
			-webkit-animation:scale-out .3s;
		}
		.lt-popup-head{
			padding:10px;
			border-top:5px solid #999;
			overflow:hidden;
		}
		.lt-popup-hastitle{
			border-bottom: 1px solid #ccc;
		}
		.lt-popup-msg-container{
			padding:10px 10px 20px;
		}
		.lt-popup-btn-container{
			text-align: right;
    		padding: 10px;
		}
		.lt-popup-btn-container button{
		    margin-left: 10px;
		}
		.close-icon{
			height:14px;
			width:14px;
			background:url('./close-icon.png');
			background-image: url(../../images/close-icon.png);
    		background-size: 100%;
			-webkit-transition:transform .5s;
			cursor:pointer;
		}
		.close-icon:hover{
			-webkit-transform:rotate( 90deg );
		}
		@keyframes scale-out{
			from{
				opacity:0;
				-webkit-transform:scale(0.5)
			}
			80%{
				opacity:1;
				-webkit-transform:scale(1.05)
			}
			to{
				opacity:1;
				-webkit-transform:scale(1)
			}
		}
	</style>
	<button class="test">click</button>
	<button class="alert">alert</button>
	<button class="confirm">confirm</button>
<script src="https://www.reakingad.com/cdn/jquery.js"></script>
<script src="./lt-popup.js"></script>
<script>
	$('.test').on('click',function(){
		$.ltPopup({
			msg:'content',
			title:'xxx',
			btns:['confirm','cancel','xx'],
			// closeIcon:false,
			freeClose:true,
			freeCloseHandler:function(){
				console.log('in freeCloseHandler ');
			},
			confirm:function(){
				console.log('innnnnnnnnnnn confirm');
			},
			cancel:function(){
				console.log('innnnnnnnnnn cancel');
			}
		});	
	});
	$('.alert').on('click',function(){
		$.ltAlert('123');
	});
	$('.confirm').on('click',function(){
		$.ltConfirm(22222,function(){
			console.log('yes');
		},function(){
			console.log('no');
		});
	});
</script>
</body>
</html>