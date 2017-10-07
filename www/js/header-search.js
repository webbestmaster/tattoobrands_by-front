/* global document, setTimeout, location */
const React = require('react');
const ReactDOM = require('react-dom');
const classnames = require('classnames');
const {normalizeString} = require('./my-lib/format');
const {SearchPage} = require('./search-page');

class HeaderSearch extends SearchPage {
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

    renderList() {
        const view = this;
        const {state} = view;
        const {products, hasFocus, query} = state;

        if (!hasFocus || !query) {
            return null;
        }

        if (!products.length) {
            return <div className="header-search__result-list header-search__result-list--search-empty">
                По запросу<span className="bold"> "{query}" </span>ничего не найдено
            </div>;
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

    onFormSubmit(evt) {
        evt.preventDefault();

        const view = this;
        const {searchInput} = view.refs;
        const query = normalizeString(searchInput.value);

        Object.assign(location, {href: '/search?query=' + query});
    }

    render() {
        const view = this;
        const {state} = view;
        const {isInProgress} = state;

        const searchIconClassName = classnames('header-search__icon', {
            'header-search__icon--in-progress': isInProgress
        });

        return <form className="header-search" onSubmit={evt => view.onFormSubmit(evt)} ref="form">
            <input
                ref="searchInput"
                className="header-search__input"
                placeholder="Поиск..."
                onInput={evt => view.onSearchInput()}
                onFocus={() => {
                    view.onSearchInput();
                    view.setState({hasFocus: true});
                }}
                onBlur={() => setTimeout(() => view.setState({hasFocus: false}), 300)}
            />
            <div onClick={evt => view.onFormSubmit(evt)} className={searchIconClassName}/>
            {view.renderList()}
        </form>;
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
