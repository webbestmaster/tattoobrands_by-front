const $ = require('jquery');
const Basket = require('./my-lib/basket');

module.exports.initBasket = () => {
    const basket = new Basket({
        wrapper: $('.js-cart')[0],
        counter: $('.js-counter')[0],
        postfix: ' руб.',
        empty: 'Нет товаров'
    });

    const win = window;

    win.app = win.app || {};
    win.app.basket = basket;
};
