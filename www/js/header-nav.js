/* global document */
const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');
const find = require('lodash/find');
// const {browser} = require('./my-lib/browser');

window.app = window.app || {};

const narrowWidth = 767;

class TabContent extends Component {
    render() {
        const view = this;
        const {props} = view;
        const {category} = props;
        const {categories} = category;

        if (categories.length === 0) {
            return null;
        }

        return <div className="header-nav__tab-wrapper">
            <div className="category-item__wrapper clear-self">
                {categories.map(({image, displayName, name, slug}) =>
                    <a key={slug} href={'/category/' + slug} className="category-item clear-self">
                        <span className="category-item__image" style={{backgroundImage: 'url(' + image + ')'}}/>
                        <p className="category-item__name">{displayName || name}</p>
                    </a>)}
            </div>
        </div>;
    }
}

class HeaderNav extends Component {
    constructor() {
        super();

        const view = this;
        const {app} = window;
        const {categoryTree} = app;

        view.state = {
            categoryTree: JSON.parse(JSON.stringify(categoryTree)),
            activeCategorySlug: null,
            isNarrow: false,
            wrapper: document.querySelector('.js-header-nav')
        };
    }

    componentWillUpdate(nextProps, nextState) {
        const view = this;
        const {state} = view;
        const {isNarrow} = state;
        const nextIsNarrow = nextState.isNarrow;

        if (isNarrow === nextIsNarrow) {
            return;
        }

        view.closeTabs();
    }

    componentDidUpdate() {
        const view = this;
        const {state} = view;
        const {wrapper, isNarrow} = state;

        if (isNarrow) {
            wrapper.classList.remove('header-nav__sticky');
        } else {
            wrapper.classList.add('header-nav__sticky');
        }
    }

    componentDidMount() {
        const view = this;

        view.bindEvents();
        view.onResize();
    }

    onResize() {
        const view = this;
        const isNarrow = document.documentElement.clientWidth < narrowWidth;

        view.setState({isNarrow});
    }

    bindEvents() {
        const view = this;

        window.addEventListener('resize', () => view.onResize(), false);
    }

    openTab(slug) {
        const view = this;

        view.setState({activeCategorySlug: slug});
    }

    closeTabs() {
        const view = this;

        view.setState({activeCategorySlug: null});
    }

    switchTab(slug) {
        const view = this;
        const {state} = view;
        const {activeCategorySlug} = state;
        const newSlug = activeCategorySlug === slug ? null : slug;

        view.setState({activeCategorySlug: newSlug});
    }

    narrowRender() {
        const view = this;
        const {state} = view;
        const {categoryTree} = state;
        const activeCategory = find(categoryTree.categories, {slug: state.activeCategorySlug});

        return <div>
            {categoryTree.categories
                .sort((category1, category2) => category1.order - category2.order)
                .map(({displayName, name, slug, categories}) => <div
                    className="header-nav__link header-nav__link--narrow"
                    key={slug}>
                    <a href={'/category/' + slug}
                        className="header-nav__active-element">
                        {displayName || name}
                    </a>
                    {categories.length === 0 ?
                        null :
                        <div className="header-nav__switch-button"
                            onClick={() => view.switchTab(slug)}>
                            {activeCategory && activeCategory.slug === slug ? '×' : '+'}
                        </div>
                    }
                    {activeCategory && activeCategory.slug === slug && <TabContent category={activeCategory}/>}
                </div>)
            }
        </div>;
    }

    render() {
        const view = this;
        const {state} = view;
        const {categoryTree, isNarrow} = state;
        const activeCategory = find(categoryTree.categories, {slug: state.activeCategorySlug});

        if (isNarrow) {
            return view.narrowRender();
        }

        return <div>
            {categoryTree.categories
                .sort((category1, category2) => category1.order - category2.order)
                .map(({displayName, name, slug}) => <div
                    className="header-nav__link"
                    onMouseEnter={() => view.openTab(slug)}
                    onMouseLeave={() => view.closeTabs()}
                    key={slug}>
                    <a href={'/category/' + slug}
                        className="header-nav__active-element">
                        {displayName || name}
                    </a>
                    {activeCategory && activeCategory.slug === slug && <TabContent category={activeCategory}/>}
                </div>)
            }
        </div>;
    }
}

module.exports.initHeaderNav = () => {
    const wrapper = document.querySelector('.js-header-nav');
    const {categoryTree} = window.app;

    if (!wrapper || !categoryTree) {
        return;
    }

    ReactDOM.render(
        <HeaderNav/>,
        wrapper
    );
};
