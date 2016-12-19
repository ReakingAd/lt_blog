const request = require('request').defaults({proxy:'http://proxy.cmcc:8080'});
const cheerio = require('cheerio');
const _       = require('underscore');
const fs      = require('fs');
let keyword   = 'nodejs';

let getPageBykeyword = (keyword,pageNum) => {
	console.log('获取所有列表开始');
	let arr = [];
	for(let i=0;i<pageNum;i++){
		arr[i] = i;
	}
	let promises = arr.map( item => {
		let url = 'https://www.liepin.com/zhaopin/?searchField=&key=' + keyword + '&searchType=0&clean_condition=&jobKind=&isAnalysis=&init=&industries=&jobTitles=&dqs=000&compscale=&compkind=&curPage=' + pageNum;
		url = encodeURI(url);
		return new Promise( (resolve,reject) => {
			request.get(url,(err,res,body) => {
				if(err){
					return console.log( '获取HTML错误：' + err );
				}
				resolve(body);
			});
		});
	});
	console.log('获取所有列表完毕');
	return Promise.all(promises);
}

let getJobUrl = htmlArr => {
	console.log('解析招聘信息的url开始');
	let urlArr = [];

	htmlArr.forEach( item => {
		let $ = cheerio.load(item);
		let urlContainers = $('.job-name');

		urlContainers.each( (index,urlContainer) => {
			let urlWrapper = $(urlContainer).find('a');
			let name       = urlWrapper.text().trim();
			let url        = urlWrapper.attr('href');

			let obj = {
				name:name,
				url:url
			}

			urlArr.push(obj);
		});
	});
	console.log('解析招聘信息的url完毕');
	return urlArr;
}

let getJobPage = urlArr => {
	console.log('获取招聘详细信息页开始');
	let promises = _.map(urlArr,urlObj => {
		return new Promise( (resolve,reject) => {
			request.get(urlObj.url,(err,res,body) => {
				if(err){
					return console.log( '获取错误： ' + err );
				}
				resolve({
					url:urlObj.url,
					html:body
				});
			});
		});
	});
	console.log('获取招聘详细信息页完毕');
	return Promise.all( promises );
};

let parJobInfoFromHtml = htmlArr => {
	console.log('解析招聘详细信息开始');
	let jobArr = [];
	let getDes = ($) => {
		let des = '';
		let conatainers = $('.job-title');

		conatainers.each( (index,item) => {
			if( $(item).text() === '职位描述：'){
				return des = $(item).next('div').text().trim();
			}
		});
		return des;
	}

	htmlArr.forEach( (item,index) => {
		let $          = cheerio.load(item.html);
		let title      = $('.title-info h1').text();
		let salary     = '';
		let city 	   = '';
		let experience = '';
		let des  	   = '';
		// 优化过url的新版html结构
		if( item['url'].indexOf('/a/') !== -1 ){
			salary    = $('.job-main-title').text().trim();
			experience = $('.resume span').eq(1).text();
			des       = $('.job-main.main-message').eq(0).text().trim();
			city	  = $('.basic-infor span').eq(0).text();
		}
		// 优化url前的旧版html结构
		else{
			salary     = $('.job-item-title').text().replace($('.job-item-title span').text(),'').trim();
			experience = $('.job-qualifications span').eq(1).text();
			city       = $('.basic-infor a').text();
			des  	   = getDes($);
		}
		let infoObj = {
			title:title,
			url:item.url,
			salary:salary,
			city:city,
			experience:experience,
			des:des
		}

		jobArr.push( infoObj );
	});
	console.log('解析招聘详细信息完毕');
	return jobArr;
}

let saveJobInfo = jobArr => {
	console.log('保存招聘详细信息开始');
	return new Promise( (resolve,reject) => {
		jobArr.forEach( (job,index) => {
			let info = (index + 1) + '======================================================\r\n'
						+ job.title +  '\r\n网址：' + job.url + '\r\n工资：' + job.salary + '\r\n城市：' + job.city + '\r\n经验：' 
						+ job.experience + '\r\n描述：' + job.des + '\r\n';
			fs.appendFileSync( 'liepin_' + keyword + '_' + jobArr.length + '.txt',info);
		});
		console.log('保存招聘详细信息完毕');
		resolve();
	});
}

getPageBykeyword(keyword,20)
	.then( html => {
		let urlArr = getJobUrl(html);

		return getJobPage(urlArr);
	})
	.then( htmlArr => {
		return parJobInfoFromHtml(htmlArr);
	})
	.then( jobArr => {
		saveJobInfo( jobArr );
	})
	.then( () => {
		console.log('done');
	})
	.catch( err => {
		console.log('不错错误：' + err);
	});