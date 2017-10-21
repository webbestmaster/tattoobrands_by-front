/* global document */
const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');
// const find = require('lodash/find');
// const {browser} = require('./my-lib/browser');

window.app = window.app || {};

class CategoryMenuItem extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            isOpen: false
        };
    }

    render() {
        const view = this;
        const {state, props} = view;
        const {isOpen} = state;
        const {category} = props;
        const {slug, name, displayName, categories} = category;
        const visibleName = displayName || name;

        if (categories.length === 0) {
            return <div className="category-menu__item">
                <a className="category-menu__link" href={'/category/' + slug}>{visibleName}</a>
            </div>;
        }

        return <div className="category-menu__item">
            <div className="category-menu__opener" onClick={() => view.setState({isOpen: !isOpen})}>
                {isOpen ? '-' : '+'}
            </div>
            <a className="category-menu__link"
                href={'/category/' + slug}>{visibleName}</a>
            {isOpen && <div className="category-menu__sub-category-wrapper">
                {categories.map(childCategory => <CategoryMenuItem category={childCategory} key={childCategory.slug}/>)}
            </div>}
        </div>;
    }
}

class CategoryMenu extends Component {
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

        return categoryTree.categories.map(category => <CategoryMenuItem key={category.slug} category={category}/>);
    }
}

module.exports.initCategoryMenu = () => {
    const wrapper = document.querySelector('.js-category-menu');
    const {categoryTree} = window.app;

    if (!wrapper || !categoryTree) {
        return;
    }

    ReactDOM.render(
        <CategoryMenu/>,
        wrapper
    );
};
