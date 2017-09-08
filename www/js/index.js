/* global document */
require('./../style/css/_root.scss');

window.app = window.app || {};

const FastClick = require('fastclick');
const $ = require('jquery');

const homeScripts = require('./home');
const productScripts = require('./product');

$(() => {
    // main part
    new FastClick(document.body); // eslint-disable-line no-new

    // home
    homeScripts.initSwiper();
    homeScripts.initPagination();

    // product
    productScripts.initSwiper();
    productScripts.initSwiperZoom();
});
