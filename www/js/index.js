/* global document */
require('./../style/css/_root.scss');

const FastClick = require('fastclick');

const homeScripts = require('./home');

window.addEventListener('load', () => {
    new FastClick(document.body); // eslint-disable-line no-new
    homeScripts.initSwiper();
});
