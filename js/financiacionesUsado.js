$(document).ready(function () {

	$('#pBalloon1').hide();
	$('#pBalloon2').hide();
	$('#pBalloon3').hide();
	
});



// igual que en 0km
function setearValoresSliderCuota(montoFinanciacion, valMap, tasas, panelSimulacion){
	$("#slider"+panelSimulacion+"-3").slider({
		min: 0,
        max: valMap.length - 1,
        step: 1,
        values: valMap[1],
        slide: function(event, ui) {
        	$("#slider"+panelSimulacion+"-3-input").val(valMap[ui.value]);
			montoFinanciacion = $("#slider"+panelSimulacion+"-2-input").val();
			cuotas = valMap[ui.value];
			interes = parseFloat(tasas[ui.value]);
			setearTotalCuotasEjemplosVariaCuota(montoFinanciacion,interes,cuotas, panelSimulacion);
			$("#cantidadCuotaSimulacion"+panelSimulacion).text(cuotas);
        }
    });	
	$("#slider"+panelSimulacion+"-3-input").val(valMap[0]);
	cuotas = valMap[0];
	interes = parseFloat(tasas[0]);
	setearTotalCuotasEjemplosVariaCuota(montoFinanciacion,interes,cuotas, panelSimulacion);
	$("#cantidadCuotaSimulacion"+panelSimulacion).text(cuotas);
	$("#slider"+panelSimulacion+"-3").slider( "option", "value", 0 );
	
	$("#duracionMinima" + panelSimulacion).text(valMap[0]);
	$("#duracionMaxima" + panelSimulacion).text(valMap[valMap.length - 1]);
}


function actualizarValorSliderCuota(montoFinanciacion, plazos, tasas, panelSimulacion){
	$("#slider"+panelSimulacion+"-3-input").val(plazos[0]);
	cuotas = plazos[0];
	interes = parseFloat(tasas[0]);
	setearTotalCuotasEjemplosVariaCuota(montoFinanciacion,interes,cuotas, panelSimulacion);
	$("#cantidadCuotaSimulacion"+panelSimulacion).text(cuotas);
//	$("#slider"+panelSimulacion+"-3").slider( "option", "value", 0 );
//	
	$("#duracionMinima" + panelSimulacion).text(plazos[0]);
	$("#duracionMaxima" + panelSimulacion).text(plazos[plazos.length - 1]);
}

function setearValoresMaximosMinimos(){
//	var valorFinal = $("#valorFinalHdd").val();
	//minimoFinanciacion = 15000;
	var minimoFinanciacion = parseFloat($("#minFinanciacion").val());
	var valorFinal = $("#precio").val();
	campaniaIdSeleccionada = $("#lineas1").val();
	plazos = $("#plazo"+campaniaIdSeleccionada).val();
	plazosArray = JSON.parse(plazos);
	tasas = $("#tasa"+campaniaIdSeleccionada).val();
	tasasArray = JSON.parse(tasas);
	var pocentajeMaximoAnticipo = parseFloat($("#porcentajeMaxFin"+campaniaIdSeleccionada).val());
	var pocentajeMinimoAnticipo = parseFloat(100) - parseFloat(pocentajeMaximoAnticipo);
	var cantidadCuotas = plazosArray[0];
	var interes = tasasArray[0];
	var maxCamp = parseInt($("#maxFin"+campaniaIdSeleccionada).val()) ;
	var maximoFinanciacion = parseFloat(maxCamp);
	var diferencia = parseInt(maximoFinanciacion)- parseInt(minimoFinanciacion);
	var maximoAnticipo = parseFloat(valorFinal) - parseFloat(minimoFinanciacion);
	var minimoAnticipo = parseInt(maximoAnticipo) - parseInt(diferencia);
	//var maximoFinanciacion = parseFloat(valorFinal) - parseFloat(minimoAnticipo);
	

	//extender para paneles 2 y 3
	generaTablaPlazosInicial(maximoFinanciacion, plazosArray, tasasArray, 1);
	generaTablaPlazosInicial(maximoFinanciacion, plazosArray, tasasArray, 2);
	generaTablaPlazosInicial(maximoFinanciacion, plazosArray, tasasArray, 3);
	
	//extender para paneles 2 y 3
	setearValoresHTMLIniciales(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 1);
	setearSlideMaximosMinimos(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 1);
	setearTotalCuotasEjemplos(maximoFinanciacion,interes, 1);
	setearTotalCuotasEjemplosVariaCuota(maximoFinanciacion,interes,cantidadCuotas, 1);
	
	setearValoresHTMLIniciales(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 2);
	setearSlideMaximosMinimos(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 2);
	setearTotalCuotasEjemplos(maximoFinanciacion,interes, 2);
	setearTotalCuotasEjemplosVariaCuota(maximoFinanciacion,interes,cantidadCuotas, 2);
	
	setearValoresHTMLIniciales(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 3);
	setearSlideMaximosMinimos(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 3);
	setearTotalCuotasEjemplos(maximoFinanciacion,interes, 3);
	setearTotalCuotasEjemplosVariaCuota(maximoFinanciacion,interes,cantidadCuotas, 3);
	
	habilitarCampanias();
}

