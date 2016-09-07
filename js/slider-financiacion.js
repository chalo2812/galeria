$(document).ready(function () {

	/* -- Popover --*/
	$('[data-toggle="popover"]').popover();

	/* -- Tooltip --*/
	$('[data-toggle="tooltip"]').tooltip();
	
	$('#sandbox-container input').datepicker({
		language: "es"
	});

	anticipo1 = $("#slider1-1-input").val();
	anticipo2 = $("#slider2-1-input").val();
	anticipo3 = $("#slider3-1-input").val();
	
	financiado1 = $("#slider1-2-input").val();
	financiado2 = $("#slider2-2-input").val();
	financiado3 = $("#slider3-2-input").val();
	
	duracionPrestamo1 = $("#slider1-3-input").val();
	duracionPrestamo2 = $("#slider2-3-input").val();
	duracionPrestamo3 = $("#slider3-3-input").val();
	
	campaniaSeleccionada = $("#lineas1").val();

	
	plazos = $("#plazo"+campaniaSeleccionada).val();
	plazosArray = JSON.parse(plazos);
	tasas = $("#tasa"+campaniaSeleccionada).val();
	tasasArray = JSON.parse(tasas);
	
	var valorFinalIngresado = $("#valorFinalHdd").val();
	var valorFinal = $("#valorFinal").text();
	
	
	
	var minimoFinanciacion = parseFloat($("#minFinanciacion").val());
	var valorFinal = parseInt($("#maxFin"+campaniaSeleccionada).val()) ;
	var maximoFinanciacion = parseFloat(valorFinal).toFixed();
	var diferencia = maximoFinanciacion - minimoFinanciacion;
	var cantidadCuotas = plazosArray[plazosArray.length - 1];
	var interes = tasasArray[plazosArray.length - 1];
	var maximoAnticipo = parseInt(valorFinalIngresado) - minimoFinanciacion; 
	var minimoAnticipo = parseFloat(maximoAnticipo) - parseFloat(diferencia);
	
	tasaBal = parseFloat($('#tasaBal'+ campaniaSeleccionada).val());
	
	
    $("#slider1-1").slider({
		
    	min: minimoAnticipo,
        max: maximoAnticipo,
        step: 500,
        values: [minimoAnticipo],
        slide: function(event, ui) {
        	
        	iniciarSlider('1', '1', ui.values[0], minimoFinanciacion, maximoAnticipo );
			
        }
    });

    $("#slider1-2").slider({
		min: minimoFinanciacion,
        max: maximoFinanciacion,
        step: 500,
        values: [maximoFinanciacion],
        slide: function(event, ui) {
        	iniciarSlider('1', '2', ui.values[0], minimoFinanciacion, maximoAnticipo );
        }
    });

	$("#slider2-1").slider({
		min: minimoAnticipo,
        max: maximoAnticipo,
        step: 500,
        values: [minimoAnticipo],
        slide: function(event, ui) {
        	
			iniciarSlider('2', '1', ui.values[0], minimoFinanciacion, maximoAnticipo );
			
        }
    });
	
	$("#slider2-2").slider({
		min: minimoFinanciacion,
        max: maximoFinanciacion,
        step: 500,
        values: [maximoFinanciacion],
        slide: function(event, ui) {
        	iniciarSlider('2', '2', ui.values[0], minimoFinanciacion, maximoAnticipo );

			
        }
    });
	
	$("#slider3-1").slider({
		min: minimoAnticipo,
        max: maximoAnticipo,
        step: 500,
        values: [minimoAnticipo],
        slide: function(event, ui) {
        	
			iniciarSlider('3', '1', ui.values[0], minimoFinanciacion, maximoAnticipo );
						
        }
        
    });
	
	$("#slider3-2").slider({
		min: minimoFinanciacion,
        max: maximoFinanciacion,
        step: 500,
        values: [maximoFinanciacion],
        slide: function(event, ui) {
        	iniciarSlider('3','2', ui.values[0], minimoFinanciacion, maximoAnticipo );
			
        }
    });
	
	docHeight = $(document).height();
	windowsHeight = $(window).height();

	if (windowsHeight < docHeight) {
		//$("#footer").addClass("footer-login");
		$("#footer").css('position','relative');
	}
	else
	{
		//$("#footer").removeClass("footer-login");
		$("#footer").addClass('footer-login');
	};
	setearValoresHTMLIniciales(minimoAnticipo, maximoAnticipo, minimoFinanciacion, maximoFinanciacion, cantidadCuotas, 1);
	setearValoresHTMLIniciales(minimoAnticipo, maximoAnticipo, minimoFinanciacion, maximoFinanciacion, cantidadCuotas, 2);
	setearValoresHTMLIniciales(minimoAnticipo, maximoAnticipo, minimoFinanciacion, maximoFinanciacion, cantidadCuotas, 3);
	
	setearTotalCuotasEjemplos(maximoFinanciacion,interes,1,0);
	setearTotalCuotasEjemplos(maximoFinanciacion,interes,2,0);
	setearTotalCuotasEjemplos(maximoFinanciacion,interes,3,0);
	
	escribirCuotaConSeguro(maximoFinanciacion,interes,cantidadCuotas, 1, 0);
	escribirCuotaConSeguro(maximoFinanciacion,interes,cantidadCuotas, 2, 0);
	escribirCuotaConSeguro(maximoFinanciacion,interes,cantidadCuotas, 3, 0);
	
	/* Para duracion: */
	plazos = $("#plazo"+campaniaSeleccionada).val();
	tasas = $("#tasa"+campaniaSeleccionada).val();
	var plazosArray = JSON.parse(plazos);
	var tasasArray = JSON.parse(tasas);
	setearValoresSliderCuota(maximoFinanciacion, plazosArray, tasasArray, 1 ,0);
	setearValoresSliderCuota(maximoFinanciacion, plazosArray, tasasArray, 2, 0);
	setearValoresSliderCuota(maximoFinanciacion, plazosArray, tasasArray, 3, 0);

	


	if (anticipo1 > 0) {
		
		$('#slider1-1-input').val(anticipo1);
		$('#slider1-2-input').val(financiado1);
		$('#slider1-3-input').val(duracionPrestamo1);
		
		$('#slider2-1-input').val(anticipo2);
		$('#slider2-2-input').val(financiado2);
		$('#slider2-3-input').val(duracionPrestamo2);
		
		$('#slider3-1-input').val(anticipo3);
		$('#slider3-2-input').val(financiado3);
		$('#slider3-3-input').val(duracionPrestamo3);

		

	}
	else {
		$('#slider1-1-input').val(minimoAnticipo);
		$('#slider1-2-input').val(maximoFinanciacion);
		
		$('#slider2-1-input').val(minimoAnticipo);
		$('#slider2-2-input').val(maximoFinanciacion);
		
		$('#slider3-1-input').val(minimoAnticipo);
		$('#slider3-2-input').val(maximoFinanciacion);
		
	}
	
	
	
	
	
});

