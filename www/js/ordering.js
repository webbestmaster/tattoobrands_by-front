/* global location */
const $ = require('jquery');
const {showError} = require('./authorization');

function createOrder(form) {
    return new Promise((resolve, reject) => {
        const serializedForm = form.serializeToJSON();
        const basketItems = window.app.basket.getItems();
        const products = basketItems
            .map(({slug, name, count}) => JSON.stringify({slug, name, count})
                .replace(/":/g, '": ')
                .replace(/^{|}$/g, '')
                .replace(/",\s?"/g, '"; "')
                .replace(/"([\S\s]+?)"/g, '$1')
            );

        $.ajax({
            type: 'post',
            url: '/api/create-order',
            data: {
                ...serializedForm,
                products,
                basketItems: JSON.stringify(basketItems)
            }, // serializes the form's elements.
            success: data => data.hasOwnProperty('error') ?
                reject(data) :
                resolve(data)
        });
    });
}

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

        updateUserData(orderingForm)
            .then(() => createOrder(orderingForm))
            .then(data => {
                window.app.basket.clear();
                Object.assign(location, {href: '/order/' + data.slug});
            })
            .catch(showError);
    });
};
