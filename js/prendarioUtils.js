$scope = {};

function sumRows() {
	var sum = 0, total = $('#total');
	gnc = $('#gnc');
	esGNC = "NO";
	list = [];
	listMontos = [];
	montos = "";
	accesorios = "";
	accesoriosSeleccionados = $('#accesoriosSeleccionados');
	montosSeleccionados = $('#montosSeleccionados');
	$('tr').each(
			function() {
				var amount = $(this).find('input[name="amount"]'), hidden = $(
						this).find('input[name="include"]');
				if (parseInt(amount.val(), 10) > 0) {
					sum += parseInt(amount.val(), 10);
					list.push(hidden.attr('id'));
					listMontos.push(parseInt(amount.val(), 10));
					var id = amount.attr('id');
					var accesorio = id.split('-')[1];
					if (accesorio.indexOf("GNC") != -1) {
						esGNC = "SI";
					}
				}
			});
	gnc.val(esGNC);
	total.text(sum);
	total.val(sum);
	accesorios = list.join('-');
	accesoriosSeleccionados.val(accesorios);
	montos = listMontos.join('-');
	montosSeleccionados.val(montos);
}

function disableAccesoriosConPrecio() {
	accesorios = document.getElementsByName("amount");
	$.each(accesorios, function(index, element) {
		if (element.value !== "") {
			element.disabled = true;
		}
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

function replaceLocalidadesOptions(select, data, optionSelected) {
	var options = [];
	$.each(data, function(index, element) {
		options.push({
			text : element,
			value : element.localidadId
		});
	});
	select.empty();

	defaultOption = $("<option value=''></option>").text("- Seleccionar -");
	select.append(defaultOption);

	$.each(options, function(index, option) {
		if (optionSelected == '0') {
			$option = $("<option></option>").attr("value", option.value).text(
					"(" + option.text.codigoPostal + ") - "
							+ option.text.localidad);
			select.append($option);
		} else {
			$option = $("<option></option>").attr("value", option.value).text(
					option.text.localidad);
			select.append($option);
		}
	});
};

function resetCodPostal(esCliente) {
	if(esCliente){
		$('#codigoPostalCliente').attr('value', '');
	}else{
		//$('#codPostalInput').attr('value', '');
		$('#codPostalInput').val('');
	}
};

function setCodPostalInput(esCliente) {
	var optionSelected;
	if(esCliente){
		optionSelected = $("#localidadClienteSelect option:selected").val();
		if (optionSelected === '- Seleccionar -') {
			resetCodPostal();
		} else {
			$.each($scope.localidades, function(index, elemento) {
				if (elemento.localidadId == optionSelected) {
					console.log(elemento);
					$('#codigoPostalCliente').attr('value', elemento.codigoPostal);
				}
				else{
					console.log("no entro");
				}
			});
		}
	}else{
		optionSelected = $("#localidadSelect option:selected").val();
		if (optionSelected === '- Seleccionar -') {
			resetCodPostal();
		} else {
			$.each($scope.localidades, function(index, elemento) {
				if (elemento.localidadId == optionSelected) {
					//$('#codPostalInput').attr('value', elemento.codigoPostal);
					$('#codPostalInput').val(elemento.codigoPostal);
				}
			});
		}
	}
	
};

function filterLocalidadesByProvincia(esCliente) {
	var optionSelected;
	if(esCliente){
		optionSelected = $("#provinciaClienteSelect option:selected").val();
		$('#codigoPostalCliente').attr('value', '');
	}else{
		optionSelected = $("#provinciaSelect option:selected").val();
	}
	var data = {};
	data["provinciaId"] = optionSelected;
	console.log(data);
	$.ajax({
		url : "./localidad/findByProvincia",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			if(esCliente){
				replaceLocalidadesOptions($('#localidadClienteSelect'), data,
						optionSelected);
			}else{
				replaceLocalidadesOptions($('#localidadSelect'), data,
						optionSelected);
			}
			setLocalidadesInScope(data);
			setCodPostalInput(esCliente);
		},
		error : function(e) {
			console.log("ERROR: ", e);
		},
		done : function(e) {
			console.log("DONE");
		}
	});
};

function setLocalidadesInScope(data) {
	$scope.localidades = data;
};

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
				console.log(data);
				replaceSubmodeloOptions($('#submodeloSelect'), data);
				setSubmodelosInScope(data);
				resetInputsInfoAuto();
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
		resetInputsInfoAuto()
	}
};

