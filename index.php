<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
	<title>Galeria</title>
</head>
<body class='main-menu'>
	<link rel="shortcut icon" href="img/favicon.ico">
 	<link href="css/bootstrap.css" rel="stylesheet">
	<link href="css/datepicker.css" rel="stylesheet">
	<link href="css/galeria.css" rel="stylesheet">
	<link href="css/font-awesome.css" rel="stylesheet">
	<link href="css/bootstrap-table.css" rel="stylesheet">
	
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<script src="http://codeorigin.jquery.com/jquery-1.10.2.min.js"></script>
	
	<ul class="nav nav-pills">
		<li role="presentation">
			<a href="/" class="dropdown-toggle" data-toggle="dropdown" href="#" 	role="button" aria-haspopup="true" aria-expanded="false">
				Genero <span class="caret"></span>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
					<li class="nav nav-pills"> <a href="#">Arquitectura </a></li>
				</ul>
			</a>
		</li>
		<li >	
			<a href="/" title="Titulo">
				Artistas
			</a>
		</li>
		<li >	
			<a href="/" title="Titulo">
				Colecci&oacute;n
			</a>
		</li>
		<li >	
			<a href="/" title="Titulo">
				Agenda
			</a>
		</li>
		<li >
			<a href="/" title="Titulo">
				Blog
			</a>
		</li>
		<li >
			<a href="/" title="Titulo">
				Iniciar Sesi&oacute;n
			</a>
		</li>
		<li >
			<a href="/" title="Titulo">
				Registrarse
			</a>
		</li>
		<li >
			<a href="/" title="Titulo">Titulo</a></li>				
		<a href="/" title="Titulo" class="" >
			<img src="/img/logo.png" alt="" style="">
		</a>
	</ul>
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
