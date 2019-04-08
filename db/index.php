<!DOCTYPE html>
<?php 
session_start(); 
ob_start();
?>
<html>
<head>
    <title></title>

    <?php include 'database.php'; ?>
    <?php// include 'php/page.php'; ?>
    <meta charset="utf-8" />
    <style>
        td {
            border: 1px solid black;
            cell-spaceing: 0px;
            margin: 0px;
        }
        
    </style>

</head>




<body>
     
    
    
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
        <legend style="border:1px solid black">Szabadság<br><br>             
        Neptun: <input type="text" name="nept"><br><br>
        Időpont: <input type="date" name="date"><br><br>
        <select name='tipus'>
		<?php
			
			$database = new database();
			
			$database->select("szabadsagtipus", "*", "tipus is not null", "");
			
			$database->result = mysqli_query($database->getConn(),$database->getSql());			
			while($row = $database->result->fetch_assoc()){
			   echo '<option value="'.$row["tipus"].'"> '.$row["megnevezes"].' </option>';
			   
			}							
		?>	
		</select>
		<br><br>
        <input type="submit" name="kuld" value="Kivesz"> 
        </legend>
    </form>
    <br>
    
	<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
        <legend style="border:1px solid black">Lekérdezés<br><br>             
        Neptun: <input type="text" name="nept"><br><br>
        <input type="submit" name="kuld" value="Keres"> 
        </legend>
    </form>
    <br>
    
    
    
    <br>
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
        <legend style="border:1px solid black">Adatok<br><br>             
        Neptun: <input type="text" name="nept"><br><br>
        Kernev: <input type="text" name="ker"><br><br>
        Veznev: <input type="text" name="vez"><br><br>
        Szuletett: <input type="date" name="szul"><br><br>
        E-mail: <input type="email" name="email"><br><br>
        <input type="submit" name="kuld" value="Ment"> 
        </legend>
    </form>
    <br>
</body>

<?php


    if(isset($_POST["kuld"])){
            
			$database = new database();
			
			if($_POST["kuld"]=="Ment"){
                $database->select("felhasznalok", "shibolet", "shibolet = '".$_POST['nept']."'", "");

                if($database->getResult()->num_rows == 1){
                        echo "Nope!";	
                }
                else{
                    $database->insert("felhasznalok", 
                                    "shibolet, veznev, kernev, szuletett, email", 
                                    "'".$_POST["nept"]."', 
                                    '".$_POST['vez']."', 
                                    '".$_POST['ker']."',
                                    '".$_POST['szul']."',
                                    '".$_POST['email']."'
                                    ", "");	

                        if ($database->getConn()->query($database->getSql()) === TRUE) { 
                            echo "Sikertelentelen !";
                        } 
                        else {
                            echo "Sikertelen !";
                        }
                }
            }
            else if ($_POST["kuld"]=="Keres"){
                
                $database->select("felhasznalok", "*", "shibolet = '".$_POST['nept']."'", "");
                
                if($database->getResult()->num_rows == 1){
                    
                        echo "Van ilyen felhasználó !";
                        echo'<table style="border:1px solid black"><tr><td>Neptun</td><td>Kereszt név</td><td>Vezetékes név</td>
                            <td>Születési idő</td><td>E-mail</td>';
                        
                        echo "<tr><td>" .$database->getRow()['shibolet']. 
                                "</td><td>".$database->getRow()['kernev']. 
                                "</td><td>" .$database->getRow()['veznev']. 
                                "</td><td>".$database->getRow()['szuletett'].
                                "</td><td>".$database->getRow()['email'].
                            "</td></tr></table>";                
                }           
                else{
                    echo "Nincs ilyen felhasználó !";
                }                  
            }
			else if ($_POST["kuld"]=="Kivesz"){
                
                
				$database->insert("szabadsagok", 
								"id, sznap, tipus", 
								"'1', ". 
								'"'.$_POST['date'].'", '.
								'"'.$_POST['tipus'].'"', 
                                        "");	
                                

					if ($database->getConn()->query($database->getSql()) === TRUE) { 
						echo "Grat !";
					} 
					else {
						echo "Sikertelen !";
					}
                                  
            }
    }