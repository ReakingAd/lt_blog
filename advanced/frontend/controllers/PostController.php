<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use frontend\models\User;
use frontend\models\Article;
use yii\filters\AccessControl;
use yii\data\Pagination;


class PostController extends Controller{

	public $enableCsrfValidation = false; // forbidden the _csrf check intercept

	public function behaviors(){
		return [
			'access' => [
				'class' => AccessControl::className(),
				'only' => ['create','save','update','delete','show'],
				'rules' =>[
					[
						'allow' => true,
						'actions' => ['show'],
						'roles' =>['?']
					],
					[
						'allow' => true,
						'actions' => [], // 为空，则说明only中的所有操作都适用
						'roles' => ['@'],
						// 'matchCallback' => function($rule,$action){
						// 	return date('d-m') === '01-11'; // 仅11月1日可以访问
						// }
					]	
				],
				'denyCallback' => function($rule,$action){
					echo Yii::$app -> view -> render('@app/views/post/error.php');
				}
			]
		];
	}

	/*
	*@desc 渲染“博文列表”页的视图
	*/
	public function actionList(){
		$this -> getView() -> title = "博文列表";
		$isGuest = Yii::$app -> user -> isGuest;

		return $this -> render('list');
	}
	/*
	*@param {String} 点击量最高的前n篇，默认10篇
	*@param {JSON} 指定数目的文章数组
	*@ 异常处理需完善......
	*/
	public function actionGetArticleHot(){
		$result = Array();
		$isGuest = Yii::$app -> user -> isGuest;
		$request = Yii::$app -> request;
		$sum = $request -> get('sum',10); // 默认前10篇

		$articles = Article::find();
		if( $isGuest ){
			$articles -> where('status=1');
		}
		try{
			$articleHot = $articles -> orderBy('pv desc') -> limit( $sum ) -> asArray() -> all();
			$result['status'] = 'success';
			$result['msg'] = $articleHot;
		}catch(\Exception $e){
			$result['status'] = 'error';
			$result['msg'] = '500';
		}

		return json_encode( $result );
	}

	/*
	* @param {String} timeFlag 标准时间格式的字符串。例如 2017-03-01 22:27:30。如果没有这个参数，则始终取最新的文章
    * @param {String} range   最新的文章1篇或连续多篇。例如 1to3 为最新和倒数第3新之间的所有文章
    * @desc 以timeFlag做分隔，在此时间之前的 range 范围内的文章。
	* @example  1to3 返回最新的第1篇至第3篇
	*           5 返回最新的第五篇。
    */     
    public function actionGetArticleNew(){
        $result   = Array();
        $request  = Yii::$app -> request;
        $rangeStr = $request -> get('range');
		$timeFlag = $request -> get('timeFlag');
		$hasStrTo       = strstr( $rangeStr,'to' );
		// 参数中不含 to
		if( !$hasStrTo ){
			$offset = (int)$rangeStr;
			$sum    = 1;
		}
		// 参数中包含 to
		else{
			$range  = explode('to',$rangeStr);
			$offset = $range[0] - 1;
			$sum    = $range[1] - $range[0] + 1;
			if( $sum <= 0 ){
				$result['status'] = 'error';
				$result['msg'] = '参数错误';
				
				echo json_encode( $result ); 
			}
		}

        $isGuest = Yii::$app -> user -> isGuest;
        $articles = Article::find();
		if( $isGuest ){
			$articles -> where('status=1');
		}
		if( $timeFlag ){
        	$articles -> andWhere( ['<','create_time',$timeFlag] ); // > 之后  < 之前
		}
		$articles = $articles -> orderBy('create_time desc') -> offset( $offset ) -> limit( $sum ) -> asArray() -> all();
        $result['status'] = 'success';
        $result['msg'] = $articles;

        echo json_encode( $result );
    }

	/*
	*@param {null}
	*@return {JSON} 返回所有关键词，逗号间隔的字符串  
	*/
	public function actionGetKeywords(){
		// 文章关键词
		$keywords = Article::find();
		$isGuest = Yii::$app -> user -> isGuest;
		if( $isGuest ){
			$keywords -> where('status=1');
		}
		$keywords = $keywords -> select('keyword') -> asArray() -> all();
		$keywords = $this -> formatKeywordsToStr($keywords);

		echo json_encode( $keywords );
	}

	/*
	*@param {Array}
	*@desc 整理数据库查询出的关键词数据，关联数组转成索引数组、去重、返回逗号间隔的字符串，
	*/
	private function formatKeywordsToStr( $array ){
		$keywordsArr = Array();
		foreach( $array as $key => $value ){
			array_push($keywordsArr,$value['keyword']);
		}
		$keywords = implode( ',',array_unique( explode( ',',implode(',',$keywordsArr) ) ) );
		
		return $keywords;
	}

