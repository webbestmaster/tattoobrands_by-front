/* global document */
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
            return <h1>Корзина пуста</h1>;
        }

        return <form>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Описание Товара</th>
                        <th>Кол-во</th>
                        <th>Цена (руб.)</th>
                        <th>Сумма (руб.)</th>
                        <th>X</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((product, ii) => <tr key={ii}>
                        <td>{ii + 1}</td>
                        <td>{product.images[0]} {product.name} {product.article} {product.slug}</td>
                        <td>
                            <input
                                className="input input--number"
                                type="number"
                                min="1"
                                defaultValue={product.count}
                                onBlur={onInputNumberBlur}
                                onChange={evt =>
                                    view.onInputChange(product.slug, parseInt(evt.currentTarget.value, 10) || 1)}
                                required/>
                        </td>
                        <td>{product.price}</td>
                        <td>{numberToMoney(product.count * product.price)}</td>
                        <td><span onClick={evt => view.onInputChange(product.slug, 0)}>XXX</span></td>
                    </tr>)}
                    <tr>
                        <td colSpan="3">Итого:</td>
                        <td colSpan="3">{numberToMoney(window.app.basket.getFullPrice())}</td>
                    </tr>
                </tbody>
            </table>

            <button>оформить заказ</button>
            <div>назад</div>
        </form>;
    }
}

function onInputNumberBlur(evt) {
    const input = evt.currentTarget;
    const value = parseInt(input.value, 10) || 0;

    if (value <= 0) {
        input.value = 1;
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

