/* global document, location, setTimeout */
const $ = require('jquery');

function showError({id}) { // eslint-disable-line complexity
    const style = 'snackbar';
    const timeout = 6e3;

    switch (id) {
        case 'no-needed-data':
            $.snackbar({
                content: 'Ошибка: недостаточно данных!', // text of the snackbar
                style, // add a custom class to your snackbar
                timeout// time in milliseconds after the snackbar autohides, 0 is disabled
            });
            break;
        case 'user-already-exists':
            $.snackbar({
                content: 'Ошибка: пользователь с таким Email уже существует! Попробуйте ВОЙТИ.', // text of the snackbar
                style, // add a custom class to your snackbar
                timeout// time in milliseconds after the snackbar autohides, 0 is disabled
            });
            break;
        case 'unknow-sever-error':
            $.snackbar({
                content: 'Ошибка: неизвестная ошибка сервера! Да, и такое бывает...', // text of the snackbar
                style, // add a custom class to your snackbar
                timeout// time in milliseconds after the snackbar autohides, 0 is disabled
            });
            break;
        case 'user-is-not-exists':
            $.snackbar({
                content: 'Ошибка: пользователя с таким Email НЕ существует!', // text of the snackbar
                style, // add a custom class to your snackbar
                timeout// time in milliseconds after the snackbar autohides, 0 is disabled
            });
            break;
        case 'wrong-password':
            $.snackbar({
                content: 'Ошибка: Пароль неверен!', // text of the snackbar
                style, // add a custom class to your snackbar
                timeout// time in milliseconds after the snackbar autohides, 0 is disabled
            });
            break;

        default:
            $.snackbar({
                content: 'Ошибка: неизвестная ошибка клиента! Да, и такое бывает...', // text of the snackbar
                style, // add a custom class to your snackbar
                timeout// time in milliseconds after the snackbar autohides, 0 is disabled
            });
    }
}

function checkInput(input) {
    const {value} = input;

    if (input.hasAttribute('required') && !value) {
        return false;
    }

    const pattern = input.getAttribute('pattern');

    if (!pattern) {
        return true;
    }

    const regExp = new RegExp(pattern);

    return regExp.test(value);
}

function checkForm(form) {
    const inputs = Array.prototype.slice.call(form.find('input')); // eslint-disable-line prefer-reflect

    return inputs.every(checkInput);
}

module.exports.initAuthorizationForm = () => {
    const form = $('.js-authorization-form');

    form.on('submit', evt => evt.preventDefault());

    $('.js-login')
        .on('click', () => {
            if (!checkForm(form)) {
                return;
            }

            $.ajax({
                type: 'post',
                url: '/api/login/',
                data: form.serialize(), // serializes the form's elements.
                success: data => {
                    if (data.hasOwnProperty('error')) {
                        showError(data.error);
                        return;
                    }

                    location.href = document.referrer || location.origin;
                }
            });
        });

    $('.js-register')
        .on('click', () => {
            if (!checkForm(form)) {
                return;
            }

            $.ajax({
                type: 'post',
                url: '/api/registration/',
                data: form.serialize(), // serializes the form's elements.
                success: data => {
                    if (data.hasOwnProperty('error')) {
                        showError(data.error);
                        return;
                    }

                    $.snackbar({
                        content: 'Регистрация прошла успешно!', // text of the snackbar
                        style: 'snackbar', // add a custom class to your snackbar
                        timeout: 3e3// time in milliseconds after the snackbar autohides, 0 is disabled
                    });

                    $('.js-login').click();

                    console.log('add auto login here');
                }
            });
        });
};
