<?php
namespace frontend\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\LoginForm;
use frontend\models\PasswordResetRequestForm;
use frontend\models\ResetPasswordForm;
use frontend\models\SignupForm;
use frontend\models\ContactForm;
use frontend\models\Test;
use yii\helpers\Url;
use frontend\models\Article;

/**
 * Site controller
 */
class SiteController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout', 'signup'],
                'rules' => [
                    [
                        'actions' => [''],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['logout','signup'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
                // 定制报错信息
                // 'denyCallback' => function($rule,$action){
                //     throw new \Exception('You are not allowed to access this page.');
                // }
            ],
            // 指定用于匹配那种请求方法
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return mixed
     */
    public function actionIndex(){
        $this -> getView() -> title = '首页';

        return $this->render('homepage');
    }

    /*
    * @param {String} 1to3 最新的在最前，返回第1篇-第3篇
    * @desc 返回最新的指定数量的文章
    */     
    public function actionGetNewarticle(){
        $result = Array();

        $request = Yii::$app -> request;
        $rangeStr = $request -> get('range');
        $range = explode('to',$rangeStr);
        $offset = $range[0] - 1;
        $sum = $range[1] - $range[0] + 1;
        if( $sum <= 0 ){
            $result['status'] = 'error';
            $result['msg'] = '参数错误';
            
            echo json_encode( $result ); 
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

    /**
     * Logs in a user.
     *
     * @return mixed
     */
    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        } else {
            return $this->render('login', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Logs out the current user.
     *
     * @return mixed
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Displays contact page.
     *
     * @return mixed
     */
    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail(Yii::$app->params['adminEmail'])) {
                Yii::$app->session->setFlash('success', 'Thank you for contacting us. We will respond to you as soon as possible.');
            } else {
                Yii::$app->session->setFlash('error', 'There was an error sending email.');
            }

            return $this->refresh();
        } else {
            return $this->render('contact', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Displays about page.
     *
     * @return mixed
     */
    public function actionAbout()
    {
        return $this->render('about');
    }

    /**
     * Signs user up.
     *
     * @return mixed
     */
    public function actionSignup()
    {
        $model = new SignupForm();
        if ($model->load(Yii::$app->request->post())) {
            if ($user = $model->signup()) {
                if (Yii::$app->getUser()->login($user)) {
                    return $this->goHome();
                }
            }
        }

        return $this->render('signup', [
            'model' => $model,
        ]);
    }

    /**
     * Requests password reset.
     *
     * @return mixed
     */
    public function actionRequestPasswordReset()
    {
        $model = new PasswordResetRequestForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail()) {
                Yii::$app->session->setFlash('success', 'Check your email for further instructions.');

                return $this->goHome();
            } else {
                Yii::$app->session->setFlash('error', 'Sorry, we are unable to reset password for email provided.');
            }
        }

        return $this->render('requestPasswordResetToken', [
            'model' => $model,
        ]);
    }

    /**
     * Resets password.
     *
     * @param string $token
     * @return mixed
     * @throws BadRequestHttpException
     */
    public function actionResetPassword($token)
    {
        try {
            $model = new ResetPasswordForm($token);
        } catch (InvalidParamException $e) {
            throw new BadRequestHttpException($e->getMessage());
        }

        if ($model->load(Yii::$app->request->post()) && $model->validate() && $model->resetPassword()) {
            Yii::$app->session->setFlash('success', 'New password was saved.');

            return $this->goHome();
        }

        return $this->render('resetPassword', [
            'model' => $model,
        ]);
    }

    public function actionOffline(){
        return $this -> renderPartial('offline');
    }

    public function actionDownload(){
        $this -> getView() -> title = '下载';
        return $this -> render('download');
    }

    // for test
    public function actionTest(){
        return $this -> render('test');
    }

    // for test
    public function actionTest2(){
        $request = Yii::$app -> request;
        $username = $request -> post('username');
        $password = $request -> post('password');
        
        $test = new Test;
        $test -> username = $username;
        $test -> password = md5($password);
        $result = $test -> save();

        $response = array(
            'result' => $result
        );
        echo json_encode($response);
    }

    public function actionGetfile(){
        $file_name = Yii::$app -> request -> get('n');
        $file_dir = './downloads/';
        $absolute_dir = iconv( 'UTF-8','GB2312',$file_dir . $file_name ); // 转换为GB2312编码，否则会找不到文件或文件乱码

        if( !file_exists($absolute_dir) ){
            Header('Content-type:text/html;charset=utf-8');
            echo '文件不存在';
            die();
        }
        else{
            // 打开文件
            $file = fopen( $absolute_dir,'r' );
            // 输入文件标签
            Header('Content-type:application/actet-stream');
            Header('Accept-Ranges:bytes');
            Header('Accept-Length: ' . filesize($absolute_dir) );
            Header('Content-Disposition:attachment;filename=' . $file_name);
            // 输出文件内容
            // 读取文件内容并直接输出到浏览器
            echo fread( $file,filesize($absolute_dir) );
            fclose( $file );
            exit();
        }
    }

    // Alien Invasion
    public function actionAlienInvasion(){
        return $this -> render('alienInvasion');
    }
}
