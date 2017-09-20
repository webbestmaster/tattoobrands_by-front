/* global document, history*/
const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');
const {numberToMoney} = require('./my-lib/format');

window.app = window.app || {};

class OrderTable extends Component {
    constructor() {
        super();

        const view = this;
        const {app} = window;
        const {order} = app;

        view.state = {
            order
        };
    }

    getFullPrice() {
        const view = this;
        const items = view.state.order.basketItems;

        return items.reduce((accumulator, item) => accumulator + item.count * (item.price || 0), 0);
    }

    render() {
        const view = this;
        const {state} = view;
        const {order} = state;

        const items = order.basketItems;

        return <div className="cart">
            <table className="table">
                <thead className="table__head">
                    <tr>
                        <th className="table__th">№</th>
                        <th className="table__th">Наименование товара</th>
                        <th className="table__th">Кол-во</th>
                        <th className="table__th">Цена (руб.)</th>
                        <th className="table__th">Сумма (руб.)</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((product, ii) => <tr className="table__tr" key={ii}>
                        <td className="table__td table__td--ta-center">{ii + 1}</td>
                        <td className="table__td">
                            <div className="table__product-image"
                                style={{backgroundImage: 'url(' + product.images[0] + ')'}}/>
                            <a href={'/product/' + product.slug} className="table__product-name">{product.name}</a>
                            <p className="table__product-article">Артикул: {product.article}</p>
                        </td>
                        <td className="table__td">
                            <input
                                className="input input--number block-center"
                                type="number"
                                value={product.count}
                                disabled/>
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
                    </tr>)}
                    <tr>
                        <td colSpan="3">
                            <span className="table__number bold">
                                Итого:
                            </span>
                        </td>
                        <td colSpan="2">
                            <span className="table__number table__number--left bold">
                                {numberToMoney(view.getFullPrice())} руб.
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <form className="form clear-self">
                <h2 className="page-header">Платёжный адрес</h2>
                <label className="label">
                    <p className="label__text">Имя:</p>
                    <input className="input input--text" type="text" value={order.user.firstName} disabled/>
                </label>
                <label className="label">
                    <p className="label__text">Фамилия:</p>
                    <input className="input input--text" type="text" value={order.user.lastName} disabled/>
                </label>
                <label className="label">
                    <p className="label__text">Телефон:</p>
                    <input className="input input--text" type="text" value={order.phone} disabled/>
                </label>
                <label className="label">
                    <p className="label__text">Email:</p>
                    <input className="input input--text" type="text" value={order.user.email} disabled/>
                </label>
                <label className="label">
                    <p className="label__text">Страна:</p>
                    <input className="input input--text" type="text" value={order.country} disabled/>
                </label>
                <label className="label">
                    <p className="label__text">Область:</p>
                    <input className="input input--text" type="text" value={order.region} disabled/>
                </label>
                <label className="label">
                    <p className="label__text">Город:</p>
                    <input className="input input--text" type="text" value={order.town} disabled/>
                </label>
                <label className="label">
                    <p className="label__text">Адрес:</p>
                    <textarea className="input input--text" rows="5" value={order.address} disabled/>
                </label>
                <label className="label">
                    <p className="label__text">Индекс:</p>
                    <input className="input input--text" value={order.postcode} disabled/>
                </label>
                <label className="label">
                    <p className="label__text">Пожелания к заказу:</p>
                    <textarea className="input input--text" rows="5" value={order.additional} disabled/>
                </label>
            </form>
        </div>;
    }
}

module.exports.initOrderTable = () => {
    const wrapper = document.querySelector('.js-table-order');

    if (!wrapper) {
        return;
    }

    ReactDOM.render(
        <OrderTable/>,
        wrapper
    );
};

