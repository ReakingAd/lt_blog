<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use frontend\models\User;
use frontend\models\Article;

class PostController extends Controller{

	public $enableCsrfValidation = false; // forbidden the _csrf check intercept

	public function actionIndex(){
		$list = Article::find() ->asArray() -> all();
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
		$id = $request -> get('id');
		if(isset($id)){
			// get the article by ID
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
		$request = Yii::$app -> request;
		$id = $request -> get('id');
		// get the article by id
		$article = Article::find() -> where('id=:id',[':id' => $id]) -> asArray() -> one();
		$data = array(
			'id' => $id,
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
}