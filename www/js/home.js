const Swiper = require('./lib/idangerous.swiper');
// const $ = require('jbone');

module.exports.initSwiper = () => {
    /*
        const swiperWrapperNode = $('.js-home-swiper-wrapper.home-swiper-wrapper');

        if (!swiperWrapperNode.length) {
            console.log('swiper container node is not exist');
            return;
        }
    */

    const swiper = new Swiper('.js-home-swiper-wrapper.home-swiper-wrapper', {
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

    console.log('swiper is here ->', swiper);
};
