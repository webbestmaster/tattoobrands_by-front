/* global document */
require('./../style/css/_root.scss');

window.app = window.app || {};

const FastClick = require('fastclick');
const $ = require('jquery');

const homeScripts = require('./home');

$(() => {
    new FastClick(document.body); // eslint-disable-line no-new
    homeScripts.initSwiper();
    homeScripts.initPagination();
});
