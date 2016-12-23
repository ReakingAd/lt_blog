const request = require('request').defaults({proxy:'http://proxy.cmcc:8080'});
const fs = require('fs');
const url = 'http://baike.baidu.com/link?url=jQoWZ_YVvbUNDJLTLJOiMZ6wR1Yj2nPCsuN5vd-ERYF-WPe8l8cKihjnCYUx_uZ6T-nDUYrV5QG_lXBqA0WS8MocgN0z0gAOfyVAyBgEFjy8kE6CqovYM-wDRaSCNGex';

let getPageByUrl = url => {
	return new Promise( (resolve,reject) => {
		request.get(url,(err,res,body) => {
			if(err){
				return console.log(err);
			}
			resolve(body);
		});
	});
}

let parsePlay = html => {
	console.log('解析html开始...');
	let rContainer = /(?:id="dramaSerialList".*?>\s*)([\s\S]*?)(?:\s*<\/ul>)/g;
	let container = rContainer.exec(html)[1];
	let dramaArr = [];

	let reg = /(?:<dt[\s\S]*?span>\s*)(.*?)(?:\s*<\/span>[\s\S]*?<dd>\s*)(.*?)(?:\s*<\/dd>)/g;
	let result;
	while( ( result = reg.exec(container) ) != null ){
		let obj = {
			num:result[1],
			des:result[2]
		}
		dramaArr.push(obj);
	}
	console.log('解析html完成');
	return dramaArr;
}

let saveDrama = arr => {
	console.log('写入文件开始...');
	arr.forEach( (item,index) => {
		let content = '=====================' 
						+ item.num + '\r\n' 
						+ item.des + '\r\n'; 
		fs.appendFileSync('han.txt',content);
	});
	console.log('写入文件完成');
}

getPageByUrl(url)
	.then( html => {
		let dramaArr = parsePlay( html );
		saveDrama(dramaArr);
	})
	.catch( err => {
		console.log('错误： ' + err );
	});