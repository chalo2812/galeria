$(document).ready(function () {

	// Oculta barra de herramientas de las BootstrapTables cuando no hay resultados
	var $table = $('#resultados');
	$(function () {
		$table.on('post-body.bs.table', function () {
			if ($('tr').hasClass('no-records-found')) {
				$('.fixed-table-toolbar').hide();
			}
			else
			{
				$('.fixed-table-toolbar').show();
			}
		})
	});
	
	if ($('tr').hasClass('no-records-found')) {
		$('.fixed-table-toolbar').hide();
	}
	else
	{
		$('.fixed-table-toolbar').show();
	}
	
});

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function validarDocumento(tipo, numero){
	if (tipo == 0 ){//DNI
		if (numero > 100000 && numero < 89999999 ){
			return true;
		} else {
			return false;
		}
	} else if (tipo == 26){//LC
		if (numero > 92000000 && numero< 9999999){
			return true;
		}else{
			return false;
		}
	} else if (tipo == 25){//LE
		if (numero > 9999999){
			return true;
		}else{
			return false;
		}
	} else if (tipo == 31){ //DNI EXTRANJERO
		if (numero > 92000000 && numero< 95999999){
			return true;
		}else{
			return false;
		}
	}
	return false;
}

function validarDocumentoParaSAP(tipo, numero){
	if (tipo == 96 ){//DNI
		if (numero > 100000 && numero < 89999999 ){
			return true;
		} else {
			return false;
		}
	} else if (tipo == 90){//LC
		if (numero > 92000000 && numero< 9999999){
			return true;
		}else{
			return false;
		}
	} else if (tipo == 89){//LE
		if (numero > 9999999){
			return true;
		}else{
			return false;
		}
	} else if (tipo == 31){ //DNI EXTRANJERO
		if (numero > 92000000 && numero< 95999999){
			return true;
		}else{
			return false;
		}
	} else if (tipo == 94){ //PASAPORTE
		if (numero > 0){
			return true;
		}
	}
	return false;
}
