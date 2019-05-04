<?php 
$user = (object) [
    'userId' => 3,
    'name' => 'Kiss Pista',
	'email' => 'kiss@sze.hu',
	'inactive' => False,
    'privileges' => ((object) [
        'superuser' => False,
        'biralhat' => TRUE,
        'szabit_kiirhat' => False,
        'adatot_modosithat' => False,
        'orarend_felelos' => False,
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
			<script type="text/javascript" src="../build/calendar.bundle.js"></script>
		</div>
	</body>
</html>