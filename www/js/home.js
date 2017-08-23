const Swiper = require('./lib/idangerous.swiper');

module.exports.initSwiper = () => {
    const swiperWrapperNode = window.document.querySelector('.js-home-swiper-wrapper.home-swiper-wrapper');

    if (!swiperWrapperNode) {
        console.log('swiper container node is not exist');
        return;
    }

    const swiper = new Swiper(swiperWrapperNode, {
        pagination: '.swiper-pagination',
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        paginationClickable: true,
        // spaceBetween: 30,
        centeredSlides: true,
        autoplay: 6000,
        autoplayDisableOnInteraction: false,
        loop: true
    });

    console.log('swiper is here ->', swiper);
};
