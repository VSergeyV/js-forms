$(document).ready(function() {
// init modul
	var loginFormCheck = (function () {
		// Переменные модуля
		var _form = $('#form-registration');

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
				_formValidate(event);
			});
		}

		// Приватные методы

		var _formValidate = function (event) {
			$('div.error').remove();
			$('div.error-description').remove();
			var	noEmail = _email.attr('data-empty'),
				noPassword = _password.attr('data-empty'),
				emailBusy = _email.attr('data-busy'),
				invalidEmail = _email.attr('data-invalid-format');
			var userEmail = 'mail@mail.com';
				//$('div.error').remove();
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
					if ( !(pattern.test(_email.val()))) {
						var InvalidEmail = _error.clone().text(invalidEmail);
						_email.before(InvalidEmail);
						InvalidEmail.fadeIn(800);
						_email.on('focus', function() {
							InvalidEmail.fadeOut(500);
						});
					}
					else {
						if ( !(_email.val().trim() == userEmail) && !(_password.val() == '') ) {
							
							console.log('sdsd');
							_form.unbind('submit').submit();
							_error.fadeOut;	
						}
						else {
							var emailFildBusy = _error.clone().text(emailBusy);
							var emailDescription = '<div class="error-description"><p>Используйте другой email чтобы создать новый аккаунт.</p><p>Или воспользуйтесь<a href="#">восстановлением пароля</a>, чтобы войти на сайт.</p></div>';
							_email.before(emailDescription);
							_email.before(emailFildBusy);
							emailFildBusy.fadeIn(800);
							_email.on('focus', function() {
								$('div.error-description').fadeOut(800);
								emailFildBusy.fadeOut(800);
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