function setSubmodelosInScope(data) {
	$scope.submodelos = data;
};

function selectedAnio() {
	var optionSelected = $("#marcaSelect option:selected").val();
	if (optionSelected != "") {
		filterModeloByMarcaYAnio()
	}
}

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
				console.log(data);
				replaceModeloOptions($('#modeloSelect'), data);
				filterSubmodeloByModelo();
				resetInputsInfoAuto();
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

function filterMarcaYModelo() {
	if($("#tipoContrato").val() !== "1"){
		filterMarcaByAnio();
	}
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
			resetInputsInfoAuto();
		},
		error : function(e) {
			console.log("ERROR: ", e);
		},
		done : function(e) {
			console.log("DONE");
		}
	});
};

function setInputsBeforeSelectSubmodeloConCliente(vehiculo, condicion) {
	var data = {};
	data["submodelo"] = vehiculo.submodelo.descripcion;
	$.ajax({
		url : "./submodelo/findBySubmodelo",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			setInputsInfoAuto(data);
			setUsoYCondicionFiscal(data[0].infoAutoExtraD.tipoVehiculo, condicion);
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

function setInputsBeforeSelectSubmodelo() {
	var condicion = $("#condFisc").val();
	var optionSelected = $("#submodeloSelect option:selected").val();
	if (optionSelected === "") {
		resetInputsInfoAuto();
	} else {
		var data = {};
		data["submodelo"] = optionSelected;
		$.ajax({
			url : "./submodelo/findBySubmodelo",
			data : data,
			type : "GET",
			dataType : 'json',
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(data) {
				console.log(data);
				setInputsInfoAuto(data);
				setUsoYCondicionFiscal(data[0].infoAutoExtraD.tipoVehiculo, condicion);
			},
			error : function(e) {
				console.log(e);
				console.log("ERROR: ", e);
			},
			done : function(e) {
				console.log("DONE");
			}
		});
	}
};

function setInputsInfoAuto(data) {
	$('#tipoDeVehiculoInput').val(data[0].infoAutoExtraD.tipoVehiculo);
	$('#combustibleInput').val(data[0].infoAutoExtraD.tipoCombustible);
	$('#codigoInfoAutoInput').val(data[0].infoAutoExtraD.id);
	$('#procedenciaInput').val(data[0].infoAutoExtraD.importado);
};

function getUsosByCondicionFiscal(){
	var data = {};
	data["tipoVehiculo"] = $("#tipoDeVehiculoInput").val();
	data["condicionFiscal"] = $("#condFisc").val(),
	$.ajax({
		url : "./condicionSeguro/findUsoByTipoVehiculoAndCondicionFiscal",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			replaceUsosOptions($("#uso"), data);
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


function getUsos(tipoVehiculo) {
	var data = {};
	data["tipoVehiculo"] = tipoVehiculo;
	$.ajax({
		url : "./condicionSeguro/findUsoByTipoVehiculo",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			replaceUsosOptions($("#uso"), data);
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

function getCondicionesFiscales(tipoVehiculo, condicion) {
	var data = {};
	data["tipoVehiculo"] = tipoVehiculo;
	$.ajax({
		url : "./condicionSeguro/findCondicionFiscalByTipoVehiculo",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			replaceCondicionesFiscalesOptions($("#condFisc"), data);
			$("#condFisc").val(condicion);
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

function setUsoYCondicionFiscal(tipoVehiculo, condicion) {
	getUsosByCondicionFiscal();
	getCondicionesFiscales(tipoVehiculo, condicion);
}

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

function replaceUsosOptions(select, data) {
	var options = [];
	$.each(data, function(index, element) {
		options.push({
			text : element.descripcion,
			value : element.sap
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

function replaceCondicionesFiscalesOptions(select, data) {
	var options = [];
	$.each(data, function(index, element) {
		options.push({
			text : element.descripcion,
			value : element.id
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

function resetInputsInfoAuto() {
	$('#tipoDeVehiculoInput').attr('value', '');
	$('#combustibleInput').attr('value', '');
	$('#codigoInfoAutoInput').attr('value', '');
	$('#procedenciaInput').attr('value', '');
};

function filterAnioByMarca() {
	var optionSelected = $("#marcaSelect option:selected").val();
	var data = {};
	data["marca"] = optionSelected;
	$.ajax({
		url : "./infoAutoTAuto/findAnioByMarca",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			replaceAniosOptions($('#anio'), $scope.anios.slice(0, 2));
		},
		error : function(e) {
			console.log(e);
			console.log("ERROR: ", e);
		},
		done : function(e) {
			console.log("DONE");
		}
	});
}

function filterLocalidadByProvincia() {
	var optionSelected = $("#provinciaSelect option:selected").val();
	var data = {};
	data["provinciaId"] = optionSelected;
	$
			.ajax({
				url : "./localidad/findByProvincia",
				data : data,
				type : "GET",
				dataType : 'json',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success : function(data) {
					replaceLocalidadOptions($('#localidadSelect'), data,
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

function replaceAniosOptions(select, data) {
	var options = [];
	$.each(data, function(index, element) {
		options.push({
			text : element,
			value : element
		});
	});
	select.empty();
	defaultOption = $("<option></option>").text("- Seleccionar -");
	select.append(defaultOption);

	$.each(options, function(index, option) {
		console.log(option);
		$option = $("<option></option>").attr("value", option.value).text(
				option.text);
		select.append($option);
	});
};

function replaceLocalidadOptions(select, data, optionSelected) {
	var options = [];
	$.each(data, function(index, element) {
		options.push({
			text : element,
			value : element.localidadId
		});
	});
	select.empty();

	defaultOption = $("<option value=''></option>").text("- Seleccionar -");
	select.append(defaultOption);

	$.each(options, function(index, option) {
		if (optionSelected == '0') {
			$option = $("<option></option>").attr("value", option.value).text(
					"(" + option.text.codigoPostal + ") - "
							+ option.text.localidad);
			select.append($option);
		} else {
			$option = $("<option></option>").attr("value", option.value).text(
					option.text.localidad);
			select.append($option);
		}
	});
};

function reemplazarValores(select, valor, text) {
	select.empty();
	option = $("<option></option>").attr("value", valor).text(text);
	select.append(option);
};

//Limita la marca a renault si eligieron Plan Rombo
function limitarMarcas() {
	var tipoContratoSeleccionado = $('#tipoContrato');
	if (tipoContratoSeleccionado.val() === '1') {
		$("#esCero").prop( "checked", true );
		$('#esCero').attr('onclick', 'return false;');
		$("#marcaSelect").val("36");
		filterAnioByMarca();
		filterModeloByMarcaYAnio();
		$("#marcaSelect").attr('disabled', true);
		getEstadoCivilPR();
	} else {
		$('#esCero').removeAttr('onclick');
		getEstadoCivilRC();
		$("#marcaSelect").attr('disabled', false);
		replaceAniosOptions($('#anio'), $scope.anios);
	}
};

function saveAnios(){
	$scope.anios = $("#anio>option").map(function() { return $(this).val(); });
	$scope.anios.splice(0, 1);
	console.log($scope.anios);
}

function getEstadoCivilPR() {
	var data = {};
	$.ajax({
		url : "./estadoCivil/findEstadoCivilPlanRombo",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			replaceEstadoCivilOptions($('#estadoCivil'), data);
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

function getEstadoCivilRC() {
	var data = {};
	$.ajax({
		url : "./estadoCivil/findEstadoCivilRenaultCredit",
		data : data,
		type : "GET",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			replaceEstadoCivilOptions($('#estadoCivil'), data);
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

function replaceEstadoCivilOptions(select, data, optionSelected) {
	var options = [];
	$.each(data, function(index, element) {
		options.push({
			text : element.descripcion,
			value : element.id
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