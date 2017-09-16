/* global localStorage */
const LS_ITEM = 'my-basket';
const find = require('lodash/find');

class Basket {
    constructor() {
        const basket = this;

        basket.loadSaved();
    }

    loadSaved() {
        const basket = this;
        const data = localStorage.getItem(LS_ITEM);

        if (!data) {
            console.log('BASKET - NO SAVED DATA');
            basket.setItems([]);
            return;
        }

        const savedData = JSON.parse(data);

        basket.setItems(savedData.items);
    }

    save() {
        const basket = this;
        const data = {
            items: basket.getItems()
        };

        localStorage.setItem(LS_ITEM, JSON.stringify(data));
    }

    getItems() {
        return this._items; // eslint-disable-line no-underscore-dangle
    }

    setItems(items) {
        const basket = this;

        basket._items = items; // eslint-disable-line no-underscore-dangle

        basket.save();
        return basket;
    }

    change(itemToAdd, change) {
        const basket = this;
        const {slug} = itemToAdd;
        const items = basket.getItems();
        const item = find(items, {slug});

        if (item) {
            item.count += change;
        } else {
            items.push(Object.assign({}, itemToAdd, {count: change}));
        }

        basket.removeZeroCount();

        basket.save();
    }

    removeZeroCount() {
        const basket = this;
        const items = basket.getItems();

        basket.setItems(items.filter(({count}) => count >= 0));
    }
}

module.exports = Basket;