function iniciarSlider(columna, sliderId, valor, minimoFinanciacion, maximoAnticipo ) {

	campaniaSeleccionada = $("#lineas" + columna).val();
	var valorFinal = $("#maxFin"+campaniaSeleccionada).val();
	var sliderFinanciacion = valor;
	var desplazamientoFin = parseFloat(sliderFinanciacion) -  parseFloat(minimoFinanciacion) ;
	
	campaniaSeleccionada = $("#lineas" + columna).val();

	// comienzo tasas array
	tasas = $("#tasa"+campaniaSeleccionada).val();
	plazos = $("#plazo"+campaniaSeleccionada).val();
	
	var tasasArray = JSON.parse(tasas);
	var plazosArray = JSON.parse(plazos);
	var cantidadCuotas = parseInt($("#slider" + columna + "-3-input").val());
	
	var indice = 0;
	for (i = 0; i < plazosArray.length; i++) {
	    if (plazosArray[i] == cantidadCuotas ) {
	    	indice = i;
	    	break; 
	    }
	}

	var interes = tasasArray[i];
	
	
	var sliderAnticipo = + parseFloat(maximoAnticipo) - parseFloat(desplazamientoFin) ;        	
	$("#slider" + columna + "-1-input").val(sliderAnticipo);
	$("#slider" + columna + "-2-input").val(sliderFinanciacion);			
	$("#slider" + columna + "-1").slider("values", 0, sliderAnticipo);
	
	setearTotalCuotasEjemplos(sliderFinanciacion,interes, 1, 0);
	
	cuotas = $("#slider" + columna + "-3-input").val();
	escribirCuotaConSeguro(sliderFinanciacion,interes,cuotas, columna, 0);
	
}

