// added here to avoid added they to main.js
// if you know better way, please, talk to me. BR, Dmitry Turvotsov

// polyfill
require('./lib/polyfill/es5-shim');
require('./lib/polyfill/es5-sham');
require('./lib/polyfill/json3');
require('./lib/polyfill/es6-shim');
require('./lib/polyfill/es6-sham.min');
require('./lib/polyfill/es7-shim');

const jQuery = require('jquery');

Object.assign(window, {
    jQuery,
    $: jQuery
});

require('./lib/jquery.twbs-pagination');
require('./lib/idangerous.swiper');
require('./lib/snackbar');
require('./my-lib/basket');
require('./my-lib/format');
require('./my-lib/query-parameter');
require('./my-lib/jquery-extension');
require('lodash/find');
require('react');
require('react-dom');
require('fastclick');
// require('./lib/pagination');
