function modoNuevo() {
	resetNuevo();
	$('#buscarForm').hide();
	$('#userList').hide();
	$('#userAdd').fadeIn();
}    
function modoEditar() {
	modoNuevo();
	resetEditar();
}
function modoBuscar() {
	$('#userAdd').hide();
	$('#buscarForm').fadeIn();
}
function modoResultado() {
	$('#userAdd').hide();
	$('#buscarForm').fadeIn();
	$('#userList').fadeIn();
}

function resetEditar() {
	$('#tituloFormulario').text("Editar Usuario");
}

function resetNuevo() {
	$('#tituloFormulario').text("Nuevo Usuario");
	$('#detalleApellido').val('');
	$('#detalleNombre').val('');
	$('#detalleTipoDocumento').val('');
	$('#detalleNroDocumento').val('');
	$('#detalleCUIT').val('');
	$('#detalleEstadoCivil').val('');
	$('#detalleEstado').val('');
	$('#detalleFechaNacimiento').val('');
	$('#detalleTelefonoPersonal').val('');
	$('#detalleTelefonoLaboral').val('');
	$('#idUsuario').val('');


	$('#detalleEmail').val('');
	$('#idUsuario').val('');
	$('#detallePerfil').val('');

}

$(document).ready(function() {	
	$('#userList').fadeOut();
	$('#userAdd').fadeOut();
	$('#resultados').bootstrapTable();
	
	evaluarPerfil();	
	getCombos();
	
	$(document).on('change', 'input:radio[id="buscar"]', function (event) {
		modoBuscar();
	});

	$(document).on('change', 'input:radio[id="nuevo"]', function (event) {
		modoNuevo();
	});

	
	
//	$("#nroDocumento").keypress(function (e) {
//		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
//			//$("#errmsg").html("Digits Only").show().fadeOut("slow");
//			return false;
//		}
//	});
//	
	
	

});

function getCombos() {
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
				$('#detalleTipoDocumento').append($('<option>', {
					value: data[i].id,
					text: data[i].descripcionCorta
				}));
				
				
				
			}
		 },
		 error: function (data) {
			console.log("Error: " + data.statusText);
		 }
	})
	 
}

function mailFormatter(value, row, index) {
	if (window.innerWidth > 1200) {
		if (value.length > 30) {
			return '<span title="'+value+'">'+value.substring(0,27)+'...</span>';
		} else {
			return '<span>'+value+'</span>';
		}
	} else {
		return '<span title="'+value+'"><i class="glyphicon glyphicon-envelope"></i></span>';
	}
}
function accionesFormatter(value, row, index) {
    var acciones = '<span nowrap="nowrap"><i class="glyphicon glyphicon-pencil" style="cursor:pointer;" onclick="editarUsuario(' + row.idUsuario + ')"></i>&nbsp;'
          +'<i class="glyphicon glyphicon-user" style="cursor:pointer;" onclick="editarPerfil(' + row.idUsuario + ', ' + row.perfilId + ')"></i>&nbsp;';
    if ($("#idUsuarioHeader").text()!=row.idUsuario) {
        acciones = acciones + '<i class="glyphicon glyphicon-trash" style="cursor:pointer;" onclick="eliminarUsuario(' + row.idUsuario + ')"></i></span>';
    }
    return acciones;
}

function editarPerfil(idUsuario, idPerfil) {
	$("#userId").val(idUsuario);
	$("#nuevoPerfil").val(idPerfil);
	$('#modalPerfil').modal('show');
}

function changeProfile() {
	var idUsuario = $("#userId").val();
	var perfil = $("#nuevoPerfil").val();
	$.ajax({
    	type        : 'POST',
        url         : 'usuarioPerfil-' + idUsuario + '-' + perfil,
        data        : {
        	'idUsuario': idUsuario
        },
        cache: false,        
        dataType    : 'json',
        success     : function(data) {
        	console.log("datos: " + JSON.stringify(data));
        	$('#modalDeleteUser').modal('hide');
        	modoBuscar();
        },
        error       : function(data) {
			console.log("error: " + data.statusText);
        }
    });
}

