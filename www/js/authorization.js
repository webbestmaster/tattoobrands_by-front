const $ = require('jquery');

function showError({id}) { // eslint-disable-line complexity
    const style = 'snackbar';
    const timeout = 6000;

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

module.exports.initAuthorizationForm = () => {
    $('.js-authorization-form')
        .on('submit', evt => evt.preventDefault());

    $('.js-login')
        .on('click', () => {
            $.ajax({
                type: 'post',
                url: '/api/login/',
                data: $('.js-authorization-form').serialize(), // serializes the form's elements.
                success: data => {
                    if (data.hasOwnProperty('error')) {
                        showError(data.error);
                        return;
                    }

                    $.snackbar({
                        content: 'Вход прошёл успешно!', // text of the snackbar
                        style: 'snackbar', // add a custom class to your snackbar
                        timeout: 6000// time in milliseconds after the snackbar autohides, 0 is disabled
                    });
                }
            });
        });

    $('.js-register')
        .on('click', () => {
            $.ajax({
                type: 'post',
                url: '/api/registration/',
                data: $('.js-authorization-form').serialize(), // serializes the form's elements.
                success: data => {
                    if (data.hasOwnProperty('error')) {
                        showError(data.error);
                        return;
                    }

                    $.snackbar({
                        content: 'Регистрация прошла успешно!', // text of the snackbar
                        style: 'snackbar', // add a custom class to your snackbar
                        timeout: 3000// time in milliseconds after the snackbar autohides, 0 is disabled
                    });

                    $('.js-login').click();

                    console.log('add auto login here');
                }
            });
        });
};
