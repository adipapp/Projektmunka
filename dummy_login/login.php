<?php

class Credential{
	private $passwd;
	private $uname;
	public $location;
	
	public function __construct($uname, $passwd, $location){
		$this->uname = $uname;
		$this->passwd = $passwd;
		$this->location = $location;
	}
	
	public function match($uname, $passwd) {
		return ($this->uname == $uname && $this->passwd == $passwd);
	}
}

$credentials = array(new Credential("tsz-vez", "tsz-vez", "Udv Miki!"), new Credential("tsz-ui", "tsz-ui", "Udv Gabi!"),
new Credential("tanar1", "tanar1", "Udv Foldi halando!"));

$uname = $_POST['uname'];
$passwd = $_POST['passwd'];
$auth_suc = false;

foreach($credentials as $act){
	if($act->match($uname, $passwd)) {
		echo $act->location;
		$auth_suc = true;
		break;
	}
}

if(!$auth_suc) {
	echo "Authentication failed!";
}