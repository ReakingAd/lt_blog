<?php
class Person{
	
}

class Person2 {
	$name = 'xxx';

	public function foo(){
		echo $this -> name;
	}
}

class Student extends Person implements Person2{
	$name = 'xxx';
	
	public function foo(){
		echo $this -> name;	
	}
}
$s1 = new Student;
echo $s1 -> sayName(); // 可以输出xxx
echo $s1 -> say();  // 报错
?>