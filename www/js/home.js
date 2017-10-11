/* global document */
const Swiper = require('./lib/idangerous.swiper');
const $ = require('jquery');

module.exports.initSwiper = () => {
    const cssInitialClass = 'home-swiper-wrapper--wait-for-init';

    $('.' + cssInitialClass).removeClass(cssInitialClass);

    function onSwiperResize(swiper) {
        // count height
        // const slideHeight = 261;
        // const slideWidth = 980;
        const slideHeight = 325;
        const slideWidth = 1220;
        const width = document.documentElement.clientWidth;
        const neededHeight = Math.min(Math.round(slideHeight * width / slideWidth), slideHeight);
        const neededHeightPx = neededHeight + 'px';

        // get nodes
        const {wrapper, container, slides} = swiper;
        const nodes = [wrapper, container].concat(slides);

        nodes.forEach(node => Object.assign(node.style, {height: neededHeightPx}));
    }

    const homeSwiper = new Swiper('.js-home-swiper-wrapper', {
        pagination: '.swiper-pagination',
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        paginationClickable: true,
        // spaceBetween: 30,
        centeredSlides: true,
        autoplay: 6000,
        autoplayDisableOnInteraction: false,
        loop: true,
        onInit: onSwiperResize,
        onAfterResize: onSwiperResize
    });

    console.log('home swiper is here ->', homeSwiper);
};

module.exports.initPagination = () => {
    const {indexPagination} = window.app;

    if (!indexPagination) {
        console.log('no app.indexPagination');
        return;
    }

    const {totalPages, startPage} = indexPagination;
    const {location} = window;

    const paginationWrapper = $('.js-index-pagination');

    if (totalPages === 1) {
        paginationWrapper.remove();
        return;
    }

    paginationWrapper.twbsPagination({
        totalPages,
        startPage,

        initiateStartPageClick: false,
        visiblePages: 5,

        prev: '&#8672;',
        next: '&#8674;',

        first: '&#8676;',
        last: '&#8677;',

        onPageClick: (evt, page) => Object.assign(location, {search: 'page=' + page})
    });
};

module.exports.productReview = () => {
    $('.js-product-preview').on('contextmenu', evt => evt.preventDefault());
};
