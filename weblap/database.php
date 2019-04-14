<?php
class Database{
				
	public $servername;
	public $username;
	public $password;
	public $dbname;			
	public $conn;
	public $sql;
	
	public $result;
	public $row;
		
	public function __construct(){
		
		$this->servername = "xenia.sze.hu";
		$this->username = "projektmunka";
		$this->password = "2019Projekt123";
		$this->dbname = "projektmunka";

		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		
		if ($this->conn->connect_error) {
			 die("Connection failed: " . $conn->connect_error);
			 
		}
		$this->conn->set_charset("utf8");
		return $this->conn;	
		echo "siker";
	}
	
	public function getDbname() {
		return $this->dbname;
	}
	
	public function getSql() {
		return $this->sql;
	}
	
	public function getConn() {	
		return $this->conn;
	}
	
	public function getRow() {	
		return $this->row;
	}
	
	public function getResult() {	
		return $this->result;
	}
	
	public function __destruct (){
		$this->conn->close();
	}
	
	public function select($tableName, $columns, $where, $etc = ""){
		$this->sql = "SELECT ".$columns." FROM " . $tableName . " WHERE " . $where . " " . $etc . ";";
		$this->result = mysqli_query($this->getConn(),$this->getSql());
		$this->row = mysqli_fetch_assoc($this->getResult());
		return $this->sql;
	}
	
	public function encription($password){
		$str = $password;
		$salt = "h7t357ad593sfob24xd4u672r2afs";
		$sec1 = sha1($salt.$str); 
		$sec2 =  md5($sec1); 
		return $sec2;
	}
	
	public function insert($tableName, $columns, $values, $etc = ""){
		$this->sql = "INSERT INTO ".$tableName." ( ".$columns." ) VALUES ( ".$values." ) ".$etc.";";
		return $this->sql;
	}
	
	public function update($tableName, $values, $where, $etc = ""){
		$this->sql = "UPDATE ".$tableName." SET ".$values." WHERE ".$where." ".$etc.";";
		return $this->sql;
	}
	
	public function del($tableName, $where, $etc = ""){
		$this->sql = "DELETE FROM ".$tableName." WHERE ".$where." ".$etc.";";
		return $this->sql;
	}
}	
?>