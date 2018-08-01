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
    		event.preventDefault();
    		var userPassword = '123',
    			userEmail = 'mail@mail.com';

	    	var passwordFildEmpty = _error.clone().text(_password.attr('data-empty'));
	    	var emailFildEmpty = _error.clone().text(_email.attr('data-empty'));
			var errorDataFormat = _error.clone().text(_password.attr('data-error-format'));
			var errorDataFormatEmail = _error.clone().text(_email.attr('data-error-format'));

			$('div.error-description').remove();
			var error = {
				noEmail:_email.attr('data-empty'),
				emailFildEmpty:_email.attr('data-empty'),
				noPassword:_password.attr('data-empty'),
				DataFormat:_email.attr('data-error-format'),
				dataErrorUnknown:_email.attr('data-error-unknown'),
				val:function(err) {
					return _error.clone().text(err);
				}
			}
			
    		var fildEmpty = function() {
    			var result = false;
	    		if (_password.val() == '') {
	    			var passwordFildEmpty = error.val(error.noPassword);
	    			_password.before(passwordFildEmpty);
	    			passwordFildEmpty.fadeIn(800);
	    			_password.on('focus', function() {
						passwordFildEmpty.fadeOut(500);
					});
					result = true; 			
	    		}
	    		if ( _email.val() == "" ) {
	    			var emailFildEmpty = error.val(error.noEmail);
					_email.before(emailFildEmpty);
					emailFildEmpty.fadeIn(800);
					_email.on('focus', function() {
						emailFildEmpty.fadeOut(500);
					});
					result = true; 			
				}
				return result;
    		}
    		//fildEmpty();
    		if (fildEmpty() == false) {
    			if (!(pattern.test(_email.val()))) {
    				var errorDataFormat = error.val(error.DataFormat);
    				_email.before(errorDataFormat);
    				errorDataFormat.fadeIn(800);
    			}
    			else {
    				if (_password.val().trim() == userPassword && _email.val() == userEmail) {
    					_form.unbind('submit').submit();
    					_error.fadeOut;
    				}
    				else {
    					var errorDataFormat = error.val(error.dataErrorUnknown);
    					var emailDescription = '<div class="error-description"><p>Введите верные данные для входа или воспользуйтесь <a href="#">восстановлением пароля, </a>чтобы войти на сайт.</p></div>';
    					_email.before(emailDescription);
    					_email.before(errorDataFormat);
    					errorDataFormat.fadeIn(800);
    					_email.on('focus', function() {
    						$('div.error-description').fadeOut(800);
    						errorDataFormat.fadeOut(800);
    					});
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