function calcularCuotaBalloon(campaniaSeleccionada, panelSimulacion, montoFinanciacion) {
	// balloon
	tasaBal = parseFloat($('#tasaBal'+ campaniaSeleccionada).val());
	if (tasaBal > 0) {
		$('#pBalloon'+ panelSimulacion).show();
		var porcenFl = parseFloat($('#porcenUltimaBal'+ campaniaSeleccionada).val());
		var coutaBal = parseInt(montoFinanciacion) * porcenFl/100;
		$('#importeBalloon'+ panelSimulacion).text('$' + formatNumber.new(parseInt(coutaBal)));
	}
	else {
		$('#pBalloon'+ panelSimulacion).hide();
	}
}




function actualizarPlazos(campaniaSeleccionada, panelSimulacion){
	var maximoFinanciacion = $("#maxFin" + campaniaSeleccionada).val();
	
	var minimoFinanciacion = parseFloat($("#minFinanciacion").val());
	var diferencia = maximoFinanciacion - minimoFinanciacion;
	
	plazos = $("#plazo"+campaniaSeleccionada).val();
	plazosArray = JSON.parse(plazos);
	tasas = $("#tasa"+campaniaSeleccionada).val();
	tasasArray = JSON.parse(tasas);

	
	var cantidadCuotas = plazosArray[0];
	var interes = tasasArray[0];
	var valorFinalIngresado = $("#valorFinalHdd").val();
	var maximoAnticipo = parseInt(valorFinalIngresado) - parseFloat(minimoFinanciacion); 
	var minimoAnticipo = parseFloat(maximoAnticipo) - parseFloat(diferencia);

	
	// tasa baloon = 0 => frances
	// tasa baloon !=' => baloon
	tasaBal = parseFloat($('#tasaBal'+ campaniaSeleccionada).val());
	if (tasaBal > 0) {
		$('#pBalloon'+ panelSimulacion).show();
		var porcenFl = parseFloat($('#porcenUltimaBal'+ campaniaSeleccionada).val());
		var coutaBal = parseInt(maximoFinanciacion) * porcenFl/100;
		$('#importeBalloon'+ panelSimulacion).text('$' + formatNumber.new(parseInt(coutaBal)));
	}
	else {
		$('#pBalloon'+ panelSimulacion).hide();
	}

	montoFinanciacion = maximoFinanciacion;
	generaTablaPlazos(plazosArray, tasasArray, panelSimulacion);
	
	setearValoresSliderCuota(maximoFinanciacion, plazosArray, tasasArray, panelSimulacion, tasaBal);

	var cuotaBal = 0;
	if (tasaBal > 0) {
		
		cuota = calcularCuota(montoFinanciacion - coutaBal, cantidadCuotas, tasaBal);
		
		var cuotas = parseInt($("#cantidadCuotaSimulacion"+panelSimulacion).text())-1;
		$("#cantidadCuotaSimulacion"+panelSimulacion).text(cuotas);	
		
		interes = tasaBal;
		var porcenFl = parseFloat($('#porcenUltimaBal'+ campaniaSeleccionada).val());
		coutaBal = parseInt(maximoFinanciacion) * porcenFl/100;
		//montoFinanciacion = maximoFinanciacion - coutaBal;
		
	}
	
	
	 $("#slider" + panelSimulacion + "-1").slider({
			min: minimoAnticipo,
	        max: maximoAnticipo,
	        step: 500,
	        values: [minimoAnticipo],
	        slide: function(event, ui) {
	        	
	        	//campaniaSeleccionada = $("#lineas" + panelSimulacion).val();
	        	var valorFinal = parseInt($("#maxFin"+campaniaSeleccionada).val());
	        	var sliderAnticipo = ui.values[0];
	        	var desplazamientoAnticipo = parseFloat(sliderAnticipo) - parseFloat(minimoAnticipo) ;
	        	
	        	// comienzo tasas array
				tasas = $("#tasa"+campaniaSeleccionada).val();
				plazos = $("#plazo"+campaniaSeleccionada).val();
				
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

				var montoFinanciacion = maximoFinanciacion - desplazamientoAnticipo ;
				var interes = tasasArray[i];
				
				
				if (tasaBal > 0) {
					interes = tasaBal;
					var porcenFl = parseFloat($('#porcenUltimaBal'+ campaniaSeleccionada).val());
					cuotaBal = parseInt(montoFinanciacion) * porcenFl/100;
					//montoFinanciacion = maximoFinanciacion - desplazamientoAnticipo;					
				}
				// fin tasas array
	        	
				$("#slider" + panelSimulacion + "-1-input").val(sliderAnticipo);
				$("#slider" + panelSimulacion + "-2-input").val(parseInt(montoFinanciacion));			
				$("#slider" + panelSimulacion + "-2").slider("values", 0, montoFinanciacion );
				
				cuotas = $("#slider" + panelSimulacion + "-3-input").val();

				setearTotalCuotasEjemplos(montoFinanciacion, interes, panelSimulacion, tasaBal);
				
				escribirCuotaConSeguro(montoFinanciacion, interes, cuotas, panelSimulacion, cuotaBal);
	        }
	    });

	    $("#slider" + panelSimulacion + "-2").slider({
			min: minimoFinanciacion,
	        max: maximoFinanciacion,
	        step: 500,
	        values: [maximoFinanciacion],
	        slide: function(event, ui) {
				campaniaSeleccionada = $("#lineas" + panelSimulacion).val();
	        	var valorFinal = $("#maxFin"+campaniaSeleccionada).val();
	        	var sliderFinanciacion = ui.values[0];
				var desplazamientoFin = parseFloat(sliderFinanciacion) -  parseFloat(minimoFinanciacion) ;
				
				
	        	campaniaSeleccionada = $("#lineas" + panelSimulacion).val();
	        	//tasas = $("#tasa"+campaniaSeleccionada).val();
	        	//tasasArray = JSON.parse(tasas);
	        	//interes = tasasArray[0];
	        	
	        	
	        	// comienzo tasas array
				tasas = $("#tasa"+campaniaSeleccionada).val();
				plazos = $("#plazo"+campaniaSeleccionada).val();
				
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
				var sliderAnticipo = + parseFloat(maximoAnticipo) - parseFloat(desplazamientoFin) ;        	
				$("#slider" + panelSimulacion + "-1-input").val(sliderAnticipo);
				$("#slider" + panelSimulacion + "-2-input").val(parseInt(sliderFinanciacion));			
				$("#slider" + panelSimulacion + "-1").slider("values", 0, sliderAnticipo);
				
				if (tasaBal > 0) {
					interes = tasaBal;
					var porcenFl = parseFloat($('#porcenUltimaBal'+ campaniaSeleccionada).val());
					cuotaBal = parseInt(sliderFinanciacion) * porcenFl/100;
					
				}
				
				setearTotalCuotasEjemplos(sliderFinanciacion, interes, panelSimulacion, tasaBal);
				
				cuotas = $("#slider" + panelSimulacion + "-3-input").val();
				escribirCuotaConSeguro(sliderFinanciacion, interes, cuotas, panelSimulacion, cuotaBal);
	        }
	    });

	    setearValoresHTMLIniciales(minimoAnticipo, maximoAnticipo, minimoFinanciacion, maximoFinanciacion, cantidadCuotas, panelSimulacion);
		
		setearTotalCuotasEjemplos(maximoFinanciacion, interes, panelSimulacion, tasaBal);
		
		escribirCuotaConSeguro(maximoFinanciacion, interes, cantidadCuotas, panelSimulacion, cuotaBal);
		
		/* Para duracion: */
		plazos = $("#plazo"+campaniaSeleccionada).val();
		tasas = $("#tasa"+campaniaSeleccionada).val();
		var plazosArray = JSON.parse(plazos);
		var tasasArray = JSON.parse(tasas);
		setearValoresSliderCuota(maximoFinanciacion, plazosArray, tasasArray, panelSimulacion, tasaBal);
		
		$('#slider' + panelSimulacion + '-1-input').val(minimoAnticipo);
		$('#slider' + panelSimulacion + '-2-input').val(parseInt(maximoFinanciacion));
	
}



