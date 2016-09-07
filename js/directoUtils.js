function setearReportes(data){
	$("#poliza").text(data.resultado.numeroPoliza);
	var reportes = data.resultado.reportes;
	var html = "";
	if(reportes.length > 0){
		for (i = 0; i < reportes.length; i++) { 
		    html += "<h2><i class=\"fa fa-file-pdf-o\"></i>" + reportes[i].nombreDocumento + "</h2>" + 
	        "<a href=\"" + reportes[i].urlDescarga + "\"><i class=\"fa fa-download\"></i> Descargar</a>"; 
		}
	}else{
		html += "<h2>No se han podido obtener reportes.</h2>";
	}
	$("#reportes").html(html);
};

function setDomicilioPoliza(){
	var data = {};
	data["localidadId"] = $("#localidadSelect").val();
	$.ajax({
		url : "./smartix/localidad/findByLocalidad",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			if(data.length > 0){
				$("#polizaCodigoPostal").val(data[0].codigoPostal);
			}
		},
		error : function(e) {
			console.log("ERROR: ", e);
		},
		done : function(e) {
			console.log("DONE");
		}
	});
};

// Utilizado en el onchange de año.
function filterMarcaYModelo() {
	filterMarcaByAnio();
	filterModeloByMarcaYAnio();
};

function filterMarcaByAnio() {
	var data = {};
	var anio = $("#anio option:selected").val();
	data["anio"] = anio;
	$.ajax({
		url : "./infoAutoTAuto/findMarcaByAnio",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			replaceMarcaOptions($('#marcaSelect'), data);
			filterSubmodeloByModelo();
			//resetInputsInfoAuto();
		},
		error : function(e) {
			console.log("ERROR: ", e);
		},
		done : function(e) {
			console.log("DONE");
		}
	});
};

// Utilizado en el onchange de año y de marca
function filterModeloByMarcaYAnio() {
	var optionSelected = $("#marcaSelect option:selected").val();
	var anio = $("#anio option:selected").val();
	if ((optionSelected !== "") && (anio !== "")) {
		var data = {};
		data["codigoMarca"] = optionSelected;
		data["anio"] = anio;
		$.ajax({
			url : "./modelo/findByMarca",
			data : data,
			type : "GET",
			dataType : 'json',
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(data) {
				replaceModeloOptions($('#modeloSelect'), data);
				filterSubmodeloByModelo();
				//resetInputsInfoAuto();
			},
			error : function(e) {
				console.log("ERROR: ", e);
			},
			done : function(e) {
				console.log("DONE");
			}
		});
	} else {
		var optionSelected = $("#modeloSelect").val("");
		filterSubmodeloByModelo();
	}
};

// llamado en el onchange de modelo.
function filterSubmodeloByModelo() {
	var optionSelected = $("#modeloSelect option:selected").val();
	var anio = $("#anio option:selected").val();
	var data = {};
	if (optionSelected !== "") {
		var splitSelected = optionSelected.split('-');
		data["codigoMarca"] = splitSelected[0];
		data["grupId"] = splitSelected[1];
	} else {
		data["codigoMarca"] = '';
		data["grupId"] = '';
	}
	if (anio !== "") {
		data["anio"] = anio;
		$.ajax({
			url : "./submodelo/findByModelo",
			data : data,
			type : "GET",
			dataType : 'json',
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(data) {
				replaceSubmodeloOptions($('#submodeloSelect'), data);
				//setSubmodelosInScope(data);
				//resetInputsInfoAuto();
			},
			error : function(e) {
				console.log("ERROR: ", e);
			},
			done : function(e) {
				console.log("DONE");
			}
		});
	} else {
		$("#modeloSelect").val("");
		$("#submodeloSelect").val("");
		//resetInputsInfoAuto()
	}
};

function filterInfoauto(){
	var optionSelected = $("#submodeloSelect option:selected").val();
	var data = {};
	data["submodelo"] = optionSelected;
	$.ajax({
		url : "./submodelo/findBySubmodeloInfo",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			setInfoauto(data);
		},
		error : function(e) {
			console.log(e);
			console.log("ERROR: ", e);
		},
		done : function(e) {
			console.log("DONE");
		}
	});
};

