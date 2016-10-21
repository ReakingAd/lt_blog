<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use frontend\models\User;
use frontend\models\Article;

class PostController extends Controller{

	public $enableCsrfValidation = false; // 禁用_csrf验证拦截

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
		// 如果get收到参数id，则进入编辑功能。
		$request = Yii::$app -> request;
		$id = $request -> get('id');
		if(isset($id)){
			// 根据文章id查询文章内容
			$article = Article::find() -> where('id=:id',[':id' => $id]) -> asArray() -> one();
			$data['article'] = $article;
		}
		return $this -> render('create',['data' => $data]);
	}

	// 创建文章接口
	public function actionSave(){
		$request     = Yii::$app -> request;
		$articleInfo = $request -> post();
		$data 		 = array(
			'articleInfo' => $articleInfo
		);
		// 存入数据库
		$article                = new Article;
		$article -> title       = $articleInfo['title'];
		$article -> content     = $articleInfo['content'];
		$article -> status      = $articleInfo['status'];
		$article -> update_time = date('Y-m-d h:i:s');

		$result = $article -> save();
		// 返回状态
		$res = array();
		if( $result ){
			$res['result'] = 'success';
		}
		else{
			$res['result'] = 'error';
		}
		echo json_encode($res);
	}
	
	// 修改文章接口
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
		// 返回状态
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
		// 根据文章id查询文章内容
		$article = Article::find() -> where('id=:id',[':id' => $id]) -> asArray() -> one();
		$data = array(
			'id' => $id,
			'article' => $article
		);
		return $this -> render('show',['data' => $data]);
	}
}