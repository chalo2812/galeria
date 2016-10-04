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

</head>
<body>
	<nav class="navbar navbar-inverse ">
		<div class="container-fluid">
    		<div class="navbar-header-inverse">
    			<a class="navbar-brand" href="">Galeria</a>
    		</div>
    		<ul class="nav navbar-nav">
    			<li class="dropdown">
        			<ul class="dropdown-menu nav navbar-nav"">
						<li class="nav navbar-nav">
							<span class="dropdown-toggle" data-toggle="dropdown" >Genero<span class="caret"></span></span>
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
				<li>
					<a data-toggle="modal" href="#myModal" data-target="#myModal">
						<span type="button" class="navbar-inverse glyphicon glyphicon-log-in" data-toggle="modal"  border="0">
							Iniciar Sesi&oacute;n
					</span>
					</a>
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

    <div class="container">
		<div class="row">
			<a class="btn btn-primary" data-toggle="modal" href="#myModal" >Login</a>
        	<div class="modal" id="myModal">
          		<div class="modal-header">
            		<button type="button" class="close" data-dismiss="modal">x</button>
            		<h3>Login to MyWebsite.com</h3>
          		</div>
          		<div class="modal-body">
            	<form method="post" action='' name="login_form">
              		<p>
              			<input type="text" class="span3" name="eid" id="email" placeholder="Email">
              		</p>
              		<p>
              			<input type="password" class="span3" name="passwd" placeholder="Password">
              		</p>
              		<p>
              			<button type="button"  class="btn btn-primary">Sign in</button>
                		<a href="#">Olvidaste la contrase&ntilde;a Password?</a>
              		</p>
            	</form>
          	</div>
	        <div class="modal-footer">
	            <a href="#" class="btn btn-secundary">Register</a>
	        </div>
        </div>
	</div>
</div>
</div>
	<footer>
		Revisi&oacute;n 
	</footer>
<script>
//Versión de la API v2.7
//Identificador de la aplicación 1655979491385081
//Clave secreta de la aplicación 4f2ce85db62967c4271adaffb49804c9
$(function() {
	$.ajax({
    	url: '//connect.facebook.net/es_ES/all.js',
    	dataType: 'script',

    	cache: true,
    	success: function() {
      
    	}
  		});
	});
</script>
		<!--script src="js/facebookSDK.js"></script-->	
	</body>
</html>
