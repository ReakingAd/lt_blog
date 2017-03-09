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

	public function actionList(){
		$this -> getView() -> title = "博文列表";

		$isGuest = Yii::$app -> user -> isGuest;
		

		// 所有文章(及按标签查询)
		$listAll = Article::find();
		if( $isGuest ){
			$listAll -> where('status=1');
		}
		$request = Yii::$app -> request;
		$keyword = $request -> get('keyword');
		if( !empty($keyword) ){
			$listAll -> andWhere(['like', 'keyword', $keyword]);
		}
		$listAll = $listAll -> asArray() -> all();
		$data['listAll'] = $listAll;

		// 热门排行
		$listHot = Article::find();
		if( $isGuest ){
			$listHot -> where('status=1');
		}
		$listHot = $listHot -> orderBy('pv desc') -> limit(10) -> asArray() -> all();
		$data['listHot'] = $listHot;

		// 最新文章
		$listLatest = Article::find();
		if( $isGuest ){
			$listLatest -> where('status=1');
		}
		$listLatest = $listLatest -> orderBy('create_time desc') -> limit(10) -> asArray() -> all();
		$data['listLatest'] = $listLatest;

		// 文章关键词
		$keywords = Article::find();
		if( $isGuest ){
			$keywords -> where('status=1');
		}
		$keywords = $keywords -> select('keyword') -> asArray() -> all();
		$keywords = $this -> foo($keywords);
		$data['keywords'] = $keywords;

		return $this -> render('list',['data' => $data]);
	}

	public function actionGetKeywords(){
		// 文章关键词
		$keywords = Article::find();
		$isGuest = Yii::$app -> user -> isGuest;
		if( $isGuest ){
			$keywords -> where('status=1');
		}
		$keywords = $keywords -> select('keyword') -> asArray() -> all();
		$keywords = $this -> foo($keywords);

		echo json_encode( $keywords );
	}
	
	/*	
	* 响应所有文章的分页查询。参数pageNUm,PageSize
	*/
	public function actionSearchArticle(){
		$isGuest  = Yii::$app -> user -> isGuest;
		$request  = Yii::$app -> request;
		$pageNum  = $request -> get('pageNum');
		$pageSize = $request -> get('pageSize');
		
		$offsetNum = ($pageNum - 1) * $pageSize;
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
	
	private function foo( $array ){
		$keywordsArr = Array();
		foreach( $array as $key => $value ){
			array_push($keywordsArr,$value['keyword']);
		}
		$keywords = implode( ',',array_unique( explode( ',',implode(',',$keywordsArr) ) ) );
		return $keywords;
	}

	public function actionCreate(){
		$data = array(
			'article' => ''
		);
		// if the id is exist , go to edit the article
		$request = Yii::$app -> request;
		// $title = $request -> get('title');
		$id = $request -> get('id');
		if(isset($id)){
			// get the article by id
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

	public function actionShow(){
		$isGuest = Yii::$app -> user -> isGuest;
		$request = Yii::$app -> request;
		$id = $request -> get('id');
		// get the article by title
		$article = Article::find() -> where('id=:id',[':id' => $id]) -> asArray() -> one();
		$data = array(
			'isGuest' => $isGuest,
			'article' => $article
		);
		return $this -> render('show',['data' => $data]);
	}

	// interface : get article by id 
	public function actionGetArticle(){
		$request = Yii::$app -> request;
		$id = $request -> post('id');
		$article = Article::find() -> where('id=:id',[':id' => $id]) -> asArray() -> one();
		echo json_encode($article);
	}

	// interface : count PV of current page
	public function actionCountPv(){
		$request = Yii::$app -> request;
		$title = $request -> post('title');

		$article = Article::find() -> where('title=:title',[':title' => $title]) -> one();
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

    /*
    * @param {String} 1to3 返回最新的文章1篇或连续多篇
    * @desc 返回最新的指定数量的文章
	* @example  1to3 返回最新的第1篇至第3篇
	*           5 返回最新的第五篇。
    */     
    public function actionGetNewarticle(){
        $result   = Array();
        $request  = Yii::$app -> request;
        $rangeStr = $request -> get('range');
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
        $articles = $articles -> orderBy('create_time desc') -> offset( $offset ) -> limit( $sum ) -> asArray() -> all();
        $result['status'] = 'success';
        $result['msg'] = $articles;

        echo json_encode( $result );
    }

}