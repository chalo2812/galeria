function actualizar(callback){
    var formData = {
		'tipoDocumento'					: document.getElementById('checkedTipoDoc').value, 
		'nroDocumento'					: document.getElementById('inputNroDocumento').value,
		'oldPassword'					: document.getElementById('inputOldPassword').value,
		'password'						: document.getElementById('inputPassword').value,
		'password2'						: document.getElementById('inputPassword2').value,
		'token'							: document.getElementById('inputToken').value,
		'_spring_security_remember_me'	: true
    };
    if (validar()) {
		ocultarMensaje('alerta');
		ocultarMensaje('modificada');
		$('#spinner-enviar').removeClass('hide');
        $.ajax({
        	type        : 'POST',
            url         : 'nuevaPassword',
            data        : formData,
            dataType    : 'json',
            success     : function(data) {
				mostrarMensaje('modificada');
               	setTimeout(function() { ocultarMensaje('modificada'); callback(); }, 5000);
        		$('#spinner-enviar').addClass('hide');
            },
            error       : function(data){
				$('#alerta ul').remove();
				var ul = $('<ul>').appendTo('#alerta');
				$(JSON.parse(data.responseText)).each(function(index, item) {
				    ul.append(
				        $(document.createElement('li')).text(item)
				    );
				});
				mostrarMensaje('alerta');
        		$('#spinner-enviar').addClass('hide');
            }
        });
    }
}
