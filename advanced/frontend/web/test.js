var btn = document.getElementsByTagName('button')[0];

btn.addEventListener('click',function(){

	var xhr = new XMLHttpRequest();
	// console.log(xhr);
	xhr.onreadystatechange = function(){
		if( xhr.readyState == 4 ){
			if( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 ){
				console.log( xhr.responseText );
			}
			else{
				alert('Request wan unsuccessful: ' + xhr.status);
			}
		};
	}
	xhr.open('get','temp.php',false);
	xhr.setRequestHeader('MyHeader','MyValue');
	xhr.send(null);
});