function habilitarCampanias(){
	$('#lineas1').attr('disabled', false);
	$('#lineas2').attr('disabled', false);
	$('#lineas3').attr('disabled', false);
}

function setearTotalCuotasEjemplosVariaCuota(montoFinanciacion,interes,cantidadCuotas, panelSimulacion){
	$("#importeCuotaSimulacion" + panelSimulacion).text('$' + formatearImporte(calcularCuota(montoFinanciacion, cantidadCuotas, interes)));
	
	$("#importeSeguroVidaSimulacion" + panelSimulacion).text(formatearImporte(calcularSeguroVida(montoFinanciacion, 0.0023)));
}

// idem 0km
function setearTotalCuotasEjemplos(maximoFinanciacion,interes, panelSimulacion){
	campaniaIdSeleccionada = $("#lineas"+panelSimulacion).val();
	plazos = $("#plazo"+campaniaIdSeleccionada).val();
	plazosArray = JSON.parse(plazos);
	for (var index = 0; index < plazosArray.length; index++) {
		plazo = plazosArray[index];
		setearTotalCuotaEjemplo(maximoFinanciacion, plazo, interes, panelSimulacion);
	}
	$("#importeSeguroVidaSimulacion" + panelSimulacion).text(formatearImporte(calcularSeguroVida(maximoFinanciacion,0.0023)));
}

function setearValoresHTMLIniciales(minimoAnticipo,maximoAnticipo, minimoFinanciacion, maximoFinanciacion, cantidadCuotas, panelSimulacion){	
	$("#minimoAnticipo" + panelSimulacion).text("$" + formatNumber.new(minimoAnticipo));
	$("#maximoAnticipo" + panelSimulacion).text("$" + formatNumber.new(maximoAnticipo));
	$("#minimoFinanciacion" + panelSimulacion).text("$" + formatNumber.new(minimoFinanciacion));
	$("#maximoFinanciacion" + panelSimulacion).text("$" + formatNumber.new(maximoFinanciacion));
	$("#cantidadCuotaSimulacion" + panelSimulacion).text(cantidadCuotas);
	
}

function setearSlideMaximosMinimos(minimoAnticipo,maximoAnticipo, minimoFinanciacion, maximoFinanciacion, cantidadCuotas, panelSimulacion){
	//corregir este comportamiento, funciona en 0km
	//	$("#slider"+panelSimulacion+"-1").slider("option", "min", minimoAnticipo);
//	$("#slider"+panelSimulacion+"-1").slider("option", "max", maximoAnticipo);
//	$("#slider"+panelSimulacion+"-1").slider("values", 0, minimoAnticipo);	
	$("#slider"+panelSimulacion+"-1-input").val(minimoAnticipo);
	$("#slider"+panelSimulacion+"-2-input").val(minimoAnticipo);
	$("#slider"+panelSimulacion+"-3-input").val(minimoAnticipo);
	
//	$("#slider"+panelSimulacion+"-2").slider("option", "min", minimoFinanciacion);
//	$("#slider"+panelSimulacion+"-2").slider("option", "max", maximoFinanciacion);
//	$("#slider"+panelSimulacion+"-2").slider("values", 0, maximoFinanciacion);
	$("#slider"+panelSimulacion+"-2-input").val(maximoFinanciacion);
	
}


