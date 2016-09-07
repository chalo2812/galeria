function hojasDatosEmitidas(idTable, data, successCallback, errorCallback) {
	hojasDatos("emitidas", idTable, data, successCallback, errorCallback);
}
function hojasDatosEnTramite(idTable, data, successCallback, errorCallback) {
	hojasDatos("entramite", idTable, data, successCallback, errorCallback);
}

function hojasDatos(tipo, idTable, data, successCallback, errorCallback) {
	$.ajax({
    	type		: 'POST',
        url			: tipo,
        data		: data,
        dataType	: 'json',
        cache		: false,        
        success		: function(data) {
			$('#' + idTable).bootstrapTable('load', data);
			if (successCallback) successCallback();
        },
        error		: function(data) {
			console.log("error: " + data.statusText);
			if (errorCallback) errorCallback();
        }
    });
}

function accionesEmitidasFormatter(value, row, index) {
    var acciones = '<a href="javascript:void(0)" class="btn btn-xs f-right" onclick="verHojaDatos(' + row.idPrestamo + ')">Ver más</a>';
    return acciones;
}

function vendedorFormatter(value, row, index) {
    var acciones = row.datosSimulacion.vendedor.nombre + ' ' + row.datosSimulacion.vendedor.apellido;
    return acciones;
}

function dniFormatter(value, row, index) {
    var acciones = row.titular.idTipoDoocumento.descripcionCorta + ' ' + row.titular.nroDocumentoTitular;
    return acciones;
}

function clienteFormatter(value, row, index) {
    var acciones =  row.titular.nombreTitular + " " + row.titular.apellidoTitular ;
    return acciones;
}


function montoFormatter(value, row, index) {
	
//	var formatNumber = {
//			 separador: ".", // separador para los miles
//			 sepDecimal: ',', // separador para los decimales
//			 formatear:function (num){
//			 num +='';
//			 var splitStr = num.split('.');
//			 var splitLeft = splitStr[0];
//			 var splitRight = splitStr.length != 1 ? this.sepDecimal + splitStr[1] : '';
//			 var regx = /(\d+)(\d{3})/;
//			 while (regx.test(splitLeft)) {
//			 splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
//			 }
//			 return this.simbol + splitLeft +splitRight;
//			 },
//			 new:function(num, simbol){
//			 this.simbol = simbol ||'';
//			 return this.formatear(num);
//			 }
//		}
	
	var monto = formatNumber.new(row.montoCapitalPrestamo);
	
	return "$ " + monto;
}


function fechaFormatter(value, row, index) {
    var fechaIngreso = row.fechaIngreso;

    return formateoFecha(row.fechaIngreso);
}

function formateoFecha(value) {

	if (value) {
		
		var fechaFormateada = new Date(value);
		var mes = parseInt(fechaFormateada.getMonth()) +1;
		 if(mes < 10){
		        mes = '0' + mes
		    } 
		var fecha;
		
		var dia = fechaFormateada.getDate();
		if (dia < 10) {
			dia = '0' + dia;
		}
		
		fecha = fechaFormateada.getFullYear() + "-" + mes + "-" + dia;
	}
	return fecha
}

function fechaWithFormatter(value, row, index) {
    var fechaIngreso = row.fechaIngreso;

    return formateoWithFecha(row.fechaIngreso);
}

function formateoWithFecha(value) {

	if (value) {
		
		var fechaFormateada = new Date(value);
		var mes = parseInt(fechaFormateada.getMonth()) +1;
		 if(mes < 10){
		        mes = '0' + mes
		    } 
		var fecha;
		
		var dia = fechaFormateada.getDate();
		if (dia < 10) {
			dia = '0' + dia;
		}
		
		fecha = dia + "/" + mes + "/" + fechaFormateada.getFullYear() ;
	}
	return fecha
}

function formateoFechaHoy() {

	var fechaFormateada = new Date();
	var mes = parseInt(fechaFormateada.getMonth()) +1;
	 if(mes < 10){
			mes = '0' + mes
		} 
	var fecha;
	
	var dia = fechaFormateada.getDate();
	if (dia < 10) {
		dia = '0' + dia;
	}
	
	fecha = dia + "/" + mes + "/" + fechaFormateada.getFullYear();

	return fecha
}

function fechaUltimaModificacionFormatter(value, row, index) {
	var result = "";
	if ( row.fechaUltimaModificacion != null) {
		result = formateoWithFecha(row.fechaUltimaModificacion);
		
	}
	return result; 
}

function fechaUltimaModificacionFormatterEmitido(value, row, index){
	var result = "";
	if ( row.fechaUltimaModificacion != null) {
		result = formateoFecha(row.fechaUltimaModificacion);
		
	}
	return result;
}

function fechaIngresoFormatterEmitido(value, row, index){
	var result = "";
	var fechaIngreso = row.fechaIngreso;
	if ( row.fechaUltimaModificacion != null) {
		result = formateoWithFecha(row.fechaIngreso);
		
	}
	return result; 

}


function fechaIngresoFormatterEnTramite(value, row, index){
	var result = "";
	var fechaIngreso = row.fechaIngreso;
	if ( row.fechaUltimaModificacion != null) {
		result = formateoWithFecha(row.fechaIngreso);
		
	}
	return result; 

}

function clienteFormatterEmitido(value, row, index){
	return row.titular.nombreTitular + ' ' + row.titular.apellidoTitular;
}

function clienteFormatterEnTramite(value, row, index){
	return row.titular.nombreTitular + ' ' + row.titular.apellidoTitular;
}

function verHojaDatos(idPrestamo) {
	$('#idHoja').val(idPrestamo);
	$('#postHojaDatos').submit();
}


function successCallback() {
	$('#hojasDeDatos').fadeIn();
	$('#spinner-buscar').addClass('hide');
}

function errorCallback() {
	$('#hojasDeDatos').fadeIn();
	$('#spinner-buscar').addClass('hide');
}

