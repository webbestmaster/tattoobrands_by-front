/* global Image */

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        function onLoad() {
            image.onload = image.onerror = null;
            resolve(image);
        }

        function onError() {
            image.onload = image.onerror = null;
            reject(image);
        }

        image.onload = onLoad;
        image.onerror = onError;

        image.src = src;
    });
}

function loadImages(imageSrcList) {
    return Promise.all(imageSrcList.map(loadImage));
}

module.exports.loadImage = loadImage;
module.exports.loadImages = loadImages;
