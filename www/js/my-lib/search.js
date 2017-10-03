/* global fetch */

const searchCache = {};

function search(query) {
    if (searchCache.hasOwnProperty(query)) {
        return Promise.resolve(searchCache[query]);
    }

    return fetch('/api/search?query=' + query)
        .then(rawResult => rawResult.json())
        .then(result => {
            Object.assign(searchCache, {[query]: result});

            return result;
        });
}

module.exports.search = search;
