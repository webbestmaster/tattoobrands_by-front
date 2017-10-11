/* global document, Event */
const Swiper = require('./lib/idangerous.swiper');
const $ = require('jquery');

const {loadImages} = require('./helper/image');

module.exports.initSwiper = () => {
    const productSwiperImages = $('.js-product-swiper-img');
    const productSwiperWrapper = $('.js-product-swiper-wrapper');

    if (productSwiperImages.length <= 1) {
        productSwiperWrapper.addClass('product-swiper-wrapper--one-image');
        console.log('no product swiper, here is one image');
        return;
    }

    loadImages(Array.prototype.slice.call(productSwiperImages).map(({src}) => src)) // eslint-disable-line prefer-reflect
        .then(images => {
            const maxHeightImage = images.sort((image0, image1) => image1.height - image0.height)[0];

            function onSwiperResize(swiper) {
                const {wrapper, container, slides} = swiper;
                const size = Math.min(maxHeightImage.height, container.clientWidth) + 'px';
                const nodes = [wrapper, container].concat(slides);

                nodes.forEach(node => Object.assign(node.style, {height: size}));
            }

            const productSwiper = new Swiper(productSwiperWrapper[0], {
                pagination: '.swiper-pagination',
                // nextButton: '.swiper-button-next',
                // prevButton: '.swiper-button-prev',
                paginationClickable: true,
                // spaceBetween: 30,
                centeredSlides: true,
                autoplay: 6000,
                autoplayDisableOnInteraction: false,
                loop: true,
                keyboardControl: true,
                onInit: onSwiperResize,
                onAfterResize: onSwiperResize
            });

            console.log('product swiper is here ->', productSwiper);
        });
};

module.exports.initSwiperZoom = () => {
    const product = $('.js-product');
    const win = window;
    const fullPageClassName = 'product--full-page';

    function onWindowResize() {
        if (product.hasClass(fullPageClassName)) {
            return;
        }

        if (win.document.documentElement.clientWidth < 980) {
            product.addClass(fullPageClassName);
            return;
        }

        product.removeClass(fullPageClassName);
    }

    onWindowResize();

    $(win).on('resize', onWindowResize);

    $('.js-product-swiper-wrapper').on('dblclick', () => {
        product.toggleClass(fullPageClassName);
        win.dispatchEvent(new Event('resize'));
    });
};

module.exports.initAddToBasketForm = () => {
    const win = window;

    win.app = win.app || {};

    const {app} = win;
    const {product = null} = app;

    if (!product) {
        console.log('no add to basket form');
        return;
    }

    const form = $('.js-add-to-basket-form');

    form.on('submit', evt => {
        evt.preventDefault();

        const {basket} = app;

        basket.change(product, Number(form.find('.js-count').val()));

        $.snackbar({
            content: 'Товар добавлен в корзину!', // text of the snackbar
            style: 'snackbar', // add a custom class to your snackbar
            timeout: 3e3// time in milliseconds after the snackbar autohides, 0 is disabled
        });
    });
};

function hasCategoryTheProduct(category, productId) {
    return category.products.indexOf(productId) !== -1;
}

function findProductPath(category, productId, passList, callBack, watcher) {
    const currentPassList = JSON.parse(JSON.stringify(passList));
    const {slug, name, displayName} = category;

    currentPassList.push({slug, name, displayName});

    if (hasCategoryTheProduct(category, productId) && watcher.hasResult === false) {
        currentPassList.shift();
        callBack(currentPassList);
        Object.assign(watcher, {hasResult: true});
        return true; // stop outside loop
    }

    category
        .categories
        .some(subCategory => findProductPath(subCategory, productId, currentPassList, callBack, watcher));

    // check for top category and for no result
    if (currentPassList.length === 1 && watcher.hasResult === false) {
        callBack(null);
    }

    return false; // continue outside loop
}

function getCategoriesPath(productId) {
    const {app} = window;
    const categoryTree = JSON.parse(JSON.stringify(app.categoryTree));
    const resultObject = {};

    findProductPath(categoryTree, productId, [], result => Object.assign(resultObject, {result}), {hasResult: false});

    return resultObject.result;
}

module.exports.initBreadCrumbs = () => {
    const wrapper = document.querySelector('.js-bread-crumbs');

    if (!wrapper) {
        console.log('no wrapper for bread-crumbs');
        return;
    }

    const {app} = window;
    const product = JSON.parse(JSON.stringify(app.product));

    const categoriesPass = getCategoriesPath(product._id); // eslint-disable-line no-underscore-dangle

    if (categoriesPass === null) {
        console.error('Can NOT create bread crumbs for product');
        return;
    }

    const categoryHtml = categoriesPass
        .map(({slug, name, displayName}) =>
            '<a class="bread-crumbs__link" href="{{href}}">{{name}}</a>'
                .replace('{{href}}', '/category/' + slug)
                .replace('{{name}}', displayName || name) +
            '<span class="bread-crumbs__separator">&gt;</span>'
        )
        .join('');

    const productHtml = '<a class="bread-crumbs__link secondary-color" href="{{href}}">{{name}}</a>'
        .replace('{{href}}', '/product/' + product.slug)
        .replace('{{name}}', product.displayName || product.name);

    wrapper.innerHTML = categoryHtml + productHtml;
};
