/* global document, Event */
const Swiper = require('./lib/idangerous.swiper');
const $ = require('jquery');

import {loadImages} from './helper/image';

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
    $('.js-product-swiper-wrapper')
        .on('dblclick', () => {
            $('.js-product').toggleClass('product--full-page');
            window.dispatchEvent(new Event('resize'));
        });
};
