<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
	<title>Galeria</title>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="shortcut icon" href="img/favicon.ico">
 	<link href="css/bootstrap.css" rel="stylesheet">
	<link href="css/datepicker.css" rel="stylesheet">
	<link href="css/galeria.css" rel="stylesheet">
	<link href="css/font-awesome.css" rel="stylesheet">
	<link href="css/bootstrap-table.css" rel="stylesheet">	
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="js/jquery.min.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<script src="http://codeorigin.jquery.com/jquery-1.10.2.min.js"></script>

</head>
<body>
	<nav class="navbar navbar-inverse ">
		<div class="container-fluid">
    		<div class="navbar-header-inverse">
    			<a class="navbar-brand" href="">Galeria</a>
    		</div>
    		<ul class="nav navbar-nav">
    			<li class="dropdown">
        			<a href="#"><img src="" alt="">Genero<span class="caret"></span></a>
        								
				</li>
				<li class="dropdown">
        			<a class="dropdown-toggle" data-toggle="dropdown" href="#">Genero<span class="caret"></span></a>
        			<ul class="dropdown-menu nav navbar-nav"">
						<li class="nav navbar-nav">
							<a class="navbar-brand" href="#">Arquitectura </a>
						</li>
					</ul>					
				</li>
				<li>
					<a href="/" >Artistas</a>	
				</li>				
				<li>	
					<a href="/" >Colecci&oacute;n</a>
				</li>
				<li>	
					<a href="/">Agenda</a>
				</li>
				<li>
					<a href="/" >Blog</a>
				</li>
				<li class="divider"></li>
				<li >
				</li>
				<li class="text-left">
					<a href="/" >
					<span class="glyphicon glyphicon-log-in"> </span> Iniciar Sesi&oacute;n</a>
				</li>
				<li class="text-left">
					<a href="/signup.php"  >
						<span class="glyphicon glyphicon-user"> </span> Registrarse
					</a>
				</li>
			</ul>
	</nav>
	<div class="container">
	<?php
		$enlace=mysql_connect('localhost:3306', 'root', '','galeria')
		or die( "Error - conexion erronea." );
 		$sql       = "SELECT * FROM galeria.usuario order by id asc";
		$resultado = mysql_query($sql, $enlace);
		if (!$resultado) {
    		echo "Error de BD, no se pudo consultar la base de datos ";
	    	echo "Error MySQL:  ". mysql_error();
	    	exit;
	    }
	    echo "<br><table class='table' >";
		while ($fila = mysql_fetch_assoc($resultado)) {
	    	echo "<tr><td align='center' class=''> ".$fila['ID']." </td><td>".$fila['NOMBRE']."</td></tr>";
		}
		echo "</table>";
		mysql_free_result($resultado);
	?>
		
	</div>
	<footer>
		Revisi&oacute;n 
	</footer>
<script>
//Versión de la API v2.7
//Identificador de la aplicación 1655979491385081
//Clave secreta de la aplicación 4f2ce85db62967c4271adaffb49804c9
//$(function() {
  //$.ajax({
   // url: '//connect.facebook.net/es_ES/all.js',
    //dataType: 'script',
    //cache: true,
    //success: function() {
      
    //}
  //});
//});
</script>
		<!--script src="js/facebookSDK.js"></script-->	
	</body>
</html>
