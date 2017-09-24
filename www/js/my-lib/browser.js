/* global document, navigator */
class Browser {
    isIos() {
        return Boolean(navigator.platform) && /iPad|iPhone|iPod/.test(navigator.platform);
    }

    // isTouch() {
    //     return 'ontouchstart' in document;
    // }
}

module.exports.browser = new Browser();
