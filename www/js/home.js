/* global document, fetch */
const Swiper = require('./lib/swiper');
const $ = require('jquery');
const {ProductPreview} = require('./component/product-preview');

module.exports.initSwiper = () => {
    const cssInitialClass = 'home-swiper-wrapper--wait-for-init';

    $('.' + cssInitialClass).removeClass(cssInitialClass);

    function onSwiperResize() {
        // count height
        // const slideHeight = 261;
        // const slideWidth = 980;
        const swiper = this; // eslint-disable-line no-invalid-this
        const slideHeight = 325;
        const slideWidth = 1220;
        const width = document.documentElement.clientWidth;
        const neededHeight = Math.min(Math.round(slideHeight * width / slideWidth), slideHeight);
        const neededHeightPx = neededHeight + 'px';

        // get nodes
        const {$wrapperEl, $el, slides} = swiper;
        const nodes = [$wrapperEl, $el].concat(slides);

        nodes.forEach(node => node.css({height: neededHeightPx}));
    }

    const homeSwiper = new Swiper('.js-home-swiper-wrapper', {
        pagination: {
            el: '.js-home-swiper-wrapper .swiper-pagination', // eslint-disable-line id-length
            clickable: true
        },
        on: { // eslint-disable-line id-length
            init: onSwiperResize,
            resize: onSwiperResize
        },
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        // paginationClickable: true,
        // spaceBetween: 30,
        // centeredSlides: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        loop: true
        // onInit: onSwiperResize,
        // onAfterResize: onSwiperResize
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

        return [
            <PromoCategory key="promo-category"/>,
            categories.map((category, ii) => <Category key={ii} category={category}/>)
        ];
    }
}

class Category extends Component {
    attr = {
        swiper: null,
        listItemLimit: 10
    }

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

        fetch('/api/get-products-by-ids/' + category.products.slice(0, view.attr.listItemLimit).join(';'))
            .then(data => data.json())
            .then(({products}) => view.setState({products}, () => view.makeSwiper()))
            .catch(() => console.log('can not get product from /api/get-products-by-ids/'));
    }

    componentDidMount() {
        const view = this;

        view.getProducts();
    }

    makeSwiper() {
        const view = this;
        const {props} = view;
        const {category} = props;

        view.attr.swiper = new Swiper('.js-category-swiper-container--' + category.slug, {
            slidesPerView: 'auto',
            freeMode: true
        });
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {products} = state;
        const {category} = props;
        const {name, displayName} = category;
        const visibleCategoryName = displayName || name;

        // TODO: fix several <br />

        return [
            <a key="category-header"
                href={'/category/' + category.slug}
                className="category-row__header">
                {visibleCategoryName}
            </a>,
            <div key="category-content"
                className={
                    'swiper-container category-swiper-container js-category-swiper-container--' + category.slug
                }>
                <div className="swiper-wrapper">
                    {products.map(product =>
                        <div key={product.slug} className="swiper-slide">
                            <ProductPreview key={product.slug} product={product}/>
                        </div>
                    )}
                    <div className="swiper-slide">
                        <a href={'/category/' + category.slug} className="product-preview">
                            <div className="product-preview__image product-preview__image--go-to-category"/>
                            <h3 className="product-preview__name">{visibleCategoryName}</h3>
                            <div className="product-preview__description ta-center">
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <h1>Перейти в категорию</h1>
                            </div>
                        </a>
                    </div>
                </div>
            </div>];
    }
}

class PromoCategory extends Category {
    constructor() {
        super();

        const view = this;

        view.state = {
            products: []
        };
    }

    getProducts() {
        const view = this;

        fetch('/api/get-promo-products/')
            .then(data => data.json())
            .then(({products}) => view.setState({products}, () => view.makeSwiper()));
    }

    componentDidMount() {
        const view = this;

        view.getProducts();
    }

    makeSwiper() {
        const view = this;

        view.attr.swiper = new Swiper('.js-category-swiper-container--promo-product', {
            slidesPerView: 'auto',
            freeMode: true
        });
    }

    render() {
        const view = this;
        const {state} = view;
        const {products} = state;

        // TODO: fix several <br />
        return [
            <a key="category-header"
                href="/promo-products"
                className="category-row__header">Промо товары</a>,
            <div key="category-content"
                className={'swiper-container category-swiper-container js-category-swiper-container--promo-product'}>
                <div className="swiper-wrapper">
                    {products.map(product =>
                        <div key={product.slug} className="swiper-slide">
                            <ProductPreview key={product.slug} product={product}/>
                        </div>
                    )}
                    <div className="swiper-slide">
                        <a href="/promo-products"
                            className="product-preview">
                            <div className="product-preview__image product-preview__image--promo-preview-image"/>
                            <h3 className="product-preview__name">Промо товары</h3>
                            <div className="product-preview__description ta-center">
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <h1>Перейти в промо товары</h1>
                            </div>
                        </a>
                    </div>
                </div>
            </div>];
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
