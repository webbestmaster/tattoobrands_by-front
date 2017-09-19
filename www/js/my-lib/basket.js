/* global localStorage */
const LS_ITEM = 'my-basket';
const find = require('lodash/find');
const {numberToMoney} = require('./format');

class Basket {
    constructor(data) {
        const basket = this;

        basket.initialData = data;

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

        // update html basket
        const fullPrice = basket.getFullPrice();
        const fullCount = basket.getFullCount();
        const {wrapper, counter, postfix, empty} = basket.initialData;

        if (fullPrice > 0) {
            counter.classList.remove('hidden');
            counter.innerHTML = fullCount;
            wrapper.innerHTML = numberToMoney(fullPrice) + postfix;
        } else {
            counter.classList.add('hidden');
            counter.innerHTML = 0;
            wrapper.innerHTML = empty;
        }
    }

    getFullPrice() {
        const basket = this;
        const items = basket.getItems();

        return items.reduce((accumulator, item) => accumulator + item.count * item.price, 0);
    }

    getFullCount() {
        const basket = this;
        const items = basket.getItems();

        return items.reduce((accumulator, item) => accumulator + item.count, 0);
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

    clear() {
        this.setItems([]);
    }

    /*
        set(itemToSet, value) {
            const basket = this;
            const {slug} = itemToSet;
            const items = basket.getItems();
            const item = find(items, {slug});

            item.count = value;

            basket.removeZeroCount();

            basket.save();
        }
    */

    removeZeroCount() {
        const basket = this;
        const items = basket.getItems();

        basket.setItems(items.filter(({count}) => count > 0));
    }
}

module.exports = Basket;
