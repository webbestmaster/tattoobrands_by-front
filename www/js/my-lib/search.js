/* global fetch, setTimeout */

const emptyQuery = '';

const promiseCache = {
    [emptyQuery]: Promise.resolve({products: []})
};

function search(query) {
    if (promiseCache.hasOwnProperty(query)) {
        return promiseCache[query];
    }

    promiseCache[query] = fetch('/api/search?query=' + query)
        .then(rawResult => rawResult.json());

    return promiseCache[query];
}

module.exports.search = search;

function sortProduct(products, query) {
    return products
        .sort((product1, product2) => {
            const delta = product1.name.search(new RegExp(query, 'gi')) -
                product2.name.search(new RegExp(query, 'gi'));

            if (delta) {
                return delta;
            }

            return product1.name > product2.name ? 0.5 : -0.5;
        });
}

module.exports.sortProduct = sortProduct;
