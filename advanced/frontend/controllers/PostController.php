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
		$data = array();
		return $this -> render('create',['data' => $data]);
	}

	public function actionSave(){
		$request = Yii::$app -> request;
		$articleInfo = $request -> post();
		$data = array(
			'articleInfo' => $articleInfo
		);
		// 存入数据库
		$article                = new Article;
		$article -> title       = $articleInfo['title'];
		$article -> content     = $articleInfo['content'];
		$article -> status      = $articleInfo['status'];
		$article -> update_time = date('Y-m-d h:i:s');

		$article -> save();
		// 返回状态
		$res = array();
		$id = $article -> primaryKey;
		if( isset($id) ){
			$res['result'] = 'success';
			echo json_encode($res);
		}
		else{
			$res['result'] = 'error';
			echo $res;
		}
	}

	public function actionShow(){
		$request = Yii::$app -> request;
		$id = $request -> get('id');
		// 根据文章id查询文章内容
		$article = Article::find() -> where('id=:id',[':id' => $id]) -> asArray() -> one();
		$data = array(
			'article' => $article
		);
		return $this -> render('show',['data' => $data]);
	}
}