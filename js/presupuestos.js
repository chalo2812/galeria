
$(document).ready(function() {	
	$('#resultados').bootstrapTable();
	
	getCombos();
	
//	var d = new Date();
//	var hoy = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
//	
//	$.ajax({
//    	type        : 'POST',
//        url         : 'buscarPresupuestos',
//        data        : {
//        	'fechaSimDesde'		: hoy,
//        	'fechaSimHasta'		: hoy
//        },
//        dataType    : 'json',
//        success     : function(data) {
//			$('#resultados').bootstrapTable('load', data);
//        },
//        error       : function(data) {
//			console.log("Error: " + data.statusText);
//        }
//    });
});

function getCombos() {
	$.ajax({
		type : 'GET',
		url : 'getConcesionarios',
		dataType : 'json',
		success : function(data) {
			for (i = 0; i < data.length; i++) {
				$('#concesionario').append($('<option>', {
					value : data[i].idConcesionario,
					text : data[i].razonSocial
				}));
			}
			
			concesionarioChange();
		},
		error : function(data) {
			console.log("Error: " + data.statusText);
		}
	})
	
	$.ajax({
		 type: 'GET',
		 url: 'tipoDocumento',
		 dataType: 'json',
		 success: function (data) {
			for (i = 0; i< data.length ;  i++) {
				$('#tipoDocumento').append($('<option>', {
					value: data[i].id,
					text: data[i].descripcionCorta
				}));
			}
		 },
		 error: function (data) {
			console.log("Error: " + data.statusText);
		 }
	})
	 
//	$.ajax({
//		 type: 'GET',
//		 url: 'getAnios',
//		 dataType: 'json',
//		 success: function (data) {
//			for (i = 0; i< data.length ;  i++) {
//				$('#anio').append($('<option>', {
//					value: data[i],
//					text: data[i]
//				}));
//			}
//		 },
//		 error: function (data) {
//			console.log("Error: " + data.statusText);
//		 }
//	})
}

function accionesFormatter(value, row, index) {
    return '<a class="btn btn-xs f-right" onclick="mostrarDetalles(' + row.idDatosSimulacion + ')">Ver más</a>';
}

