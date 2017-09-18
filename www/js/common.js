// added here to avoid added they to main.js
// if you know better way, please, talk to me. BR, Dmitry Turvotsov

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
require('lodash/find');
require('react');
require('react-dom');
require('fastclick');
// require('./lib/pagination');
