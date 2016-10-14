<?php
// blog by Yii 
namespace frontend\models;

use yii\db\ActiveRecord;

class User extends ActiveRecord{

	public function validatePassword($password){
		return $this -> hashPassword($password,$this->salt) === $this -> password;
	}

	public function hashPassword($password,$salt){
		return md5($salt.$password);
	}
}