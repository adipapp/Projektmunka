<?php 
$user = (object) [
    'userId' => 3,
    'name' => 'Kiss Pista',
    'email' => 'kiss@sze.hu',
    'privileges' => ((object) [
        'superuser' => True,
        'biralhat' => True,
        'szabit_kiirhat' => True,
        'adatot_modosithat' => True,
        'orarend_felelos' => True,
    ]),
];
?>
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="../build/css/calendar.css">
		<link rel="shortcut icon" href="">
		<title>
			Naptár
		</title>
	</head>
	<script type="text/javascript">
		const userData = {
			user : <?php echo json_encode($user); ?>,
		};
	</script>
	<body>
		<div id="root">
			<script type="text/javascript" src="../build/main.bundle.js"></script>
		</div>
	</body>
</html>