	/*	
	*@param {String} pageSize   单页长度，缺省单页10条
	*@param {String} pageNum    第n页,缺省第1页
	*@return {JSON} 文章分页查询结果 
	*@desc 响应所有文章的分页查询。
	*/
	public function actionGetArticlePagination(){
		$isGuest  = Yii::$app -> user -> isGuest;
		$request  = Yii::$app -> request;
		$pageNum  = $request -> get('pageNum',1);
		$pageSize = $request -> get('pageSize',10);
		
		$offsetNum = ( $pageNum - 1 ) * $pageSize;
		$listAll = Article::find();
		if( $isGuest ){
			$listAll -> where('status=1');
		}
		$totalCount = $listAll -> count();
		$list = $listAll -> offSet( $offsetNum ) -> limit( $pageSize ) -> asArray() -> all();
		$res = Array();
		$res['list'] = $list;
		$res['totalCount'] = $totalCount;

		echo json_encode( $res );
	}

	/*
	*@param {String} tag
	*@desc 按照标签查询文章
	*/ 
	public function actionGetArticleByTag(){
		$result = Array();
		$request = Yii::$app -> request;
		$tag = $request -> get('tag');
		if( !$tag ){
			$result['status'] = 'error';
			$result['msg'] = 'tag 非法';
		}
		else{
			$articles = Article::find();
			$articlesByTag = $articles -> where( ['like','keyword',$tag] ) -> asArray() -> all();
			$result['status'] = 'success';
			$result['msg'] = $articlesByTag;
		}

		echo json_encode( $result );
	}
	/*
	*@param  {string} id
	*@desc  如果有参数id，则编辑这个id的文章。如果没有参数id则，编辑空文章
	*/
	public function actionCreate(){
		$data = array(
			'article' => ''
		);
		$request = Yii::$app -> request;
		$id = $request -> get('id');
		// get the article by id
		if(isset($id)){
			$article = Article::find() -> where('id=:id',[':id' => $id]) -> asArray() -> one();
			$data['article'] = $article;
		}
		return $this -> render('create',['data' => $data]);
	}

	// interface : save a new article
	public function actionSave(){
		$request     = Yii::$app -> request;
		$articleInfo = $request -> post();
		$data 		 = array(
			'articleInfo' => $articleInfo
		);
		// insert into the database
		$article                = new Article;
		$article -> title       = $articleInfo['title'];
		$article -> content     = $articleInfo['content'];
		$article -> status      = $articleInfo['status'];
		$article -> keyword     = $articleInfo['keyword'];
		// $article -> update_time = date('Y-m-d h:i:s');
		$article -> create_time = date('Y-m-d H:i:s');

		$result = $article -> save();
		// make a response for frondend
		$res = array();
		if( $result ){
			$res['result'] = 'success';
		}
		else{
			$res['result'] = 'error';
		}
		echo json_encode($res);
	}

	// interface : modify the article
	public function actionUpdate(){
		$request     = Yii::$app -> request;
		$articleInfo = $request -> post();
		$id          = $articleInfo['id'];
		$data        = array(
			'articleInfo' => $articleInfo
		);
		$article = Article::find() -> where('id=:id',[':id' => $id]) -> one();
		$article -> title       = $articleInfo['title'];
		$article -> content     = $articleInfo['content'];
		$article -> status      = $articleInfo['status'];
		$article -> keyword     = $articleInfo['keyword'];
		$article -> update_time = date('Y-m-d H:i:s');

		$result = $article -> save();
		// make a response for frentend
		$res = array();
		if( $result ){
			$res['result'] = 'success';
		}
		else {
			$res['result'] = 'error';
		}
		echo json_encode($res);
	}

	/*
	*@desc 渲染文章展示页面你的视图
	*/
	public function actionShow(){
		$isGuest = Yii::$app -> user -> isGuest;
		$request = Yii::$app -> request;
		$data = array(
			'isGuest' => $isGuest
		);

		return $this -> render('show',['data' => $data]);
	}

	/*
	*@param {String} id
	*@return {JSON} 指定id的文章
	*/ 
	public function actionGetArticleById(){
		$result = Array();
		$request = Yii::$app -> request;
		$id = $request -> get('id');
		$article = Article::find() -> where('id=:id',[':id' => $id]) -> asArray() -> one();

		$isGuest = Yii::$app -> user -> isGuest;
		$status = $article['status'];
		// 如果是未登陆，且该篇文章是草稿，则返回错误信息。
		if( $isGuest && $status == 2 ){
			$result['status'] = 'error';
			$result['msg'] = '查无此文';
		}
		else{
			$result['status'] = 'success';
			$result['msg'] = $article;
		}

		echo json_encode( $result );
	}

	/*
	*@param {String}  id
	*@desc 接收post请求，为文章的点击量 +1
	*/
	public function actionCountPv(){
		$request = Yii::$app -> request;
		$id = $request -> post('id');

		$article = Article::find() -> where('id=:id',[':id' => $id]) -> one();
		$oldPv = $article -> pv;
		$pv = $oldPv + 1;
		$article -> pv = $pv;
		$result = $article -> save();

		$response = array();
		if( $result ){
			$response['result'] = 'success';
			$response['value']['pv'] = $pv; 
		}
		else{
			$response['result'] = 'error';
		}

		echo json_encode($response);
	}

	public function actionAqi(){
		$url='http://es6.reakingad.com/api/getweather?city=101010100&type=1';  
	    $data = file_get_contents($url);  
	    echo $data; 
	}

}