function setInfoauto(data){
	$("#infoauto").val(data[0].idInfoauto);
	$("#infoautoHidden").val(data[0].idInfoauto);
}

//// llamado en el onchange de provincia
function filtrarLocalidadByProvincia() {
	var optionSelected = $("#provinciaSelect option:selected").val();
	var data = {};
	data["provinciaId"] = optionSelected;
	$.ajax({
		url : "./smartix/localidad/findByProvincia",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			replaceLocalidad($('#localidadSelect'), data,
					optionSelected);
		},
		error : function(e) {
			console.log(e);
			console.log("ERROR: ", e);
		},
		done : function(e) {
			console.log("DONE");
		}
	});
};

// REPLACEs Methods //

function setCodPostal(){
	var localidadSelected = $("#localidadSelect option:selected").val();
	var codPostal = "";
	if(localidadSelected !== ""){
		$.each($scope.localidades, function(index, localidad){
			if(localidad.idSmartix == localidadSelected){
				codPostal = localidad.codigoPostal;
				return false;
			}
		});
	}
	$("#codPostalInput").val(codPostal);
	$("#cpHidden").val(codPostal);
	$("#localidadHidden").val($("#localidadSelect").val());
	$("#provinciaHidden").val($("#provinciaSelect").val());
};

function replaceLocalidad(select, data, optionSelected) {
	if($scope){
		$scope.localidades = data;
	}else{
		$scope = {};
		$scope.localidades = data;
	}
	var options = [];
	$.each(data, function(index, element) {
		options.push({
			text : element,
			value : element.idSmartix
		});
	});
	select.empty();

	defaultOption = $("<option value=''></option>").text("- Seleccionar -");
	select.append(defaultOption);

	$.each(options, function(index, option) {
		if (optionSelected == "0") {
			$option = $("<option></option>").attr("value", option.value).text(
					"(" + option.text.codigoPostal + ") - "
							+ option.text.descripcion);
			select.append($option);
		} else {
			$option = $("<option></option>").attr("value", option.value).text(
					option.text.descripcion);
			select.append($option);
		}
	});
};

function replaceMarcaOptions(select, data) {
	var options = [];
	$.each(data, function(index, element) {
		options.push({
			text : element[0],
			value : element[1]
		});
	});
	select.empty();
	defaultOption = $("<option value=''></option>").text("- Seleccionar -");
	select.append(defaultOption);

	$.each(options, function(index, option) {
		$option = $("<option></option>").attr("value", option.value).text(
				option.text);
		select.append($option);
	});
};

function replaceSubmodeloOptions(select, data) {
	var options = [];
	$.each(data, function(index, element) {
		options.push({
			text : element.descripcion,
			value : element.idInfoauto
		});
	});
	select.empty();

	defaultOption = $("<option value=''></option>").text("- Seleccionar -");
	select.append(defaultOption);

	$.each(options, function(index, option) {
		$option = $("<option></option>").attr("value", option.value).text(
				option.text);
		select.append($option);
	});
};

function replaceModeloOptions(select, data) {
	var options = [];
	$.each(data, function(index, element) {
		options.push({
			text : element.modelo,
			value : element
		});
	});
	select.empty();

	defaultOption = $("<option value=''></option>").text("- Seleccionar -");
	select.append(defaultOption);

	$.each(options, function(index, option) {
		$option = $("<option></option>").attr("value",
				option.value.codigoMarca + '-' + option.value.codigoGrupo)
				.text(option.text);
		select.append($option);
	});
};

function getValidator(){
	var validator= {
            validators: {
                notEmpty: {
                    message: 'Verifique los datos obligatorios.'
                }
            }
        }
	return validator;
}

function getPatenteValidator(){
	var regValidator= {
			validators: {
                notEmpty: {
                    message: 'Verifique los datos obligatorios.'
                },
	            regexp: {
	                regexp: '^([A-Z]{3}[0-9]{3}|[A-Z]{2}[0-9]{3}[A-Z]{2})$',
	                message: 'El formato de patente no es válido'
	            }
			}
	};
	return regValidator;
}
         
