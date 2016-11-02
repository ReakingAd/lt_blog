<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-frontend',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'frontend\controllers',
    'components' => [
        'request' => [
            'csrfParam' => '_csrf-frontend',
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-frontend', 'httpOnly' => true],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the frontend
            'name' => 'advanced-frontend',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,  // 隐藏url中的入口文件index.php
            'rules' => [
                'list' => 'post/index',
                'show/<id:\d+>' => 'post/show',
                'create' => 'post/create'
            ],
            'suffix' => '.html',    // url后缀
        ],
        'db' => array(  
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=localhost;dbname=yii2advanced',
                'username' => 'root',
                'password' => 'root',
                'charset' => 'utf8',
        ),
        'authManage' => [
            'class' => 'yii\rbac\Phpmanager',
        ]
    ],
    'params' => $params,
    'timeZone' => 'Asia/Chongqing',   // 修改时区
    // 'defaultRoute' => 'post/index',     // 缺省路由
    'defaultRoute' => 'site/index',     // 缺省路由
    // 'catchAll' => ['site/offline'],       // 全拦截路由
];

