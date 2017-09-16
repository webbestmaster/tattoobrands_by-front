/* global document */
require('./../style/css/_root.scss');

window.app = window.app || {};

const FastClick = require('fastclick');
const $ = require('jquery');

const homeScripts = require('./home');
const productScripts = require('./product');
const authorizationScripts = require('./authorization');
const basketScripts = require('./basket');
const cartScripts = require('./cart');

$(() => {
    // main part
    new FastClick(document.body); // eslint-disable-line no-new

    // home
    homeScripts.initSwiper();
    homeScripts.initPagination();
    homeScripts.productReview();

    // product
    productScripts.initSwiper();
    productScripts.initSwiperZoom();
    productScripts.initAddToBasketForm();

    // authorization
    authorizationScripts.initAuthorizationForm();

    // basket
    basketScripts.initBasket();

    // cart
    cartScripts.initCartTable();
});
