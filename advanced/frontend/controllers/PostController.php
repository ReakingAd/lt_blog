<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use frontend\models\User;
use frontend\models\Article;
use yii\filters\AccessControl;

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
		$isGuest = Yii::$app -> user -> isGuest;
		if( $isGuest ){
			$list = Article::find() -> where('status=1') -> asArray() -> all();
		}
		else{
			$list = Article::find() -> asArray() -> all();
		}
		$data = array(
			'list' => $list
		);
		return $this -> render('list',['data' => $data]);
	}

	public function actionCreate(){
		$data = array(
			'article' => ''
		);
		// if the id is exist , go to edit the article
		$request = Yii::$app -> request;
		$title = $request -> get('title');
		if(isset($title)){
			// get the article by title
			$article = Article::find() -> where('title=:title',[':title' => $title]) -> asArray() -> one();
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
		$article -> update_time = date('Y-m-d h:i:s');

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
		$article -> keyword      = $articleInfo['keyword'];
		$article -> update_time = date('Y-m-d h:i:s');

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
		$title = $request -> get('title');
		// get the article by title
		$article = Article::find() -> where('title=:title',[':title' => $title]) -> asArray() -> one();
		$data = array(
			'isGuest' => $isGuest,
			'title' => $title,
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
}