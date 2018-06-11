$(document).ready(function() {
// init modul
	var loginFormCheck = (function () {
		// Переменные модуля
		var _form = $('#form-login');

		var _email = $('#email-fild'); //поле email
		var _password = $('#password-fild'); //поле pass

		var _error = $('<div class="error"></div>'); 
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;


		// Метод инициализации
		var init = function(){
			_setUpListeners();
		}

		// Метод прослушки событий

		var _setUpListeners = function() {
			_form.on('submit', function(event) {
				$('div.error').remove();
				_formValidate(event);
			});
		}

		// Приватные методы

		var _formValidate = function (event) {
			var	noEmail = _email.attr('data-empty'),
				emailFildEmpty = _email.attr('data-empty'),
				noPassword = _password.attr('data-empty'),
				DataFormat = _password.attr('data-error-format'),
				dataErrorUnknown = _email.attr('data-error-unknown');
			var userPassword = '123',
				userEmail = 'mail@mail.com';

	    		event.preventDefault();
	    		if (_password.val() == '') {
	    			var passwordFildEmpty = _error.clone().text(noPassword);
	    			_password.before(passwordFildEmpty);
	    			passwordFildEmpty.fadeIn(800);
	    			_password.on('focus', function() {
						passwordFildEmpty.fadeOut(500);
					});	    			
	    		}
	    		if ( _email.val() == "" ) {
	    			var emailFildEmpty = _error.clone().text(noEmail);
					_email.before(emailFildEmpty);
					emailFildEmpty.fadeIn(800);
					_email.on('focus', function() {
						emailFildEmpty.fadeOut(500);
					});
				}
				else {
					if (!(pattern.test(_email.val()))) {
						var errorDataFormat = _error.clone().text(DataFormat);
						_email.before(errorDataFormat);
						errorDataFormat.fadeIn(800);
					}
					else {
						if (_password.val().trim() == userPassword && _email.val() == userEmail) {
							_form.unbind('submit').submit();
							_error.fadeOut;
						}
						else {
							var errorDataFormat = _error.clone().text(dataErrorUnknown);
							_email.before(errorDataFormat);
							errorDataFormat.fadeIn(800);
						}
					}	
				}
			}
		return {
			init
		}
	}());
	loginFormCheck.init();

});