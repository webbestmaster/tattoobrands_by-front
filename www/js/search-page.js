/* global document */
const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');
const {search, sortProduct} = require('./my-lib/search');
const {normalizeString} = require('./my-lib/format');
const {getUrlQuery} = require('./my-lib/query-parameter');
const classnames = require('classnames');
const {saveScrollTop, restoreScrollTop} = require('./my-lib/screen');

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

        if (query) {
            view.onSearchInput();
        }
    }

    onSearchInput() {
        const view = this;
        const {searchInput} = view.refs;
        const query = normalizeString(searchInput.value);

        saveScrollTop();

        view.setState({isInProgress: true}, restoreScrollTop);

        search(query)
            .then(searchResult => {
                if (query !== normalizeString(searchInput.value)) {
                    return;
                }

                view.setState({
                    products: sortProduct(searchResult.products, query),
                    query,
                    isInProgress: false
                }, restoreScrollTop);
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
                <div className="product-preview__description" dangerouslySetInnerHTML={{__html: description}}/>
                <span className="product-preview__price">{price} руб.</span>
            </a>);
    }

    render() {
        const view = this;
        const {state} = view;
        const {isInProgress} = state;

        const searchIconClassName = classnames('header-search__icon', {
            'header-search__icon--in-progress': isInProgress
        });

        return <div className="search-page">
            <div className="search-page__input-wrapper">
                <input
                    ref="searchInput"
                    className="search-page__input"
                    placeholder="Поиск..."
                    onInput={evt => view.onSearchInput()}
                />
                <div onClick={() => view.refs.searchInput.focus()} className={searchIconClassName}/>
            </div>
            <div
                className={classnames(
                    'products-preview',
                    'search-page__result',
                    {'search-page__result--in-progress': isInProgress})
                }>
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

module.exports.SearchPage = SearchPage;