function deslizarSlade2(slade1, slade2, panelSimulacion){
	var minAnt = parseFloat($("#minimoAnticipo"+panelSimulacion).text().replace("$", "").replace(".", ""));
	var maxAnt = parseFloat($("#maximoAnticipo"+panelSimulacion).text().replace("$", "").replace(".", ""));
	var minFin = parseFloat($("#minimoFinanciacion"+panelSimulacion).text().replace("$", "").replace(".", ""));
	var maxFin = parseFloat($("#maximoFinanciacion"+panelSimulacion).text().replace("$", "").replace(".", ""));
	
	campaniaIdSeleccionada = $("#lineas"+panelSimulacion).val();
	tasas = $("#tasa"+campaniaIdSeleccionada).val();
	var tasasArray = JSON.parse(tasas);
	var interes = tasasArray[0];
	var valorFinal = $("#valorFinal").text();
	
	var montoSlade1 = parseFloat($("#"+slade1+"-input").val());
	var sliderId = slade1.charAt(slade1.length-1);
	if (sliderId == 1) {
		if (montoSlade1 > maxAnt) {
			montoSlade1 = maxAnt;
		}
		if (montoSlade1 < minAnt) {
			montoSlade1 = minAnt;
		}		
	}

	if (sliderId == 2) {
		if (montoSlade1 > maxFin) {
			montoSlade1 = maxFin;
		}
		if (montoSlade1 < minFin) {
			montoSlade1 = minFin;
		}	
	}

	if (sliderId == 1) {
		var movimiento = parseFloat(montoSlade1) - minAnt;
		var montoSlade2 = maxFin - movimiento;
		
		
		
	}
	else {
		var movimiento = montoSlade1 - minFin;
		var montoSlade2 = maxAnt - movimiento;
		
	}
	$("#"+slade1).slider("values", 0, montoSlade1);
	$("#"+slade2).slider("values", 0, montoSlade2);
	
	$("#"+slade1+"-input").val(montoSlade1);
	$("#"+slade2+"-input").val(montoSlade2);
	
	montoFinanciacion = parseFloat($("#slider"+panelSimulacion+"-2-input").val());
	setearTotalCuotasEjemplos(montoFinanciacion,interes, panelSimulacion)
	
	cantidadCuotas = parseInt($("#slider" + panelSimulacion + "-3-input").val());
	setearTotalCuotasEjemplosVariaCuota(montoFinanciacion,interes,cantidadCuotas, panelSimulacion);
	
	
}

