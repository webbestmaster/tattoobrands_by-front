require('./../style/css/_root.scss');

const homeScripts = require('./home');

window.addEventListener('load', () => {
    homeScripts.initSwiper();
});
