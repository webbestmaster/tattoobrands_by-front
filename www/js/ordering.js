const $ = require('jquery');

function updateUserData(form) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'post',
            url: '/api/update',
            data: form.serialize(), // serializes the form's elements.
            success: data => data.hasOwnProperty('error') ?
                reject(data) :
                resolve(data)
        });
    });
}

module.exports.initOrderForm = () => {
    const orderingForm = $('.js-ordering-form');

    if (orderingForm.length === 0) {
        console.log('NO ordering form');
        return;
    }

    orderingForm.on('submit', evt => {
        evt.preventDefault();

        updateUserData(orderingForm).then(console.log);
    });
};
