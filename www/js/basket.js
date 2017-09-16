const Basket = require('./my-lib/basket');

module.exports.initBasket = () => {
    const basket = new Basket();
    const win = window;

    win.app = win.app || {};
    win.app.basket = basket;
};
