/* global navigator */
class Browser {
    isIos() {
        return Boolean(navigator.platform) && /iPad|iPhone|iPod/.test(navigator.platform);
    }
}

module.exports.browser = new Browser();
