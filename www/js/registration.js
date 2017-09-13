const $ = require('jquery');

module.exports.initRegistrationForm = () => {
    $('.js-registration-form')
        .on('submit', evt => evt.preventDefault());

    $('.js-login')
        .on('click', () => {
            console.log('login clicked!!!');
        });

    $('.js-register')
        .on('click', () => {
            $.ajax({
                type: 'post',
                url: '/api/registration/',
                data: $('.js-registration-form').serialize(), // serializes the form's elements.
                success: data => {
                    console.log('add auto login here');
                    // alert(data); // show response from the php script.
                }
            });
        });
};