// comunes

//igual que en 0km
function setearValoresSliderCuota(montoFinanciacion, valMap, tasas, panelSimulacion, tasaBal){
	var campaniaSeleccionada = $("#lineas"+panelSimulacion).val();
	
	var cuotaBal = 0;
	if (tasaBal > 0) {
		interes = tasaBal;
		var porcenFl = parseFloat($('#porcenUltimaBal'+ campaniaSeleccionada).val());
		cuotaBal = parseInt(montoFinanciacion) * porcenFl/100;
		
	}
	
	$("#slider"+panelSimulacion+"-3").slider({
		min: 0,
      max: valMap.length - 1,
      step: 1,
      values: valMap[1],
      slide: function(event, ui) {
      	$("#slider"+panelSimulacion+"-3-input").val(valMap[ui.value]);
			montoFinanciacion = $("#slider"+panelSimulacion+"-2-input").val();
			cuotas = valMap[ui.value];
			// comienzo tasas array
			
			tasas = $("#tasa"+campaniaSeleccionada).val();
			plazos = $("#plazo"+campaniaSeleccionada).val();
			
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


			escribirCuotaConSeguro(montoFinanciacion - cuotaBal, interes, cuotas, panelSimulacion, cuotaBal);
			$("#cantidadCuotaSimulacion"+panelSimulacion).text(parseInt(cuotas));
      }
  });	
	$("#slider"+panelSimulacion+"-3-input").val(valMap[0]);
	
	// comienzo tasas array
	tasas = $("#tasa"+campaniaSeleccionada).val();
	plazos = $("#plazo"+campaniaSeleccionada).val();
	
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
	escribirCuotaConSeguro(montoFinanciacion, interes, cantidadCuotas, panelSimulacion, cuotaBal);
	if (tasaBal > 0) {
		cantidadCuotas = parseInt(cantidadCuotas) - 1;
	}
	$("#cantidadCuotaSimulacion"+panelSimulacion).text(cantidadCuotas);
	$("#slider"+panelSimulacion+"-3").slider( "option", "value", 0 );
	
	$("#duracionMinima" + panelSimulacion).text(valMap[0]);
	$("#duracionMaxima" + panelSimulacion).text(valMap[valMap.length - 1]);

	
}