function enviarSimulacionEMail(){
	ocultarMensaje('alerta');
	//$('#modalMensajes').modal('show');
	var formData = {
			anioFabricacion : $('#anioFabricacionHdd').val() ,
			apellido : $('#apellido').val(),
			codigoPostal : $('#codPostalInput').val(),
			condicionFiscal : $('#condicionFiscal').val(),
			duracionSimulacion1 : $('#slider1-3-input').val(),//Para pasar
			duracionSimulacion2 : $('#slider2-3-input').val(),
			duracionSimulacion3 : $('#slider3-3-input').val(), 
			email :  $('#email').val(),
			fechaNacimiento :  $('#fechaNacimiento').val(),
			gnc :  $('#gnc').val(),
			idCampanaSimulacion : 1,//$('#lineas1')[0].selectedIndex,
			idCampanaSimulacion2 : 1,//$('#lineas2')[0].selectedIndex,
			idCampanaSimulacion3 : 1,//$('#lineas3')[0].selectedIndex,
			idInfoAuto :  $('#idInfoAutoHdd').val(),
			idVendedor : $('#idVendedorHdd').val() ,
			idSimulacion : $("#idSimulacion").val(),
			localidad : "",
			montoAnticipoSimulacion1 : $('#slider1-1-input').val(),//Para pasar
			montoAnticipoSimulacion2 : $('#slider2-1-input').val(),//Para pasar
			montoAnticipoSimulacion3 : $('#slider3-1-input').val(),//Para pasar
			montoAsegurado : "0",//Para pasar
			montoAsegurado2 : "0",//Para pasar
			montoAsegurado3 : "0",//Para pasar
			montoFinanciacionSimulacion1 : "0",//Para pasar
			montoFinanciacionSimulacion2 : "0",//Para pasar
			montoFinanciacionSimulacion3 : "0",//Para pasar
			montoSeguroVida1 : isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")),
			montoSeguroVida2 : isNaN(parseFloat($('#importeSeguroVidaSimulacion2').text().replace(".","")))?0: parseFloat($('#importeSeguroVidaSimulacion2').text().replace(".","")),
			montoSeguroVida3 : isNaN(parseFloat($('#importeSeguroVidaSimulacion3').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion3').text().replace(".","")),
			seguroVehiculo1 : isNaN(parseFloat($('#importeSeguroAutoSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroAutoSimulacion1').text().replace(".","")),
			seguroVehiculo2 : isNaN(parseFloat($('#importeSeguroAutoSimulacion2').text().replace(".","")))?0:parseFloat($('#importeSeguroAutoSimulacion2').text().replace(".","")),
			seguroVehiculo3 : isNaN(parseFloat($('#importeSeguroAutoSimulacion3').text().replace(".","")))?0:parseFloat($('#importeSeguroAutoSimulacion3').text().replace(".","")),
			
			cuotaPrestamo1 : isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")) + parseFloat($('#importeSeguroAutoSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")) + parseFloat($('#importeSeguroAutoSimulacion1').text().replace(".","")),
			cuotaPrestamo2 : isNaN(parseFloat($('#importeSeguroVidaSimulacion2').text().replace(".","")) + parseFloat($('#importeSeguroAutoSimulacion2').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion2').text().replace(".","")) + parseFloat($('#importeSeguroAutoSimulacion2').text().replace(".","")),
			cuotaPrestamo3 : isNaN(parseFloat($('#importeSeguroVidaSimulacion3').text().replace(".","")) + parseFloat($('#importeSeguroAutoSimulacion3').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion3').text().replace(".","")) + parseFloat($('#importeSeguroAutoSimulacion3').text().replace(".","")),
			
			tna1: $('#tasa0').val(),//+idCampanaSimulacion.val()
			tna2: $('#tasa1').val(),//+idCampanaSimulacion2.val()
			tna3: $('#tasa2').val(),//+idCampanaSimulacion3.val()
			
			seguroVida1: isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")),
			seguroVida2: isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion2').text().replace(".","")),
			seguroVida3: isNaN(parseFloat($('#importeSeguroVidaSimulacion1').text().replace(".","")))?0:parseFloat($('#importeSeguroVidaSimulacion3').text().replace(".","")),
			
			porcentajeMaximoFinanciar1: $('#porcentajeMaxFin').val(),//+idCampanaSimulacion.val()
			//porcentajeMaximoFinanciar2: $('#porcentajeMaxFin1').val(),//+idCampanaSimulacion2.val()
			//porcentajeMaximoFinanciar3: $('#porcentajeMaxFin2').val(),//+idCampanaSimulacion3.val()
			
			nombre :  "",
			numDoc :  document.getElementById('numDoc').value,
			provincia : "", 
			simulacionSeleccionada : "",
			tipoDoc : document.getElementById('tipoDoc').value,
			tipoUso : "",
			totalAccesorios : "",
			totalExtras : "",
			valorFinal : "",
			valorMinimoAnticipo : ""
		};
		if (formData.idSimulacion != ""){
	        $.ajax({
	        	type        : 'POST',
	            url         : 'envioEmail',
	            data        : formData,
	            dataType    : 'json',
	            success     : function(data) {
	            	$('#modalMensajes').modal('show');
	            },
	            error       : function(data){
	            	var texto = JSON.parse(data.responseText);
	            	$('#alerta').text(texto);
					mostrarMensaje('alerta');
	            }
	        });
		} else {
			var mensaje1 = "Debe guardar la simulacion antes de generar PDF";	 	 	 
			var mensajeParrafo = '<div class="alert alert-danger"><strong></strong>'+mensaje1+'</div>'
			$('#mensajeTitle').text("Error de validacion");
			$('#modalContent').html(mensajeParrafo);
			$('#modalMensajesContratar').modal('show');
		}
}

function mostrarMensaje(mensaje) {
	$('#' + mensaje).slideDown(300);
}
function ocultarMensaje(mensaje) {
	$('#' + mensaje).slideUp(300);
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function formatearImporte(importe, simbolo){
	return formatNumber.new(parseInt(importe).toFixed(), simbolo);
}

function validarContratar(){
	var mensaje1 = "";
	if((!$("#financeForm input[name='radioSeguroCobertura']:radio").is(':checked'))) {  
		mensaje1 += " Debe seleccionar un Seguro"
	}
	mensajeParrafo = '<div class="alert alert-danger"><strong></strong>'+mensaje1+'</div>'
	$('#mensajeTitle').text("Error de validacion");
	$('#modalContent').html(mensajeParrafo);
    $('#mensajeContent').modal('show');
    return $("#financeForm input[name='radioSeguroCobertura']:radio").is(':checked');
}

function actualizarPlazos(campaniaSeleccionada, panelSimulacion){
	var maximoFinanciacion = $("#maxFin" + campaniaSeleccionada).val();
	

	
	var minimoFinanciacion = parseFloat($("#minFinanciacion").val());
	var diferencia = maximoFinanciacion - minimoFinanciacion;
	
	plazos = $("#plazo"+campaniaIdSeleccionada).val();
	plazosArray = JSON.parse(plazos);
	tasas = $("#tasa"+campaniaIdSeleccionada).val();
	tasasArray = JSON.parse(tasas);

	
	var cantidadCuotas = plazosArray[0];
	var interes = tasasArray[0];
	var valorFinalIngresado = $("#valorFinalHdd").val();
	var maximoAnticipo = parseInt(valorFinalIngresado) - parseFloat(minimoFinanciacion); 
	var minimoAnticipo = parseFloat(maximoAnticipo) - parseFloat(diferencia);


	//revisar
	plazos = $("#plazo" + campaniaSeleccionada).val();
	plazosArray = JSON.parse(plazos);
	

	//montoFinanciacion = $("#slider"+panelSimulacion+"-2-input").val();
	montoFinanciacion = maximoFinanciacion;
	generaTablaPlazos(plazosArray, tasasArray, panelSimulacion);	
	
	// reiniciar slider
	
	 $("#slider" + panelSimulacion + "-1").slider({
			min: minimoAnticipo,
	        max: maximoAnticipo,
	        step: 500,
	        values: [minimoAnticipo],
	        slide: function(event, ui) {
	        	
				campaniaIdSeleccionada = $("#lineas" + panelSimulacion).val();
	        	var valorFinal = parseInt($("#maxFin"+campaniaIdSeleccionada).val());
	        	var sliderAnticipo = ui.values[0];
	        	var desplazamientoAnticipo = parseFloat(sliderAnticipo) - parseFloat(minimoAnticipo) ;
	        	
	        	campaniaIdSeleccionada = $("#lineas" + panelSimulacion).val();
	        	//tasas = $("#tasa"+campaniaIdSeleccionada).val();
	        	//tasasArray = JSON.parse(tasas);
	        	//interes = tasasArray[0];
	        	
	        	
	        	// comienzo tasas array
				tasas = $("#tasa"+campaniaIdSeleccionada).val();
				plazos = $("#plazo"+campaniaIdSeleccionada).val();
				
				var tasasArray = JSON.parse(tasas);
				var plazosArray = JSON.parse(plazos);
				var cantidadCuotas = parseInt($("#slider" + panelSimulacion + "-3-input").val());
				
				var indice = 0;
				for (i = 0; i < plazosArray.length; i++) {
				    if (plazosArray[i] == cantidadCuotas ) {
				    	indice = i;
				    	break; 
				    }
				}

				var interes = tasasArray[i];
				// fin tasas array
	        	
				var montoFinanciacion = maximoFinanciacion - desplazamientoAnticipo ;
				$("#slider" + panelSimulacion + "-1-input").val(sliderAnticipo);
				$("#slider" + panelSimulacion + "-2-input").val(montoFinanciacion);			
				$("#slider" + panelSimulacion + "-2").slider("values", 0, montoFinanciacion );
				
				cuotas = $("#slider" + panelSimulacion + "-3-input").val();
				setearTotalCuotasEjemplos(montoFinanciacion,interes, panelSimulacion);
				setearTotalCuotasEjemplosVariaCuota(montoFinanciacion,interes,cuotas, panelSimulacion);
	        }
	    });

	    $("#slider" + panelSimulacion + "-2").slider({
			min: minimoFinanciacion,
	        max: maximoFinanciacion,
	        step: 500,
	        values: [maximoFinanciacion],
	        slide: function(event, ui) {
				campaniaIdSeleccionada = $("#lineas" + panelSimulacion).val();
	        	var valorFinal = $("#maxFin"+campaniaIdSeleccionada).val();
	        	var sliderFinanciacion = ui.values[0];
				var desplazamientoFin = parseFloat(sliderFinanciacion) -  parseFloat(minimoFinanciacion) ;
	        	
	        	campaniaIdSeleccionada = $("#lineas" + panelSimulacion).val();
	        	//tasas = $("#tasa"+campaniaIdSeleccionada).val();
	        	//tasasArray = JSON.parse(tasas);
	        	//interes = tasasArray[0];
	        	
	        	
	        	// comienzo tasas array
				tasas = $("#tasa"+campaniaIdSeleccionada).val();
				plazos = $("#plazo"+campaniaIdSeleccionada).val();
				
				var tasasArray = JSON.parse(tasas);
				var plazosArray = JSON.parse(plazos);
				var cantidadCuotas = parseInt($("#slider" + panelSimulacion + "-3-input").val());
				
				var indice = 0;
				for (i = 0; i < plazosArray.length; i++) {
				    if (plazosArray[i] == cantidadCuotas ) {
				    	indice = i;
				    	break; 
				    }
				}

				var interes = tasasArray[i];
				// fin tasas array
	        	
	        	
	        	
	        	var sliderAnticipo = + parseFloat(maximoAnticipo) - parseFloat(desplazamientoFin) ;        	
				$("#slider" + panelSimulacion + "-1-input").val(sliderAnticipo);
				$("#slider" + panelSimulacion + "-2-input").val(sliderFinanciacion);			
				$("#slider" + panelSimulacion + "-1").slider("values", 0, sliderAnticipo);
				
				setearTotalCuotasEjemplos(sliderFinanciacion,interes, panelSimulacion);
				
				cuotas = $("#slider" + panelSimulacion + "-3-input").val();
				setearTotalCuotasEjemplosVariaCuota(sliderFinanciacion,interes,cuotas, panelSimulacion);
	        }
	    });

	    setearValoresHTMLIniciales(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, panelSimulacion);
		
		setearTotalCuotasEjemplos(maximoFinanciacion,interes, panelSimulacion);
		
		setearTotalCuotasEjemplosVariaCuota(maximoFinanciacion,interes,cantidadCuotas, panelSimulacion);
		
		/* Para duracion: */
		plazos = $("#plazo"+campaniaIdSeleccionada).val();
		tasas = $("#tasa"+campaniaIdSeleccionada).val();
		var plazosArray = JSON.parse(plazos);
		var tasasArray = JSON.parse(tasas);
		setearValoresSliderCuota(maximoFinanciacion, plazosArray, tasasArray, panelSimulacion);
		
		$('#slider' + panelSimulacion + '-1-input').val(minimoAnticipo);
		$('#slider' + panelSimulacion + '-2-input').val(maximoFinanciacion);
	
}


// idem 0km
function generaTablaPlazos(plazosArray, tasasArray, panelSimulacion) {
	$("#myTableId"+panelSimulacion+" tbody").html("");
	montoFinanciacion = parseFloat($("#slider"+panelSimulacion+"-2-input").val());
	for (var index = 0; index < plazosArray.length; index++) {
		plazo = plazosArray[index];
		interes = tasasArray[index];
		$("#myTableId"+panelSimulacion+" tbody").append("<tr><td>"+plazosArray[index]+"</td><td id='financiacion"+plazosArray[index]+"-"+panelSimulacion+"'>"+"</td></tr>");		
		setearTotalCuotaEjemplo(montoFinanciacion, plazo, interes, panelSimulacion);
	}
}

// idem 0km
function generaTablaPlazosInicial(montoFinanciacion, plazosArray, tasasArray, panelSimulacion) {
	$("#myTableId"+panelSimulacion+" tbody").html("");
	for (var index = 0; index < plazosArray.length; index++) {
		plazo = plazosArray[index];
		interes = tasasArray[index];
		$("#myTableId"+panelSimulacion+" tbody").append("<tr><td>"+plazosArray[index]+"</td><td id='financiacion"+plazosArray[index]+"-"+panelSimulacion+"'>"+"</td></tr>");		
		setearTotalCuotaEjemplo(montoFinanciacion, plazo, interes, panelSimulacion);
	}
}

// idem 0km
function setearTotalCuotaEjemplo(montoFinanciacion, plazo, interes, panelSimulacion){
	$("#financiacion"+plazo+"-" + panelSimulacion).text(formatearImporte(calcularCuota(montoFinanciacion, plazo, interes), "$"));
}