function setearFormaDePago(formaDePago){
	if(formaDePago != "8"){
		$("#formapagoTarjeta").show();
		agregarValidacionesFormaDePago();
	}else{
		$("#formapagoTarjeta").hide();
	}
}

function agregarValidacionesFormaDePago(){
    $('#seguroDirectoCotiza')
            .formValidation('addField', 'formaPagoTitular', getValidator())
            .formValidation('addField', 'formaPagoNumeroTarjeta', getValidator())
			.formValidation('addField', 'formaPagoVencimiento', getValidator());
    agregarValidaciones();
}

function home(){
	window.location.href = './login';
}

function showError(error){
	var html = "<i class=\"fa fa-user-times fa-4x\"></i>" + 
	"<p></p>";
	var err = JSON.parse(error.responseText);
	if(err.key === 'smartixError'){
		var text = "";
		var index;
		for (index = 0; index < err.msg.length; ++index) {
		    text += "<div>" + err.msg[index] + "</div>";
		}
		html = "<h5 class=\"modal-title\">" + text + "</h5><p></p>";
	}
	$('#errorModal').modal({
        show: true
    })
    $("#errorModalLabel").html(html);
    $("#next").show();
}

//VIEW CLIENTE/VEHICULO -> FORM VALIDATION
$(document).ready(function() {
	
	$('#clienteTab').on('submit', function(e) {
		if($("#clienteTab").valid()){
	        e.preventDefault();
	        $("#tab-titular").removeClass("active");
	        $("#titular").removeClass("active");
	        $("#tab-vehiculo").addClass("active");
	        $("#vehiculo").addClass("active");
		}
	})
	
    // You don't need to care about this function
    // It is for the specific demo
    function adjustIframeHeight() {
        var $body   = $('body'),
                $iframe = $body.data('iframe.fv');
        if ($iframe) {
            // Adjust the height of iframe
            $iframe.height($body.height());
        }
    }

    var validator= {
            validators: {
                notEmpty: {
                    message: 'Verifique los datos obligatorios.'
                }
            }
        };
    
    function validateTab(index) {
        var fv   = $('#seguroDirectoCotiza').data('formValidation'), // FormValidation instance
            // The current tab
            $tab = $('#seguroDirectoCotiza').find('.tab-pane').eq(index);

        // Validate the container
        fv.validateContainer($tab);

        var isValidStep = fv.isValidContainer($tab);
        if (isValidStep === false || isValidStep === null) {
            // Do not jump to the target tab
            return false;
        }

        return true;
    };
    
    var fileValidators = {
            row: '.col-xs-11.addfile',   
            validators: {
				file: {
					extension: 'jpeg,jpg,png',
					type: 'image/jpeg,image/png',
					maxSize: 2097152,   // 2048 * 1024
					message: 'El formato elejido no es vÃ¡lido'
				}
            }
        },
        extraIndex = 0;

    $('#seguroDirectoCotiza')
        .formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'extra[0].addfile': fileValidators
            }
        })

        // Add button click handler
        .on('click', '.addButton', function() {
            extraIndex++;
            var $template = $('#extraFile'),
                $clone    = $template
                                .clone()
                                .removeClass('hide')
                                .removeAttr('id')
                                .attr('data-extra-index', extraIndex)
                                .insertBefore($template);

            // Update the name attributes
            $clone
                .find('[name="addfile"]').attr('name', 'extra[' + extraIndex + '].addfile').end();

            // Add new fields
            // Note that we also pass the validator rules for new field as the third parameter
            $('#extraFile')
                .formValidation('addField', 'extra[' + extraIndex + '].addfile', fileValidators);
        })

        // Remove button click handler
        .on('click', '.removeButton', function() {
            var $row  = $(this).parents('.form-group'),
                index = $row.attr('data-extra-index');

            // Remove fields
            $('#extraFile')
                .formValidation('removeField', $row.find('[name="extra[' + index + '].addfile"]'));

            // Remove element containing the fields
            $row.remove();
        });
});