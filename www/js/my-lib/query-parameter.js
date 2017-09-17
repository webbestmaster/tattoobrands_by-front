/* global location */
module.exports.getUrlQuery = () =>
    location.search.substr(1).split('&')
        .map(item => item.split('='))
        .reduce((accum, [key, value]) =>
            key ? Object.assign(accum, {[key]: value}) : accum, {});

