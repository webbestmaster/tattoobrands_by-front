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
const orderingScripts = require('./ordering');
const orderScripts = require('./order');
const headerScripts = require('./header-nav');
const headerSearchScripts = require('./header-search');

$(() => {
    // main part
    new FastClick(document.body); // eslint-disable-line no-new

    // main scripts
    headerScripts.initHeaderNav();

    // search
    headerSearchScripts.initHeaderSearch();

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

    // ordering
    orderingScripts.initOrderForm();

    // order
    orderScripts.initOrderTable();
    orderScripts.initPdfOrder();
});
