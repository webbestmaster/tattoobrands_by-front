/* global fetch */
const $ = require('jquery');

module.exports.showCost = () => {
    const variantLinks = $('.js-variant-link');
    const variantIds = [];

    variantLinks.each((ii, node) => variantIds.push(node.getAttribute('data-product-id')));

    if (variantIds.length === 0) {
        console.log('no variant links');
        return;
    }

    fetch('/api/get-products-by-ids/' + variantIds.join(';'))
        .then(data => data.json())
        .then(({products}) => {
            products.forEach(product => {
                const variantLink = $('.js-variant-link[data-product-id=' + product._id + ']'); // eslint-disable-line no-underscore-dangle

                variantLink.find('.js-variant-link_cost').text(' (' + product.price + ' р)');

                if (product.state !== 'in-stock') {
                    variantLink.addClass('variant-link--not-in-stock');
                }
            });
        })
        .catch(() => console.log('can not get product from /api/get-products-by-ids/'));
};
