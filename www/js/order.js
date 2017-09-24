/* global document, history, navigator, URL, Blob, FormData*/
const React = require('react');
const {Component} = React;
const ReactDOM = require('react-dom');
const {numberToMoney} = require('./my-lib/format');
const $ = require('jquery');
const {browser} = require('./my-lib/browser');

window.app = window.app || {};

class OrderTable extends Component {
    constructor() {
        super();

        const view = this;
        const {app} = window;
        const {order} = app;

        view.state = {
            order: JSON.parse(JSON.stringify(order))
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
                            <div className="table__product-image no-pdf"
                                style={{backgroundImage: 'url(' + product.images[0] + ')'}}/>
                            <a href={'/product/' + product.slug} className="table__product-name">{product.name}</a>
                            <p className="table__product-article">Артикул: {product.article}</p>
                        </td>
                        <td className="table__td">
                            <input
                                className="input input--number block-center"
                                type="text"
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

            <div className="form clear-self">
                <h2 className="page-header">Платёжный адрес</h2>
                <p className="seo-text__paragraph">Имя: {order.user.firstName}</p>
                <p className="seo-text__paragraph">Фамилия: {order.user.lastName}</p>
                <p className="seo-text__paragraph">Телефон: {order.phone}</p>
                <p className="seo-text__paragraph">Email: {order.user.email}</p>
                <p className="seo-text__paragraph">Страна: {order.country}</p>
                <p className="seo-text__paragraph">Область: {order.region}</p>
                <p className="seo-text__paragraph">Город: {order.town}</p>
                <p className="seo-text__paragraph">Адрес: {order.address}</p>
                <p className="seo-text__paragraph">Индекс: {order.postcode}</p>
                <p className="seo-text__paragraph">Пожелания к заказу: {order.additional}</p>
            </div>
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

module.exports.initPdfOrder = () => {
    function saveFile(name, type, data) {
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(new Blob([data], {type}), name);
            return;
        }

        const url = URL.createObjectURL(new Blob([data], {type}));

        const link = $('<a />', {
            style: 'display: none',
            href: url,
            download: name
        });

        link[0].click();
        URL.revokeObjectURL(url);
    }

    if (browser.isIos()) {
        return;
    }

    const pdfOrder = $('.js-pdf-order');
    const cssClassBusy = 'pdf-order--busy';

    pdfOrder.removeClass('hidden');

    pdfOrder.on('click', () => {
        pdfOrder.addClass(cssClassBusy);

        const form = new FormData();

        form.append('html', $('.js-pdf')[0].innerHTML);

        const {app} = window;
        const {order} = app;

        window
            .fetch('/api/pdf-order', {
                method: 'post',
                body: form
            })
            .then(response => response.blob())
            .then(myBlob => saveFile(
                ('tattoobrands.by-' + order.slug + '-' + order.createdAtFormat + '.pdf')
                    .replace(/\//gi, '-')
                    .replace(/\s/gi, ''),
                'octet/stream',
                myBlob)
            )
            .catch(evt => console.error(evt))
            .then(() => pdfOrder.removeClass(cssClassBusy));
    });
};
