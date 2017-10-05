/* global fetch, setTimeout */

const emptyQuery = '';

const searchCache = {
    [emptyQuery]: {products: []}
};

function search(query) {
    if (searchCache.hasOwnProperty(query)) {
        return new Promise(resolve => setTimeout(() => resolve(searchCache[query]), 0));
    }

    return fetch('/api/search?query=' + query)
        .then(rawResult => rawResult.json())
        .then(result => {
            Object.assign(searchCache, {[query]: result});

            return result;
        });
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