function eliminarUsuario(idUsuario) {
	$("#userId").val(idUsuario);
	$('#modalDeleteUser').modal('show');
}

function deleteUser() {
	var idUsuario = $("#userId").val();
	$.ajax({
    	type        : 'DELETE',
        url         : 'usuario-' + idUsuario,
        data        : {
        	'idUsuario': idUsuario
        },
        cache: false,        
        dataType    : 'json',
        success     : function(data) {
        	console.log("datos: " + JSON.stringify(data));
        	$('#modalDeleteUser').modal('hide');
        	modoBuscar();
        },
        error       : function(data) {
			console.log("error: " + data.statusText);
        }
    });
}

function editarUsuario(idUsuario) {
	$.ajax({
    	type        : 'GET',
        url         : 'usuario-' + idUsuario,
        data        : {
        	'idUsuario': idUsuario
        },
        cache: false,        
        dataType    : 'json',
        success     : function(data) {
			
//			resetEditar();
//			$('#buscarForm').addClass("hide");
//			$('#userList').addClass("hide");
//			$('#buscarForm').slideUp(300);
//			$('#userAdd').removeClass("hide");
//			$('#userAdd').slideDown(300);
			
			modoEditar();
			$('#detalleApellido').val(data.apellido);
			$('#detalleNombre').val(data.nombre);
			$('#detalleTipoDocumento').val(data.idTipoDeDoc);
			$('#detalleNroDocumento').val(data.nroDocumento);
			$('#detalleCUIT').val(data.CUIT);
			if (data.estadoCivil!=null)
				$('#detalleEstadoCivil').val(data.estadoCivil.idEstadoCivil);
			$('#detalleFechaNacimiento').val(dateFormatter(data.fechaNacimiento));
			$('#detalleTelefonoPersonal').val(data.telefonoParticular);
			$('#detalleTelefonoLaboral').val(data.telefonoLaboral);
			$('#detalleEmail').val(data.email);
			$('#detalleEstado').val(data.estado?1:0);
			$('#idUsuario').val(data.idUsuario);
			if (data.perfil) {
				document.getElementById('detallePerfil').value=data.perfil.idPerfil;
				evaluarPerfil(data.perfil.idPerfil);
			}			
        },
        error       : function(data) {
			console.log("error: " + data.statusText);
        }
    });
}

function evaluarPerfil(perfil) {
	$('#perfil6').hide();
	$('#perfil7y8').hide();
	$('#perfil9').hide();
	$('#perfil10').hide();
	$('#perfil11').hide();
	if (perfil==6) {
		$('#perfil6').show();
	}
	if (perfil==7 || perfil==8) {
		$('#perfil7y8').show();
	}
	if (perfil==9) {
		$('#perfil9').show();
	}
	if (perfil==10) {
		$('#perfil10').show();
	}
	if (perfil==11) {
		$('#perfil11').show();
	}
}

function volverEditar() {
	if ($('#tituloFormulario').text()=="Editar Usuario") {
		modoResultado();
	} else {
		$('input:radio[id="buscar"]').click();
	}
}