function escribirCuotaConSeguro(montoFinanciacion, interes, cantidadCuotas, panelSimulacion, ultimaCuotaBal){
	$("#importeSeguroVidaSimulacion" + panelSimulacion).text(formatearImporte(calcularSeguroVida(montoFinanciacion, 0.0023)));
	campaniaSeleccionada = $("#lineas"+panelSimulacion).val();
	calcularCuotaBalloon(campaniaSeleccionada, panelSimulacion, montoFinanciacion);
	
	
	if (ultimaCuotaBal > 0) {
		montoFinanciacion = montoFinanciacion - ultimaCuotaBal;
		cantidadCuotas = cantidadCuotas - 1; 
	}
	
	var cuota = calcularCuota(montoFinanciacion, cantidadCuotas, interes);
	
	if (ultimaCuotaBal > 0) {
		cuota = parseInt(cuota) + parseInt((ultimaCuotaBal * 1.21 * (interes/1200)));
		// sumar iva de cuota balloon
		var iva = montoFinanciacion / 2* interes/1200 * 0.21;
		
		cuota = cuota + iva;
	}
	
	
	$("#importeCuotaSimulacion" + panelSimulacion).text(formatearImporte(cuota));
	
	
}

function setearTotalCuotasEjemplos(maximoFinanciacion,interes, panelSimulacion, tasaBal){
	campaniaSeleccionada = $("#lineas"+panelSimulacion).val();
	plazos = $("#plazo"+campaniaSeleccionada).val();
	plazosArray = JSON.parse(plazos);
	
	tasas = $("#tasa"+campaniaSeleccionada).val();
	tasasArray = JSON.parse(tasas);
	
	
	for (var index = 0; index < plazosArray.length; index++) {
		plazo = plazosArray[index];
		tasa = tasasArray[index]
		//setearTotalCuotaEjemplo(maximoFinanciacion, plazo, tasa, panelSimulacion);
		if (tasaBal > 0 ){
			interes = tasaBal; 
			maximoFinanciacion = maximoFinanciacion;
		}
	
		$("#financiacion"+plazo+"-" + panelSimulacion).text(formatearImporte(calcularCuota(maximoFinanciacion, plazo, interes), "$"));
	}
	$("#importeSeguroVidaSimulacion" + panelSimulacion).text(formatearImporte(calcularSeguroVida(maximoFinanciacion,0.0023)));
}

