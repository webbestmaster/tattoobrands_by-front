/* global document */
const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');
const {search} = require('./my-lib/search');
const {normalizeString} = require('./my-lib/format');
const {getUrlQuery} = require('./my-lib/query-parameter');
const classnames = require('classnames');

class SearchPage extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            query: '',
            products: [],
            isInProgress: false
        };
    }

    componentDidMount() {
        const view = this;
        const {query = ''} = getUrlQuery();
        const {searchInput} = view.refs;

        searchInput.value = decodeURI(query);
        view.onSearchInput();
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
        const {products, query} = state;

        if (!query) {
            return <h3 className="page-header">Введите запрос для поиска!</h3>;
        }

        if (!products.length) {
            return <h3 className="page-header">Ничего не найдено!</h3>;
        }

        return products.map(({slug, name, description, images, price, promotable}) =>
            <a onContextMenu={evt => evt.preventDefault()}
                href={'/product/' + slug}
                className={classnames('product-preview', {'product-preview--promotable': promotable})}
                key={slug}>
                <div className="product-preview__image"
                    style={{backgroundImage: 'url(' + images[0] + ')'}}/>
                <h3 className="product-preview__name">{name}</h3>
                <div className="product-preview__description">{description}</div>
                <span className="product-preview__price">{price} руб.</span>
            </a>);
    }

    render() {
        const view = this;
        const {state} = view;
        const {isInProgress} = state;

        return <div className="search-page">
            <input
                ref="searchInput"
                className="search-page__input"
                placeholder="Поиск..."
                onInput={evt => view.onSearchInput()}
            />
            <div className="products-preview" style={{opacity: isInProgress ? 0.5 : 1}}>
                {view.renderList()}
            </div>
        </div>;
    }
}

module.exports.initPage = () => {
    const wrapper = document.querySelector('.js-search-page-result');

    if (!wrapper) {
        return;
    }

    ReactDOM.render(
        <SearchPage/>,
        wrapper
    );
};

