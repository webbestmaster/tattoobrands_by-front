/* global fetch, setTimeout */

const searchCache = {};

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
