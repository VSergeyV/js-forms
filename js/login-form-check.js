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

			console.log('_formValidate - start');

			$('div.error-description').remove();

			var	noEmail = _email.attr('data-empty'),
				emailFildEmpty = _email.attr('data-empty'),
				noPassword = _password.attr('data-empty'),
				DataFormat = _password.attr('data-error-format'),
				dataErrorUnknown = _email.attr('data-error-unknown');
			var userPassword = '123',
				userEmail = 'mail@mail.com';

				event.preventDefault();

				var passwordCheck = true,
					emailCheck = true;

				// Если пустой пароль
				if (_password.val() == '') {
					console.log('Password is empty');
					var passwordFildEmpty = _error.clone().text(noPassword);
					_password.before(passwordFildEmpty);
					passwordFildEmpty.fadeIn(800);
					_password.on('focus', function() {
						passwordFildEmpty.fadeOut(500);
					});	   
					passwordCheck = false;
				}

				// Если пустой  email
				if ( _email.val() == "" ) {
					console.log('Email is empty');
					var emailFildEmpty = _error.clone().text(noEmail);
					_email.before(emailFildEmpty);
					emailFildEmpty.fadeIn(800);
					_email.on('focus', function() {
						emailFildEmpty.fadeOut(500);
					});
					emailCheck = false;
				} 

				// Проверка на формат  email
				if ( emailCheck == true && !(pattern.test( _email.val() )) ) {
					var errorDataFormat = _error.clone().text(DataFormat);
					_email.before(errorDataFormat);
					errorDataFormat.fadeIn(800);
					emailCheck = false;
				}

				// Если пароль не пустой и email верного формата  - проверяем на корректные доступы
				if (emailCheck == true && passwordCheck == true) {
					if (_password.val().trim() == userPassword && _email.val() == userEmail) {
						console.log('Credentails are correct');
						_form.unbind('submit').submit();
						_error.fadeOut;
					} else {
						console.log('Credentails NOT correct');

						var errorDataFormat = _error.clone().text(dataErrorUnknown);
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

		return { init }
	}());
	loginFormCheck.init();

});