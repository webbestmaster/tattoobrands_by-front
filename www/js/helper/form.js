function checkInput(input) {
    const {value} = input;

    if (input.hasAttribute('required') && !value) {
        return false;
    }

    const pattern = input.getAttribute('pattern');

    if (!pattern) {
        return true;
    }

    const regExp = new RegExp(pattern);

    return regExp.test(value);
}

function checkForm(form) {
    const inputs = Array.prototype.slice.call(form.find('input')); // eslint-disable-line prefer-reflect

    return inputs.every(checkInput);
}

module.exports.checkInput = checkInput;
module.exports.checkForm = checkForm;
