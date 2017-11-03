/* global document, history*/
const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');
const {numberToMoney} = require('./my-lib/format');

window.app = window.app || {};

class CartTable extends Component {
    constructor() {
        super();

        const view = this;
        const {app} = window;
        const {basket} = app;

        view.state = {
            items: basket.getItems()
        };
    }

    onInputChange(slug, newCount) {
        const view = this;
        const {app} = window;
        const {basket} = app;

        basket.set({slug}, newCount);
        view.setState({
            items: basket.getItems()
        });
    }

    render() {
        const view = this;
        const {state} = view;
        const {items} = state;

        if (items.length === 0) {
            return <h2 className="page-header">Корзина пуста</h2>;
        }

        return <div>
            <div className="cart">
                <table className="table">
                    <thead className="table__head">
                        <tr>
                            <th className="table__th">№</th>
                            <th className="table__th">Наименование товара</th>
                            <th className="table__th">Кол-во</th>
                            <th className="table__th">Цена (руб.)</th>
                            <th className="table__th">Сумма (руб.)</th>
                            <th className="table__th"/>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((product, ii) => <tr className="table__tr" key={ii}>
                            <td className="table__td table__td--ta-center">{ii + 1}</td>
                            <td className="table__td">
                                <div className="table__product-image"
                                    style={{backgroundImage: 'url(' + product.images[0] + ')'}}/>
                                <a href={'/product/' + product.slug} className="table__product-name">{product.name}</a>
                                <p className="table__product-article">
                                    Артикул: {product.article} {renderProductState(product)}
                                </p>
                            </td>
                            <td className="table__td">
                                <input
                                    className="input input--number block-center"
                                    type="number"
                                    min="1"
                                    defaultValue={product.count}
                                    onBlur={onInputNumberBlur}
                                    onChange={evt =>
                                        view.onInputChange(product.slug, parseInt(evt.currentTarget.value, 10) || 1)}
                                    required/>
                            </td>
                            <td className="table__td table__td--ta-right">
                                <span className="table__number">
                                    {numberToMoney(product.price)}
                                </span>
                            </td>
                            <td className="table__td table__td--ta-right">
                                <span className="table__number">
                                    {numberToMoney(product.count * product.price)}
                                </span>
                            </td>
                            <td className="table__td">
                                <span onClick={evt => view.onInputChange(product.slug, 0)} className="table__close"/>
                            </td>
                        </tr>)}
                        <tr>
                            <td colSpan="3">
                                <span className="table__number bold">
                                Итого:
                                </span>
                            </td>
                            <td colSpan="2">
                                <span className="table__number table__number--left bold">
                                    {numberToMoney(window.app.basket.getFullPrice())} руб.
                                </span>
                            </td>
                            <td/>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="buttons-wrapper">
                <button className="button" onClick={() => history.back()}>продолжить покупки</button>
                <a href="/ordering" className="button">оформить заказ</a>
            </div>
        </div>;
    }
}

function onInputNumberBlur(evt) {
    const input = evt.currentTarget;
    const value = parseInt(input.value, 10) || 0;

    if (value <= 0) {
        input.value = 1;
    }
}

function renderProductState(product) {
    switch (product.state) {
        case 'expected':
            return <span className="secondary-color">(ожидается)</span>;
        case 'under-the-order':
            return <span className="secondary-color">(под заказ)</span>;
        default:
            return null;
    }
}

module.exports.initCartTable = () => {
    const wrapper = document.querySelector('.js-table-cart');

    if (!wrapper) {
        return;
    }

    ReactDOM.render(
        <CartTable/>,
        wrapper
    );
};