//idem 0km
function generaTablaPlazosInicial(montoFinanciacion, plazosArray, tasasArray, panelSimulacion) {
	$("#myTableId"+panelSimulacion+" tbody").html("");
	for (var index = 0; index < plazosArray.length; index++) {
		plazo = plazosArray[index];
		interes = tasasArray[index];
		$("#myTableId"+panelSimulacion+" tbody").append("<tr><td>"+plazosArray[index]+"</td><td id='financiacion"+plazosArray[index]+"-"+panelSimulacion+"'>"+"</td></tr>");		
		//setearTotalCuotaEjemplo(montoFinanciacion, plazo, interes, panelSimulacion);
		$("#financiacion"+plazo+"-" + panelSimulacion).text(formatearImporte(calcularCuota(montoFinanciacion, plazo, interes), "$"));
	}
}

//idem 0km
//function setearTotalCuotaEjemplo(montoFinanciacion, plazo, interes, panelSimulacion){
	
//}


//idem 0km
function generaTablaPlazos(plazosArray, tasasArray, panelSimulacion) {
	$("#myTableId"+panelSimulacion+" tbody").html("");
	montoFinanciacion = parseFloat($("#slider"+panelSimulacion+"-2-input").val());
	for (var index = 0; index < plazosArray.length; index++) {
		plazo = plazosArray[index];
		interes = tasasArray[index];
		$("#myTableId"+panelSimulacion+" tbody").append("<tr><td>"+plazosArray[index]+"</td><td id='financiacion"+plazosArray[index]+"-"+panelSimulacion+"'>"+"</td></tr>");		
		//setearTotalCuotaEjemplo(montoFinanciacion, plazo, interes, panelSimulacion);
		$("#financiacion"+plazo+"-" + panelSimulacion).text(formatearImporte(calcularCuota(montoFinanciacion, plazo, interes), "$"));
	}
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


function enviarSimulacionEMail(){
	ocultarMensaje('alerta');
	var idSimulacion = $("#idSimulacion").val();
	if (idSimulacion > 0) {
		
		if(enviarEmailSimulacion()){
			$('#modalMensajes').modal('show');
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
					idSimulacion : $("#idSimulacion").val(),
					idCampanaSimulacion : 1,//$('#lineas1')[0].selectedIndex,
					idCampanaSimulacion2 : 1,//$('#lineas2')[0].selectedIndex,
					idCampanaSimulacion3 : 1,//$('#lineas3')[0].selectedIndex,
					idInfoAuto :  $('#idInfoAutoHdd').val(),
					idVendedor : $('#idVendedorHdd').val() ,
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
		}
	}
	else {
		mensaje1 = "Debe guardar la simulacion antes de enviar por e-mail";	 	 	 
		mensajeParrafo = '<div class="alert alert-danger"><strong></strong>'+mensaje1+'</div>'
		$('#mensajeTitle').text("Error de validacion");
		$('#modalContent').html(mensajeParrafo);
		$('#mensajeContent').modal('show');
		$('#modalMensajesContratar').modal('show');
	}
	
}

function formatearImporte(importe, simbolo){
	return formatNumber.new(parseInt(importe).toFixed(), simbolo);
}


function deslizarSlade2(slade1, slade2, panelSimulacion){
	var minAnt = parseFloat($("#minimoAnticipo"+panelSimulacion).text().replace("$", "").replace(".", ""));
	var maxAnt = parseFloat($("#maximoAnticipo"+panelSimulacion).text().replace("$", "").replace(".", ""));
	var minFin = parseFloat($("#minimoFinanciacion"+panelSimulacion).text().replace("$", "").replace(".", ""));
	var maxFin = parseFloat($("#maximoFinanciacion"+panelSimulacion).text().replace("$", "").replace(".", ""));
	
	campaniaSeleccionada = $("#lineas"+panelSimulacion).val();
	tasas = $("#tasa"+campaniaSeleccionada).val();
	plazos = $("#plazo"+campaniaSeleccionada).val();
	
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
	
	tasaBal = parseFloat($('#tasaBal'+ campaniaSeleccionada).val());
	
	var porcenFl = parseFloat($('#porcenUltimaBal'+ campaniaSeleccionada).val());
	
	var montoFinanciacion = $('#slider'+ panelSimulacion + '-2-input').val();
	var cuotaBal = parseInt(montoFinanciacion) * porcenFl/100;

	var interes = tasasArray[i];
	

	
	//var valorFinal = $("#valorFinal").text();
	var valorFinal = $("#maxFin"+campaniaSeleccionada).val();
	
	
	
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
	setearTotalCuotasEjemplos(montoFinanciacion, interes, panelSimulacion, tasaBal)
	
	if (tasaBal > 0 ) {
		interes = tasaBal;
		cantidadCuotas = cantidadCuotas - 1;
	}
	
	escribirCuotaConSeguro(montoFinanciacion, interes, cantidadCuotas, panelSimulacion, cuotaBal);
	
	calcularCuotaBalloon(campaniaSeleccionada, panelSimulacion, montoFinanciacion);
	
}





function setearSlideMaximosMinimos(minimoAnticipo,maximoAnticipo, minimoFinanciacion, maximoFinanciacion, cantidadCuotas, panelSimulacion){
	$("#slider"+panelSimulacion+"-1").slider("option", "min", minimoAnticipo);
	$("#slider"+panelSimulacion+"-1").slider("option", "max", maximoAnticipo);
	$("#slider"+panelSimulacion+"-1").slider("values", 0, minimoAnticipo);	
	$("#slider"+panelSimulacion+"-1-input").val(minimoAnticipo);
	
	$("#slider"+panelSimulacion+"-2").slider("option", "min", minimoFinanciacion);
	$("#slider"+panelSimulacion+"-2").slider("option", "max", maximoFinanciacion);
	$("#slider"+panelSimulacion+"-2").slider("values", 0, maximoFinanciacion);
	$("#slider"+panelSimulacion+"-2-input").val(maximoFinanciacion);
	
}


function setearValoresHTMLIniciales(minimoAnticipo,maximoAnticipo, minimoFinanciacion, maximoFinanciacion, cantidadCuotas, panelSimulacion){	
	$("#minimoAnticipo" + panelSimulacion).text("$ " + formatearImporte(minimoAnticipo));
	$("#maximoAnticipo" + panelSimulacion).text("$ " + formatearImporte(maximoAnticipo));
	$("#minimoFinanciacion" + panelSimulacion).text("$ " + formatearImporte(minimoFinanciacion));
	$("#maximoFinanciacion" + panelSimulacion).text("$ " + formatearImporte(parseInt(maximoFinanciacion)));
	$("#cantidadCuotaSimulacion" + panelSimulacion).text(cantidadCuotas);
	var monto = $("#slider" + panelSimulacion + "-2-input" ).text();
	//$("#slider2-2-input" + panelSimulacion).text(parseInt(monto));
}


function habilitarCampanias(){
	$('#lineas1').attr('disabled', false);
	$('#lineas2').attr('disabled', false);
	$('#lineas3').attr('disabled', false);
}



function setearValoresMaximosMinimos(){
	var campaniaSeleccionada = $("#lineas1").val();
	plazos = $("#plazo"+campaniaSeleccionada).val();
	plazosArray = JSON.parse(plazos);
	tasas = $("#tasa"+campaniaSeleccionada).val();
	tasasArray = JSON.parse(tasas);
	
	campaniaSeleccionada = $("#lineas1").val();
	var valorFinal = $("#maxFin"+campaniaSeleccionada).val();
	
	var maximoFinanciacion = parseFloat(valorFinal).toFixed();
	var minimoFinanciacion = parseFloat($("#minFinanciacion").val());
	var diferencia = maximoFinanciacion - minimoFinanciacion;
	var cantidadCuotas = plazosArray[0];
	var interes = tasasArray[0];
	var valorFinalIngresado = $("#valorFinalHdd").val();
	var maximoAnticipo = parseInt(valorFinalIngresado) - parseFloat(minimoFinanciacion); 
	var minimoAnticipo = parseFloat(maximoAnticipo) - parseFloat(diferencia);
	
	
	generaTablaPlazosInicial(maximoFinanciacion, plazosArray, tasasArray, 1);
	generaTablaPlazosInicial(maximoFinanciacion, plazosArray, tasasArray, 2);
	generaTablaPlazosInicial(maximoFinanciacion, plazosArray, tasasArray, 3);
	
	setearValoresHTMLIniciales(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 1);
	setearSlideMaximosMinimos(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 1);
	setearTotalCuotasEjemplos(maximoFinanciacion,interes, 1, 0);
	escribirCuotaConSeguro(maximoFinanciacion,interes,cantidadCuotas, 1, 0);
	
	setearValoresHTMLIniciales(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 2);
	setearSlideMaximosMinimos(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 2);
	setearTotalCuotasEjemplos(maximoFinanciacion,interes, 2, 0);
	escribirCuotaConSeguro(maximoFinanciacion,interes,cantidadCuotas, 2, 0);
	
	setearValoresHTMLIniciales(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 3);
	setearSlideMaximosMinimos(minimoAnticipo,maximoAnticipo, minimoFinanciacion,maximoFinanciacion, cantidadCuotas, 3);
	setearTotalCuotasEjemplos(maximoFinanciacion,interes, 3, 0);
	escribirCuotaConSeguro(maximoFinanciacion,interes,cantidadCuotas, 3, 0);
	
	habilitarCampanias();
}

