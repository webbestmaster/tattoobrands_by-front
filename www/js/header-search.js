/* global document, setTimeout */
const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');
const classnames = require('classnames');
const {search} = require('./my-lib/search');
const {normalizeString} = require('./my-lib/format');

window.app = window.app || {};

class HeaderSearch extends Component {
    constructor() {
        super();
        const view = this;

        view.state = {
            query: '',
            products: [],
            isInProgress: false,
            hasFocus: false
        };
    }

    onSearchInput() {
        const view = this;
        const {searchInput} = view.refs;
        const query = normalizeString(searchInput.value);

        view.setState({isInProgress: true});

        search(query)
            .then(searchResult => {
                if (query !== normalizeString(searchInput.value)) {
                    return;
                }

                const {products} = searchResult;
                const sortedProducts = products
                    .sort((product1, product2) =>
                        product1.name.search(new RegExp(query, 'gi')) -
                        product2.name.search(new RegExp(query, 'gi'))
                    );

                view.setState({
                    products: sortedProducts,
                    query,
                    isInProgress: false
                });
            });
    }

    renderList() {
        const view = this;
        const {state} = view;
        const {products, hasFocus} = state;

        if (!products.length || !hasFocus) {
            return null;
        }

        return <div className="header-search__result-list">
            {products.map(({slug, name, description, images}) =>
                <a href={'/product/' + slug} className="header-search__result-item clear-full"
                    key={slug}>
                    <div className="header-search__result-image" style={{backgroundImage: 'url(' + images[0] + ')'}}/>
                    <h4 className="header-search__result-name">{name}</h4>
                    <p className="header-search__result-description">{description}</p>
                </a>)}
        </div>;
    }

    render() {
        const view = this;
        const {state} = view;
        const {isInProgress} = state;

        const searchIconClassName = classnames('header-search__icon', {
            'header-search__icon--in-progress': isInProgress
        });

        return <div className="header-search">
            <input
                ref="searchInput"
                className="header-search__input"
                placeholder="Поиск..."
                onInput={evt => view.onSearchInput()}
                onFocus={() => view.setState({hasFocus: true})}
                onBlur={() => setTimeout(() => view.setState({hasFocus: false}), 300)}
            />
            <div className={searchIconClassName}/>
            {view.renderList()}
        </div>;
    }
}

module.exports.initHeaderSearch = () => {
    const wrapper = document.querySelector('.js-header-search');

    if (!wrapper) {
        return;
    }

    ReactDOM.render(
        <HeaderSearch/>,
        wrapper
    );
};


