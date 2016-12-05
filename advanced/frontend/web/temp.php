<?php

?>
<form>
  <div><input type="text" name="a" value="1" id="a" /></div>
  <div><input type="text" name="b" value="2" id="b" /></div>
  <div><input type="hidden" name="c" value="3" id="c" /></div>
  <div>
    <textarea name="d" rows="8" cols="40">4</textarea>
  </div>
  <div><select name="e">
    <option value="5" selected="selected">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
  </select></div>
  <div>
    <input type="checkbox" name="f" value="8" id="f" />
  </div>
  <div>
    <input type="submit" name="g" value="Submit" id="g" />
  </div>
</form>
<button class="btn btn-default">click</button>
<style>
	button{
		margin:0 auto;
	}
</style>
<script>
var form = document.getElementsByTagName('form')[0];
var kk = $(form).serialize();
console.log(kk)

var btn = document.getElementsByTagName('button')[0];

btn.onclick = function(){
	var xhr = new XMLHttpRequest();

	xhr.open('post','test.php',true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if( xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 ){
				var myHeader = xhr.getAllResponseHeaders().trim();
				var headerArr = myHeader.split('\n');
				var headerMap = {};
				
				headerArr.forEach(function(item,index){
					var subHeaderArr = item.split(':');

					headerMap[ subHeaderArr[0] ] = subHeaderArr[1];
				});
				console.log( xhr.responseText )
			}
			else{
				console.log('error::' + xhr.status );
			}
		}
	}
	xhr.setRequestHeader('myHeader','http://1.1.1.1:8080');
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.send('aaa=123');
	// console.log('after');
}

// var a = 'adf';
// console.log( encodeURIComponent(a) );
// console.log(encodeURIComponent("http://www.w3school.com.cn"))
// console.log(encodeURI("http://www.w3school.com.cn"))
</script>