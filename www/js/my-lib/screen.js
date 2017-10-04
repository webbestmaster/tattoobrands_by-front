/* global document*/

const scrollMethods = (() => {
    const docElem = document.documentElement;
    let {scrollTop = 0} = docElem;

    function saveScrollTop() {
        console.log('save', docElem.scrollTop);
        scrollTop = docElem.scrollTop;
    }

    function restoreScrollTop() {
        console.log('restore', scrollTop);
        docElem.scrollTop = scrollTop;
    }

    return {
        saveScrollTop,
        restoreScrollTop
    };
})();


module.exports.saveScrollTop = scrollMethods.saveScrollTop;
module.exports.restoreScrollTop = scrollMethods.restoreScrollTop;
