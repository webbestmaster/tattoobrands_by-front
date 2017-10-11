/* global document */
function hasCategoryTheCategory(category, slug) {
    return category.categories.some(subCategory => subCategory.slug === slug);
}

function findCategoryPath(category, categorySlug, passList, callBack, watcher) {
    const currentPassList = JSON.parse(JSON.stringify(passList));
    const {slug, name, displayName} = category;

    currentPassList.push({slug, name, displayName});

    if (hasCategoryTheCategory(category, categorySlug) && watcher.hasResult === false) {
        currentPassList.shift();
        callBack(currentPassList);
        Object.assign(watcher, {hasResult: true});
        return true; // stop outside loop
    }

    category
        .categories
        .some(subCategory => findCategoryPath(subCategory, categorySlug, currentPassList, callBack, watcher));

    // check for top category and for no result
    if (currentPassList.length === 1 && watcher.hasResult === false) {
        callBack(null);
    }

    return false; // continue outside loop
}

function getCategoriesPath(slug) {
    const {app} = window;
    const categoryTree = JSON.parse(JSON.stringify(app.categoryTree));
    const resultObject = {};

    findCategoryPath(categoryTree, slug, [], result => Object.assign(resultObject, {result}), {hasResult: false});

    return resultObject.result;
}

module.exports.initBreadCrumbs = () => {
    const wrapper = document.querySelector('.js-category-bread-crumbs');

    if (!wrapper) {
        console.log('no wrapper for bread-crumbs');
        return;
    }

    const {app} = window;
    const category = JSON.parse(JSON.stringify(app.category));

    const categoriesPass = getCategoriesPath(category.slug); // eslint-disable-line no-underscore-dangle

    if (categoriesPass === null) {
        console.error('Can NOT create bread crumbs for category');
        return;
    }

    if (categoriesPass.length === 0) {
        console.log('Sub root category - do not show bread crumbs');
        return;
    }

    categoriesPass.push({
        slug: category.slug,
        name: category.name,
        displayName: category.displayName
    });

    wrapper.innerHTML = categoriesPass
        .map(({slug, name, displayName}) =>
            '<a class="bread-crumbs__link" href="{{href}}">{{name}}</a>'
                .replace('{{href}}', '/category/' + slug)
                .replace('{{name}}', displayName || name)
        )
        .join('<span class="bread-crumbs__separator">&gt;</span>');
};
