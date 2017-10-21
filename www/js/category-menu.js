/* global document */
const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');
// const find = require('lodash/find');
// const {browser} = require('./my-lib/browser');

window.app = window.app || {};

class CategoryMenuItem extends Component {
    render() {
        const view = this;
        const {state, props} = view;
        const {category} = props;

        return <div>{category.slug}
            <hr/>
            {category.categories
                .map(childCategory => <CategoryMenuItem key={childCategory.slug} category={childCategory}/>)}
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
