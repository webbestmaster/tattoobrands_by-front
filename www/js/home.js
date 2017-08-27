/* global document */
const Swiper = require('./lib/idangerous.swiper');
// const $ = require('jbone');

module.exports.initSwiper = () => {
    function onSwiperResize(swiper) {
        // count height
        const slideHeight = 261;
        const slideWidth = 980;
        const width = document.documentElement.clientWidth;
        const neededHeight = Math.min(Math.round(slideHeight * width / slideWidth), slideHeight);
        const neededHeightPx = neededHeight + 'px';

        // get nodes
        const {wrapper, container, slides} = swiper;
        const nodes = [wrapper, container].concat(slides);

        nodes.forEach(node => Object.assign(node.style, {height: neededHeightPx}));
    }

    const homeSwiper = new Swiper('.js-home-swiper-wrapper.home-swiper-wrapper', {
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

    console.log('swiper is here ->', homeSwiper);
};