function guardar() {
	event.preventDefault();
	$('#spinner-guardar').removeClass('hide');
	$.ajax({
    	type        : 'POST',
        url         : 'usuario',
        data        : {
        	'idUsuario': $('#idUsuario').val(),
        	'estado'   : $('#detalleEstado').val(),
        	'apellido' : $('#detalleApellido').val(),
        	'nombre' : $('#detalleNombre').val(),
        	'tipoDocumento' : $('#detalleTipoDocumento').val(),
        	'nroDocumento' : $('#detalleNroDocumento').val(),
        	'CUIT' : $('#detalleCUIT').val(),
        	'estadoCivil' : $('#detalleEstadoCivil').val(),
        	'fechaNacimiento' : $('#detalleFechaNacimiento').val(),
        	'telefonoPersonal' : $('#detalleTelefonoPersonal').val(),
        	'telefonoLaboral' : $('#detalleTelefonoLaboral').val(),
        	'email' : $('#detalleEmail').val(),
        	'perfil' : $('#detallePerfil').val(),
        },
        dataType    : 'json',
        success     : function(data) {
        	if ($('#idUsuario').val()!='') {
    			$('#accionUsuario').text('Edición');
    			$('#mensajeUsuario').text('El usuario ha sido modificado con éxito!');
    			if ($('#idUsuario').val()==$('#idUsuarioHeader').text()) {
    				$('#nombreUsuarioHeader').text($('#detalleNombre').val() + ' ' + $('#detalleApellido').val());
    			}
    			modoBuscar();
        	} else {
    			$('#accionUsuario').text('Nuevo');
    			$('#mensajeUsuario').text('El usuario ha sido cargado con éxito!');
    			resetNuevo();
        	}
			$('#modalAddUserOk').modal('show');
			$('#spinner-guardar').addClass('hide');
        },
        error       : function(data) {
			console.log("error: " + data.statusText);
			$('#spinner-guardar').addClass('hide');
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

$("#searchUserForm").submit(function(event){
	 
	event.preventDefault();
	$('#spinner-buscar').removeClass('hide');
	$('#userList').fadeOut();
	$.ajax({
    	type        : 'POST',
        url         : 'buscarUsuarios',
        data        : {
        	'tipoDocumento'		: $("#tipoDocumento").val(),
        	'nroDocumento'		: $("#nroDocumento").val(),
        	'concesionario'		: $("#concesionario").val(),
        	'perfil'			: $("#perfil").val(),
        },
        dataType    : 'json',
        cache: false,        
        success     : function(data) {
        	console.log("datos: " + JSON.stringify(data));
			$('#resultados').bootstrapTable('load', data);
			$('#userList').fadeIn();
			$('#spinner-buscar').addClass('hide');
        },
        error		: function(data) {
			console.log("error: " + data.statusText);
        }
    });
});

function buscar() {

	

//	if (validarFiltros())
//		$.ajax({
//	    	type        : 'POST',
//	        url         : 'buscarUsuarios',
//	        data        : {
//	        	'idSimulacion'		: $("#idSimulacion").val(),
//	        	'idConcesionario'	: $("#concesionario").val(),
//	        	'idVendedor'		: $("#vendedor").val(),
//	        	'fechaSimDesde'		: $("#fechaSimDesde").val(),
//	        	'fechaSimHasta'		: $("#fechaSimHasta").val(),
//	        	'idTipoDocumento'	: $("#tipoDocumento").val(),
//	        	'numeroDocumento'	: $("#numeroDocumento").val(),
//	        	'anio'				: $("#anio").val(),
//	        	'idMarca'			: $("#marca").val(),
//	        	'idModelo'			: $("#modelo").val(),
//	        	'idSubmodelo'		: $("#submodelo").val()
//	        },
//	        dataType    : 'json',
//	        success     : function(data) {
//				$('#resultados').bootstrapTable('load', data);
//				$('#sectionResultados').show();
//	        },
//	        error       : function(data) {
//				console.log("Error: " + data.statusText);
//	        }
//	    });
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


/*
function redefinir() {
	$("input").val("");
	$("select").val("");
	$('#sectionResultados').hide();
}
*/
function tipoDocumentoChange() {
	var tipoDocumento = $("#tipoDocumento").val();
	
	if (tipoDocumento == "") {
		$("#numeroDocumento").val("");
		$("#numeroDocumento").prop('disabled', 'disabled');
	} else
		$("#numeroDocumento").prop('disabled', false);
}
function dateFormatter(inputFormat) {
	  function pad(s) { return (s < 10) ? '0' + s : s; }
	  if (inputFormat != null) {
		  var d = new Date(inputFormat);
		  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
	  } else {
		  return '-';
	  }
}
function stateFormatter(inputFormat) {
	  if (inputFormat!='') {
		  return inputFormat?'Activo':'Inactivo';
	  } else {
		  return '-';
	  }
}