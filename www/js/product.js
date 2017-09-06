/* global document */
const Swiper = require('./lib/idangerous.swiper');
const $ = require('jquery');

module.exports.initSwiper = () => {
    function onSwiperResize(swiper) {
        const {wrapper, container, slides} = swiper;
        const size = container.clientWidth + 'px';
        const nodes = [wrapper, container].concat(slides);

        nodes.forEach(node => Object.assign(node.style, {height: size}));
    }

    const productSwiper = new Swiper('.js-product-swiper-wrapper', {
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
        mousewheelControl: true,
        onInit: onSwiperResize,
        onAfterResize: onSwiperResize
    });

    console.log('product swiper is here ->', productSwiper);
};