function mostrarDetalles(idDatosSimulacion) {
	$.ajax({
    	type        : 'POST',
        url         : 'detallesPresupuesto',
        data        : {
        	'idDatosSimulacion'		: idDatosSimulacion
        },
        dataType    : 'json',
        success     : function(data) {
			$('#detallesTitle').html(idDatosSimulacion);
			$('#detallesVendedor').val(data.vendedor.nombre + " " + data.vendedor.apellido);
			$('#detallesCliente').val(data.cliente.nombre + " " + data.cliente.apellido);
			$('#detallesCampana').val(data.campanaSimulacion.idCampanaSimulacion + "-" + data.campanaSimulacion.descripcion);
			$('#detallesFecha').val(formatDate(new Date(data.fechaSimulacion)));
			$('#detallesPrecio').val("$" + formatNumber(data.infoauto.precio));
			$('#detallesModelo').val(data.infoauto.modelo);
			$('#detallesSubmodelo').val(data.infoauto.descripcion);
			$("#modalDetalles").modal('show');
        },
        error       : function(data) {
			console.log("Error: " + data.statusText);
        }
    });
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

function formatDate(date) {
    return ('0' + date.getDate()).slice(-2) + '/'
    	 + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
    	 + date.getFullYear();
}

function buscar() {
	if (validarFiltros())
		$('#spinner-buscar').removeClass('hide');
		$('#sectionResultados').fadeOut();
		$.ajax({
	    	type        : 'POST',
	        url         : 'buscarPresupuestos',
	        data        : {
	        	'idSimulacion'		: $("#idSimulacion").val(),
	        	'idConcesionario'	: $("#concesionario").val(),
	        	'idVendedor'		: $("#vendedor").val(),
	        	'fechaSimDesde'		: $("#fechaSimDesde").val(),
	        	'fechaSimHasta'		: $("#fechaSimHasta").val(),
	        	'idTipoDocumento'	: $("#tipoDocumento").val(),
	        	'numeroDocumento'	: $("#numeroDocumento").val(),
	        	'anio'				: $("#anio").val(),
	        	'idMarca'			: $("#marca").val(),
	        	'idModelo'			: $("#modelo").val(),
	        	'idSubmodelo'		: $("#submodelo").val()
	        },
	        dataType    : 'json',
	        success     : function(data) {
	    		$('#spinner-buscar').addClass('hide');
				$('#resultados').bootstrapTable('load', data);
				//$('#sectionResultados').show();
				$('#sectionResultados').fadeIn();
	        },
	        error       : function(data) {
	    		$('#spinner-buscar').addClass('hide');
				$('#sectionResultados').fadeIn();
				console.log("Error: " + data.statusText);
	        }
	    });
}

function validarFiltros() {
	$("[id^=validacion]*").hide();
	
	var fechaSimDesde = $("#fechaSimDesde").val();
	var fechaSimHasta = $("#fechaSimHasta").val();
	var tipoDocumento = $("#tipoDocumento").val();
	var numeroDocumento = $("#numeroDocumento").val();
	
	if (fechaSimDesde != "" && fechaSimHasta != "" && fechaSimHasta < fechaSimDesde)
		$("#validacionFechas").html("La fecha de simulaci\u00F3n inicial no puede ser mayor a la final").show();
	
	if (tipoDocumento != "" && numeroDocumento == "") {
		$("#validacionNumeroDocumento").html("Debe ingresar N\u00FAmero").show();
		$("#numeroDocumento").focus();
	}
	
	if ($("[id^=validacion]*").filter(':visible').length > 0)
		return false;
	else
		return true;
}

function redefinir() {
	$("input").val("");
	$("select").val("");
	$('#sectionResultados').fadeOut();
}

function concesionarioChange() {
	var concesionario = $("#concesionario").val();
	
	$("#vendedor option:gt(0)").remove();
	
	if (concesionario == "") {
		$("#vendedor").val("");
		$("#vendedor").prop('disabled', 'disabled');
	} else {
		$("#vendedor").prop('disabled', false);
		$.ajax({
			type : 'GET',
			url : 'getVendedores',
			dataType : 'json',
			data : {
				idConcesionario : concesionario
			},
			success : function(data) {
				for (i = 0; i < data.length; i++) {
					$('#vendedor').append($('<option>', {
						value : data[i].idVendedor,
						text : data[i].apellido + " " + data[i].nombre
					}));
				}
			},
			error : function(data) {
				console.log("Error: " + data.statusText);
			}
		})
	}
}

function tipoDocumentoChange() {
	var tipoDocumento = $("#tipoDocumento").val();
	
	if (tipoDocumento == "") {
		$("#numeroDocumento").val("");
		$("#numeroDocumento").prop('disabled', 'disabled');
	} else
		$("#numeroDocumento").prop('disabled', false);
}

function anioChange() {
	var anio = $("#anio").val();
	
	$("#marca option:gt(0)").remove();
	$("#modelo option:gt(0)").remove();
	$("#submodelo option:gt(0)").remove();
	
	if (anio == "") {
		$("#marca").val("");
		marcaChange();
		$("#marca").prop('disabled', 'disabled');
	} else {
		$.ajax({
			 type: 'GET',
			 url: 'getMarcas',
			 dataType: 'json',
			 data: {
				 anio : anio
			 },
			 success: function (data) {
				for (i = 0; i< data.length ;  i++) {
					$('#marca').append($('<option>', {
						value: data[i].codigoMarca,
						text: data[i].marca
					}));
				}
				
				$("#marca").prop('disabled', false);
			 },
			 error: function (data) {
				console.log("Error: " + data.statusText);
			 }
		})
	}
}

function marcaChange() {
	var marca = $("#marca").val();
	var anio = $("#anio").val();
	$("#modelo option:gt(0)").remove();
	$("#submodelo option:gt(0)").remove();
	
	if (marca == "") {
		$("#modelo").val("");
		modeloChange();
		$("#modelo").prop('disabled', 'disabled');
	} else {
		$.ajax({
			 type: 'GET',
			 url: 'getModelos',
			 dataType: 'json',
			 data: {
				 codigoMarca : marca,
				 anioFabricacion : anio
			 },
			 success: function (data) {
				for (i = 0; i< data.length ;  i++) {
					$('#modelo').append($('<option>', {
						value: data[i].codigoGrupo,
						text: data[i].modelo
					}));
				}
				
				$("#modelo").prop('disabled', false);
			 },
			 error: function (data) {
				console.log("Error: " + data.statusText);
			 }
		});
	}
}

function modeloChange() {
	var modelo = $("#modelo").val();

	$("#submodelo option:gt(0)").remove();
	
	if (modelo == "") {
		$("#submodelo").val("");
		$("#submodelo").prop('disabled', 'disabled');
	} else {
		var marca = $("#marca").val();
		
		$.ajax({
			 type: 'GET',
			 url: 'getSubmodelos',
			 dataType: 'json',
			 data: {
				 codigoMarca : marca,
				 codigoGrupo : modelo
			 },
			 success: function (data) {
				for (i = 0; i< data.length ;  i++) {
					$('#submodelo').append($('<option>', {
						value: data[i].codigoMod,
						text: data[i].descripcion
					}));
				}
				
				$("#submodelo").prop('disabled', false);
			 },
			 error: function (data) {
				console.log("Error: " + data.statusText);
			 }
		});
	}
}