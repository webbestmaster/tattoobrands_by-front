/* global document, fetch */
const Swiper = require('./lib/idangerous.swiper');
const $ = require('jquery');
const {ProductPreview} = require('./component/product-preview');

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

/*
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
*/

module.exports.productReview = () => {
    $('.js-product-preview').on('contextmenu', evt => evt.preventDefault());
};


const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');

class Categories extends Component {
    constructor() {
        super();

        const view = this;
        const {app} = window;
        const {categoryTree} = app;

        view.state = {
            categoryTree: JSON.parse(JSON.stringify(categoryTree))
        };
    }

    render() {
        const view = this;
        const {state} = view;
        const {categoryTree} = state;
        const {categories} = categoryTree;

        return <div>
            {categories.map((category, ii) => <Category key={ii} category={category}/>)}
        </div>;
    }
}

class Category extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            products: []
        };
    }

    getProducts() {
        const view = this;
        const {props} = view;
        const {category} = props;

        fetch('/api/get-products-by-ids/' + category.products.join(';'))
            .then(data => data.json())
            .then(({products}) => view.setState({products}, () => console.log('TODO: ADD SWIPE HERE')));
    }

    componentDidMount() {
        const view = this;

        view.getProducts();
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {products} = state;
        const {category} = props;
        const {name, displayName} = category;
        const visibleCategoryName = displayName || name;

        return <div>
            <h3>{visibleCategoryName}</h3>
            {products.map(product => <ProductPreview key={product.slug} product={product}/>)}
        </div>;
    }
}

module.exports.initCategories = () => {
    const wrapper = document.querySelector('.js-category-list-wrapper');
    const {categoryTree} = window.app;

    if (!wrapper || !categoryTree) {
        return;
    }

    ReactDOM.render(
        <Categories/>,
        wrapper
    );
};
