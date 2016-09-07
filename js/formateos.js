/**
 * 
 */

 jQuery(function($){
	
// $("[id^=fecha]").mask("99/99/9999",{placeholder:"__/__/____"});
	});

var formatNumber = {
	 separador: ".", // separador para los miles
	 sepDecimal: ',', // separador para los decimales
	 formatear:function (num){
	 num +='';
	 var splitStr = num.split('.');
	 var splitLeft = splitStr[0];
	 var splitRight = splitStr.length != 1 ? this.sepDecimal + splitStr[1] : '';
	 var regx = /(\d+)(\d{3})/;
	 while (regx.test(splitLeft)) {
	 splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
	 }
	 return this.simbol + splitLeft +splitRight;
	 },
	 new:function(num, simbol){
	 this.simbol = simbol ||'';
	 return this.formatear(num);
	 }
}

function getNum(val) {
	   if (isNaN(val) || val == undefined || val == "") {
		   val = 0;
	   }
	   return parseFloat(val).toFixed(2);
}

function optionSelectUltimosAnios(idSelect, cantidadAnios){
	var fecha = new Date();
	var anio = fecha.getFullYear();
	$('#'+idSelect).empty();
	$('#'+idSelect).append($('<option>', {
		value: '-1',
		text: 'Seleccionar...' 
	}));
	for (var i = anio; i >= anio - cantidadAnios; i--) {
		$('#'+idSelect).append($('<option>', {
			value: i,
			text: i
		}));
	}
}
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function aceptarNumerosNegativos(event, elem) {

	if ((event.which != 46 || $(elem).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
	    if (event.keyCode !== 8 && event.keyCode !== 46 && event.keyCode !== 9 && event.keyCode !== 0 && event.keyCode !== 45) { // exception
	        event.preventDefault();
	    }
	}

	var text = $(elem).val();

	if ((text.indexOf('.') != -1) && (text.substring(text.indexOf('.')).length > 6)) {
	    if (event.keyCode !== 8 && event.keyCode !== 46 && event.keyCode !== 9) { // exception
	        event.preventDefault();
	    }
	}
}

function toUpperCase(elem){
    elem.value = elem.value.toUpperCase();
}


function mostrarPdf(){
	// emiliano
	var idSimulacion = $("#idSimulacion").val();
	idSimulacion = parseInt(idSimulacion ); 

	if (idSimulacion > 0 ) {
		if (validar()){
			$('#modalMensajePDF').modal('show');
		}else{
			$('#modalMensajesContratar').modal('show');
		}
	}
	else {
		mensaje1 = "Debe guardar la simulacion antes de generar PDF";	 	 	 
		mensajeParrafo = '<div class="alert alert-danger"><strong></strong>'+mensaje1+'</div>'
		$('#mensajeTitle').text("Error de validacion");
		$('#modalContent').html(mensajeParrafo);
		$('#modalMensajesContratar').modal('show');		
		
	}

}

function mostrarPdfSeguro(){
	if (validar()){
		$('#modalMensajePDFSeguro').modal('show');
	}else{
		$('#modalMensajesContratar').modal('show');
	}
}

function validar(){
	var mensaje1 = "";
	var resultado = $("#haySeguroSeleccionado").val()!="";
	if (!resultado) 
		mensaje1 = "Debe seleccionar un Seguro";	 	 	 
	mensajeParrafo = '<div class="alert alert-danger"><strong></strong>'+mensaje1+'</div>'
	$('#mensajeTitle').text("Error de validacion");
	$('#modalContent').html(mensajeParrafo);
	$('#mensajeContent').modal('show');
	return resultado;
}

function persistirSimulaciones(){
	
	if(validar()){
		$("#montoAseguradoHdd").val($('#importeSeguroAutoSimulacion1').text());
		// $("")
		$("#montoSeguroVida1Hdd").val($('#importeSeguroVidaSimulacion1').text());
		$("#montoSeguroVida2Hdd").val($('#importeSeguroVidaSimulacion2').text());
		$("#montoSeguroVida3Hdd").val($('#importeSeguroVidaSimulacion3').text());
		$("#montoSeguroVehiculo1Hdd").val($('#importeSeguroAutoSimulacion1').text());
		$("#montoSeguroVehiculo2Hdd").val($('#importeSeguroAutoSimulacion2').text());
		$("#montoSeguroVehiculo3Hdd").val($('#importeSeguroAutoSimulacion3').text());
		$("#idCampanaSimulacionHdd").val($('#lineas1').val());
		return true;
	}else{
		return false;
	}
}

function enviarEmailSimulacion(){
	if (validar()){
		$('#modalMensajes').modal('show');
		return true;
	}else{
		$('#modalMensajesContratar').modal('show');
		return false;
	}
}

function mostrarEmailSeguro(){
	if (validar()){
		$('#modalMensajeEmailSeguro').modal('show');
	}else{
		$('#modalMensajesContratar').modal('show');
	}
}

function persistirSimulacion(){
	var doc = this;
	if (persistirSimulaciones()){
		
		var formData = {
			anioFabricacion : $('#anioFabricacionHdd').val() ,
			apellido : $('#apellido').val(),
			codigoPostal : $('#codPostalInput').val(),
			condicionFiscal : $('#condicionFiscal').val(),
			coberturaPrestamoSeleccionada : $('#coberturaPrestamoSeleccionada').val(),
			coberturaId : $('#coberturaId').val(),
			companiaAseguradoraId : $("#companiaAseguradoraId").val(),
			
			
			
//			
			coberturaAseguradoraSeleccionada : $('#coberturaAseguradoraSeleccionada').val(),
			email :  $('#email').val(),
			fechaNacimiento :  $('#fechaNacimiento').val(),
			gnc :  $('#gnc').val(),
			
			idCampanaSimulacion : $('#lineas1 option:selected').val(),
			idCampanaSimulacion2 : $('#lineas2 option:selected').val(),
			idCampanaSimulacion3 : $('#lineas3 option:selected').val(),
			idInfoAuto :  $('#idInfoAutoHdd').val(),
			idVendedor : $('#idVendedorHdd').val() ,
			localidad : $('#localidadSelect').val(),
			
			montoAnticipoSimulacion1 : $('#slider1-1-input').val(),
			montoAnticipoSimulacion2 : $('#slider2-1-input').val(),
			montoAnticipoSimulacion3 : $('#slider3-1-input').val(),
			
			montoFinanciacionSimulacion1 : $('#slider1-2-input').val() ,
			montoFinanciacionSimulacion2 : $('#slider2-2-input').val(),
			montoFinanciacionSimulacion3 : $('#slider3-2-input').val(),
			
			duracionSimulacion1 : $('#slider1-3-input').val(),// Para pasar
			duracionSimulacion2 : $('#slider2-3-input').val(),
			duracionSimulacion3 : $('#slider3-3-input').val(), 
			
			montoSeguroVehiculo1 : parseFloat($('#importeSeguroAutoSimulacion1').text().replace(".","")),
			montoSeguroVehiculo2 : parseFloat($('#importeSeguroAutoSimulacion2').text().replace(".","")),
			montoSeguroVehiculo3 : parseFloat($('#importeSeguroAutoSimulacion3').text().replace(".","")),
			
			montoAsegurado: parseFloat($('#importeSeguroAutoSimulacion1').text().replace(".","")),
			montoAsegurado2: parseFloat($('#importeSeguroAutoSimulacion2').text().replace(".","")),
			montoAsegurado3: parseFloat($('#importeSeguroAutoSimulacion3').text().replace(".","")),
			
			montoSeguroVida1 : isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")),
			montoSeguroVida2 : isNaN(parseFloat($('#importeSeguroVidaSimulacion2').text().replace(".","")))?0: parseFloat($('#importeSeguroVidaSimulacion2').text().replace(".","")),
			montoSeguroVida3 : isNaN(parseFloat($('#importeSeguroVidaSimulacion3').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion3').text().replace(".","")),
							
			tna1: $('#tasa0').val(),// +idCampanaSimulacion.val()
			tna2: $('#tasa1').val(),// +idCampanaSimulacion2.val()
			tna3: $('#tasa2').val(),// +idCampanaSimulacion3.val()
			
			seguroVida1: isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")),
			seguroVida2: isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion2').text().replace(".","")),
			seguroVida3: isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion3').text().replace(".","")),
			
			seguroVehiculo1 : verificarNumero($('#importeSeguroAutoSimulacion1').text()),
			seguroVehiculo2 : verificarNumero($('#importeSeguroAutoSimulacion2').text()),
			seguroVehiculo3 : verificarNumero($('#importeSeguroAutoSimulacion3').text()),
			
			porcentajeMaximoFinanciar1: $('#porcentajeMaxFin').val(),// +idCampanaSimulacion.val()
			// porcentajeMaximoFinanciar2:
			// $('#porcentajeMaxFin1').val(),//+idCampanaSimulacion2.val()
			// porcentajeMaximoFinanciar3:
			// $('#porcentajeMaxFin2').val(),//+idCampanaSimulacion3.val()
			cuotaPrestamo1 : $('#importeCuotaSimulacion1').text().replace(".",""),
			cuotaPrestamo2 : $('#importeCuotaSimulacion2').text().replace(".",""),
			cuotaPrestamo3 : $('#importeCuotaSimulacion3').text().replace(".",""),
			nombre :  "",
			numDoc :  document.getElementById('numDoc').value,
			provincia : "", 
			simulacionSeleccionada : "",
			tipoDoc : document.getElementById('tipoDoc').value,
			tipoUso : "",
			totalAccesorios : $("#totalAccesorios").val(),
			totalExtras : $("#totalExtras").val(),
			valorFinal : $("#valorFinal").val(),
			valorMinimoAnticipo : "",
			color : $("#color").val(),
			totalVehiculo : $("#totalVehiculo").val(),

		//	importeBalloon1 : $("#importeBalloon1"),
		//	importeBalloon2 : $("#importeBalloon2"),
		//	importeBalloon3 : $("#importeBalloon3"),
			
			idSimulacion : $("#idSimulacion").val(),
			totalOperacion : $("#totalOperacion").val(),
			estadoVehiculo : $("#estadoVehiculo").val()
			
		};
		$.ajax({
			url: 'persistirSimulacion',
		    type: 'POST',
		    data: formData,
			dataType: 'json',
	        success     : function(data) {
	        	$("#idSimulacion").val(data.idSimulacion);
	        							
	        },
			error		: function(data){ }
		});
		
	}else{
		$('#modalMensajesContratar').modal('show');
		$('#modalMensajes').modal('hide');
		return false;
	}

}

function persistirSimulacionUsado(){
	var doc = this;
	if (persistirSimulaciones()){
		var formData = {
			anioFabricacion : $('#anioFabricacionHdd').val() ,
			apellido : $('#apellido').val(),
			codigoPostal : $('#codPostalInput').val(),
			condicionFiscal : $('#condicionFiscal').val(),
			coberturaPrestamoSeleccionada : $('#coberturaPrestamoSeleccionada').val(),
			coberturaId : $('#coberturaPrestamoSeleccionada').val(),
			coberturaAseguradoraSeleccionada : $('#coberturaAseguradoraSeleccionada').val(),
			email :  $('#email').val(),
			fechaNacimiento :  $('#fechaNacimiento').val(),
			gnc :  $('#gnc').val(),
			
			idCampanaSimulacion : $('#lineas1 option:selected').val(),
			idCampanaSimulacion2 : $('#lineas2 option:selected').val(),
			idCampanaSimulacion3 : $('#lineas3 option:selected').val(),
			idInfoAuto :  $('#idInfoAutoHdd').val(),
			idVendedor : $('#idVendedorHdd').val() ,
			localidad : $('#localidadSelect').val(),
			
			montoAnticipoSimulacion1 : $('#slider1-1-input').val(),
			montoAnticipoSimulacion2 : $('#slider2-1-input').val(),
			montoAnticipoSimulacion3 : $('#slider3-1-input').val(),
			
			montoFinanciacionSimulacion1 : $('#slider1-2-input').val() ,
			montoFinanciacionSimulacion2 : $('#slider2-2-input').val(),
			montoFinanciacionSimulacion3 : $('#slider3-2-input').val(),
			
			duracionSimulacion1 : $('#slider1-3-input').val(),// Para pasar
			duracionSimulacion2 : $('#slider2-3-input').val(),
			duracionSimulacion3 : $('#slider3-3-input').val(), 
			
			montoSeguroVehiculo1 : parseFloat($('#importeSeguroAutoSimulacion1').text().replace(".","")),
			montoSeguroVehiculo2 : parseFloat($('#importeSeguroAutoSimulacion2').text().replace(".","")),
			montoSeguroVehiculo3 : parseFloat($('#importeSeguroAutoSimulacion3').text().replace(".","")),
			
			montoAsegurado: parseFloat($('#importeSeguroAutoSimulacion1').text().replace(".","")),
			montoAsegurado2: parseFloat($('#importeSeguroAutoSimulacion2').text().replace(".","")),
			montoAsegurado3: parseFloat($('#importeSeguroAutoSimulacion3').text().replace(".","")),
			
			montoSeguroVida1 : isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")),
			montoSeguroVida2 : isNaN(parseFloat($('#importeSeguroVidaSimulacion2').text().replace(".","")))?0: parseFloat($('#importeSeguroVidaSimulacion2').text().replace(".","")),
			montoSeguroVida3 : isNaN(parseFloat($('#importeSeguroVidaSimulacion3').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion3').text().replace(".","")),
							
			tna1: $('#tasa0').val(),// +idCampanaSimulacion.val()
			tna2: $('#tasa1').val(),// +idCampanaSimulacion2.val()
			tna3: $('#tasa2').val(),// +idCampanaSimulacion3.val()
			
			seguroVida1: isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")),
			seguroVida2: isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion2').text().replace(".","")),
			seguroVida3: isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion3').text().replace(".","")),
			
			seguroVehiculo1 : verificarNumero($('#importeSeguroAutoSimulacion1').text()),
			seguroVehiculo2 : verificarNumero($('#importeSeguroAutoSimulacion2').text()),
			seguroVehiculo3 : verificarNumero($('#importeSeguroAutoSimulacion3').text()),
			
			porcentajeMaximoFinanciar1: $('#porcentajeMaxFin').val(),// +idCampanaSimulacion.val()
			//porcentajeMaximoFinanciar2: $('#porcentajeMaxFin1').val(),//+idCampanaSimulacion2.val()
			//porcentajeMaximoFinanciar3: $('#porcentajeMaxFin2').val(),//+idCampanaSimulacion3.val()
			cuotaPrestamo1 : $('#importeCuotaSimulacion1').text().replace(".",""),
			cuotaPrestamo2 : $('#importeCuotaSimulacion2').text().replace(".",""),
			cuotaPrestamo3 : $('#importeCuotaSimulacion3').text().replace(".",""),
			nombre :  "",
			numDoc :  document.getElementById('numDoc').value,
			provincia : "", 
			simulacionSeleccionada : "",
			tipoDoc : document.getElementById('tipoDoc').value,
			tipoUso : "",
			totalAccesorios : $("#totalAccesoriosHdd").text(),
			totalExtras : $("#totalExtrasSpan").text().replace("$",""),
			valorFinal : $("#valorFinal").val(),
			valorVehiculo : $('#valorAuto').text(),
			totalVehiculo : $("#valorAuto").text(),
			valorMinimoAnticipo : "",
			color : $("#color").val(),
			coberturaId : $("#coberturaId").val(),
			companiaAseguradoraId : $("#companiaAseguradoraId").val(),
			totalOperacion : $("#totalOperacion").val(),
			estadoVehiculo : $("#estadoVehiculo").val()
			
		};
		$.ajax({
			url: 'persistirSimulacion',
		    type: 'POST',
		    data: formData,
			dataType: 'json',
	        success     : function(data) {
	        	$("#idSimulacion").val(data.idSimulacion);
	        },
			error		: function(data){ }
		});
		
	}else{
			$('#modalMensajesContratar').modal('show');
			$('#modalMensajes').modal('hide');
		return false;
	}

}

function aMayusculas(input) {
	input.value = input.value.toUpperCase();
}

function hayLetrasConsecutivas(valorTexto){
	  
	  var longitudTexto = valorTexto.length;
	  //var validacionConsecutivos = new RegExp(/(([0-9 ,a-z])\1?(?!\2))/gim);
	  var validacionConsecutivos = new RegExp(/(\w)\1{2,}/g);

	  var patron = valorTexto.match(validacionConsecutivos);
	  
//	  if (valorTexto.length > 2  && valorTexto.length >= patron.length + 2) {
	  if (patron != null) {
		  return false;
	  }
	  else {
		  return true;
	  }
}

function calcularCuota(prestamo, cantidadCuotas, interes){
	if (interes > 0) {
		interes = interes /12;
		interes = interes /100;
		interes = parseFloat(interes).toFixed(4);
		var base = 1 + parseFloat(interes);
		var numerador = ((prestamo*interes*(Math.pow((base), cantidadCuotas)))) ;
		var denominador = (((Math.pow((base), cantidadCuotas))-1));
		var iva = prestamo * interes * 0.21;
	}
	else {
		var base = 1 ;
		var numerador = prestamo ;
		var denominador = cantidadCuotas;
		var iva = 0;
	}
	var cuotaPura =  numerador / denominador ;

	//var seguroVida = calcularSeguroVida(prestamo, 0.0023);
	var valorTotalCuota = parseFloat(cuotaPura + iva ).toFixed();	
	return valorTotalCuota;
}

function  validarEdad(nacimiento) {
	if (nacimiento.length == 10) {
		var dia = nacimiento.substring(0,1);
		var mes = nacimiento.substring(3,4);
		var anio = nacimiento.substring(6);
		
		
		var fromNacimiento = new Date(anio, parseInt(mes) - 1, dia);
		var ahora = new Date();
		
		var mesActual = ahora.getMonth();
		var mesNacimiento = fromNacimiento.getMonth();
		
		var difDate = ahora.getFullYear() - fromNacimiento.getFullYear();
		
		if (mesNacimiento > mesActual ) {
			difDate = difDate - 1;
		}

		if (difDate > 17 && difDate < 77) {
			return true;
		}
		else {
			if (difDate > 76) {
				// verificar cantidad de cuotas para titular
				return false;
			}
			else {
				return false;
			}
		}
		
	}
	else {
		return true;
	}
	
}

function guardarSimulacion(panelSimulacion){
	var tipoOperacion = $('#formulario').val();
	if (tipoOperacion == "Okm"){
		if(validarContratar()){
			$("#montoAseguradoHdd").val($('#importeSeguroAutoSimulacion1').text());
			$("#montoAsegurado2Hdd").val($('#importeSeguroAutoSimulacion2').text());
			 $("#montoAsegurado3Hdd").val($('#importeSeguroAutoSimulacion3').text());
			 
			 $("#importeCuotaSimulacion1").val($('#importeCuotaSimulacion1').text());
			 $("#importeCuotaSimulacion2").val($('#importeCuotaSimulacion2').text());
			 $("#importeCuotaSimulacion3").val($('#importeCuotaSimulacion3').text());
			 
			 $("#cuotaPrestamo1").val($('#importeCuotaSimulacion1').text());
			 $("#cuotaPrestamo2").val($('#importeCuotaSimulacion2').text());
			 $("#cuotaPrestamo3").val($('#importeCuotaSimulacion3').text());
			 
			 $("#cuotaPrestamo1").val($('#importeCuotaSimulacion1').text());
			 $("#cuotaPrestamo2").val($('#importeCuotaSimulacion2').text());
			 $("#cuotaPrestamo3").val($('#importeCuotaSimulacion3').text());		 
			 
			 
			 $("#montoSeguroVida1Hdd").val($('#importeSeguroVidaSimulacion1').text());
			 $("#montoSeguroVida2Hdd").val($('#importeSeguroVidaSimulacion2').text());
			 $("#montoSeguroVida3Hdd").val($('#importeSeguroVidaSimulacion3').text());
			 $("#idCampanaSimulacionHdd").val($('#lineas1').val());
			 $("#idCampanaSimulacion2Hdd").val($('#lineas2').val());
			 $("#idCampanaSimulacion3Hdd").val($('#lineas3').val());
			 
			 $("#simulacionSeleccionadaHdd").val(panelSimulacion);
			 $("#financeForm" ).attr('action', 'guardarSimulacion');
			 $("#financeForm" ).submit();
		}else{
			 $('#modalMensajesContratar').modal('show');
		}	
	}else{
		if(validarContratar()){
			$("#montoAseguradoHdd").val($('#importeSeguroAutoSimulacion1').text());
			$("#montoAsegurado2Hdd").val($('#importeSeguroAutoSimulacion2').text());
			$("#montoAsegurado3Hdd").val($('#importeSeguroAutoSimulacion3').text());
		 
			$("#importeCuotaSimulacion1").val($('#importeCuotaSimulacion1').text());
			$("#importeCuotaSimulacion2").val($('#importeCuotaSimulacion2').text());
			$("#importeCuotaSimulacion3").val($('#importeCuotaSimulacion3').text());
		 
			$("#cuotaPrestamo1").val($('#importeCuotaSimulacion1').text());
			$("#cuotaPrestamo2").val($('#importeCuotaSimulacion2').text());
			$("#cuotaPrestamo3").val($('#importeCuotaSimulacion3').text());
		 
			$("#cuotaPrestamo1").val($('#importeCuotaSimulacion1').text());
			$("#cuotaPrestamo2").val($('#importeCuotaSimulacion2').text());
			$("#cuotaPrestamo3").val($('#importeCuotaSimulacion3').text());		 
		 
		 
			$("#montoSeguroVida1Hdd").val($('#importeSeguroVidaSimulacion1').text());
			$("#montoSeguroVida2Hdd").val($('#importeSeguroVidaSimulacion2').text());
			$("#montoSeguroVida3Hdd").val($('#importeSeguroVidaSimulacion3').text());
			$("#idCampanaSimulacionHdd").val($('#lineas1').val());
			$("#idCampanaSimulacion2Hdd").val($('#lineas2').val());
			$("#idCampanaSimulacion3Hdd").val($('#lineas3').val());
			
			$("#simulacionSeleccionadaHdd").val(panelSimulacion);
			$("#financeForm" ).attr('action', 'guardarSimulacion');
			$("#financeForm" ).submit();
		}else{
			$('#modalMensajesContratar').modal('show');
		}
	}
}


function calcularSeguroVida(montoFinanciacion, tasa){
	var seguroVida =  parseFloat(montoFinanciacion) * parseFloat(tasa);
	return parseFloat(seguroVida).toFixed(0);
}
function generarPresupuestoSeguro(){
	
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	var today = dd + '/' + mm + '/' + yyyy;
	
	
	var tipoD = document.getElementById('tipoDoc').value;
	
	// conversion DNI BBVA y DNI SAP
	if (tipoD == 0) {
		tipoD = 96;
	}
	else if (tipoD == 25) {
		tipoD = 89;
	}
	else if (tipoD == 26) {
		tipoD = 90;
	}
	else if (tipoD == 31) {
		tipoD = 96;
	}	
	
	var formData = {
			
			
        	
        	'direccion'		: '',
        	'nombre'		: document.getElementById('nombre').value,
        	'apellido'		: document.getElementById('apellido').value,
        	'telefono'		: document.getElementById('telefono').value,
        	'tipoDocumento'	: tipoD,
        	'localidad'		: document.getElementById('localidadSelect').value,
        	'documento' 	: document.getElementById('numDoc').value,
        	'email' 		: document.getElementById('email').value,
			'provincia' 	: document.getElementById('provinciaSelect').selectedIndex,
			'provinciaCliente' : document.getElementById('provinciaSelect').selectedIndex,
			'infoauto' 		: $("#idInfoAutoHdd").val(),
			'uso' 			: $('#tipoUso').val(),
			'anio' 			: document.getElementById('anioFabricacionHdd').value,
			'gnc' 			: document.getElementById('gnc').checked ? "SI" : "NO",
			'fechaEntrega' 	: today,
			'accesorios' 	: document.getElementById('totalAccesoriosHdd').value,
			'cp' 			: $("#codPostalInput").val(),
			'tipoIva' 		: $("#condicionFiscal").val(),
			'pais'			: 80,
			'cero' 			: isCero(document.getElementById('formulario').value)
		};
	
	$.ajax({
		url: './reporteSeguroPrendario/downloadPDF',
	    type: 'POST',
	    data: formData,
		dataType: 'json',
        success     : function(data) {
        	
        	alert('archivo');
        	window.open(data);
        },
		error		: function(data){ }
	});
	

}

// generar presupuesto
function generarPresupuesto(id){
	var doc = this;
	var idSimulacion = $("#idSimulacion").val();
	idSimulacion = parseInt(idSimulacion ); 
	if (idSimulacion > 0) {
		 
		 
		window.open("/pvendedor/generarPresupuesto?id="+idSimulacion,'_blank');						
	}
	else {
		mensaje1 = "Debe guardar la simulacion antes de generar PDF";	 	 	 
		mensajeParrafo = '<div class="alert alert-danger"><strong></strong>'+mensaje1+'</div>'
		$('#mensajeTitle').text("Error de validacion");
		$('#modalContent').html(mensajeParrafo);
		$('#mensajeContent').modal('show');
	}
	
}

function mostrarMensaje(mensaje) {
	$('#mensajes').modal('show');
	$('#' + mensaje).slideDown(300);
}

function ocultarMensaje(mensaje) {
	$('#' + mensaje).slideUp(300);
	$('#mensajes').modal('hide');
}


function verificarNumero(num) {
	num = num.replace(".", "");
	num = num.replace("$", "");
	// num = num.replace(",", ".");
	num = (isNaN(parseFloat(num.replace(".","")))?0:parseFloat(num.replace(".","")));
	return num;
}

function blanqueoNumDoc(inputName) {
	document.getElementById(inputName).value = "";
}

function validarNumDoc(value, comboTipoDoc) {
	var tipoDoc = document.getElementById(comboTipoDoc).value;
										
	if (parseInt(tipoDoc) == 25 || parseInt(tipoDoc) == 26) {
		if (parseInt(value) > 9999999 || parseInt(value) < 999999) {
			return false
		}
		else {
			return true;
		}
	}
	else {
		if (parseInt(tipoDoc) != 25 && parseInt(tipoDoc) != 26) {
			if (parseInt(value) > 99999999) {
				return false;
			} else if (parseInt(value) < 1000000) {
				return false;
			} else if (parseInt(tipoDoc) == 0) {
				if (parseInt(value) > 92000000) {
		
					return false;
				} else {
					return true;
				}
			} else if (parseInt(tipoDoc) != 0) {
				if (parseInt(value) < 92000000) {
					return false;
		
				} else {
					return true;
				}
		
			} else {
				return true;
			}
		}
		else {
			return true;
		}
	
	}
	
}