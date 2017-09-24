/* global document */
const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');
// const {browser} = require('./my-lib/browser');

window.app = window.app || {};

class TabContent extends Component {
    render() {
        const view = this;
        const {props} = view;
        const {content} = props;

        return <div className="header-nav__tab-content">

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
            categoryTree: JSON.parse(JSON.stringify(categoryTree))
        };
    }

    render() {
        const view = this;
        const {state} = view;
        const {categoryTree} = state;

        return <div>
            {categoryTree.categories
                .sort((category1, category2) => category1.order - category2.order)
                .map(category =>
                    <div key={category.slug} className="header-nav__link">
                        {category.displayName || category.name}
                    </div>)
            }
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
