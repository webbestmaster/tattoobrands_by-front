/* global document */
const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');
const find = require('lodash/find');
// const {browser} = require('./my-lib/browser');

window.app = window.app || {};

class TabContent extends Component {
    render() {
        const view = this;
        const {props} = view;
        const {category} = props;
        const {categories} = category;

        return <div className="header-nav__tab-wrapper">
            <div className="width-limiter">
                {categories.map(({image, displayName, name, slug}) =>
                    <a href={'/category/' + slug} className="category-item">
                        <h3>{displayName || name}</h3>
                        <img src={image} alt={displayName || name}/>
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
            activeCategorySlug: null
        };
    }

    openTab(slug) {
        const view = this;

        view.setState({activeCategorySlug: slug});
    }

    closeTabs() {
        const view = this;

        view.setState({activeCategorySlug: null});
    }

    render() {
        const view = this;
        const {state} = view;
        const {categoryTree} = state;
        const activeCategory = find(categoryTree.categories, {slug: state.activeCategorySlug}) ||
            categoryTree.categories.sort((category1, category2) => category1.order - category2.order)[0];

        return <div>
            {categoryTree.categories
                .sort((category1, category2) => category1.order - category2.order)
                .map(({displayName, name, slug}) => <a
                    href={'/category/slug'}
                    onMouseEnter={() => view.openTab(slug)}
                    onMouseLeave={() => view.closeTabs()}
                    key={slug} className="header-nav__link">
                    {displayName || name}
                </a>)
            }

            {activeCategory && <TabContent category={activeCategory}/>}
        </div>;
    }
}

module.exports.initHeaderNav = () => {
    const wrapper = document.querySelector('.js-header-nav');

    if (!wrapper) {
        return;
    }

    ReactDOM.render(
        <HeaderNav/>,
        wrapper
    );
};
