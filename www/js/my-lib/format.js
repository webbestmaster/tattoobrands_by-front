function roundNumber(number, value) {
    let newNumber = number;
    let ii = 0;

    for (; ii < value; ii += 1) {
        newNumber *= 10;
    }

    newNumber = Math.round(newNumber);

    for (ii = 0; ii < value; ii += 1) {
        newNumber /= 10;
    }

    return newNumber;
}

module.exports.roundNumber = roundNumber;

// test
// console.assert(roundNumber(0.7999, 2) === 0.8);
// console.assert(roundNumber(11.2999, 2) === 11.3);
// console.assert(roundNumber(0.1 + 0.2, 2) === 0.3);

function numberToMoney(rawNumber) {
    const number = roundNumber(rawNumber, 2);
    let right = roundNumber(number % 1, 2).toString();
    const left = Math.floor(number)
        .toString()
        .split('')
        .reverse()
        .map((item, ii) => ((ii + 1) % 3 === 0 ? ' ' : '') + item)
        .reverse()
        .join('')
        .trim();

    if (right === '0') {
        return left;
    }

    right = right[2] + (right[3] || '0');

    return left + '.' + right;
}

module.exports.numberToMoney = numberToMoney;

// test
// console.assert(numberToMoney(1234567) === '1 234 567');
// console.assert(numberToMoney(12345678) === '12 345 678');
// console.assert(numberToMoney(123456789) === '123 456 789');
// console.assert(numberToMoney(1234567890) === '1 234 567 890');
// console.assert(numberToMoney(1234567.1) === '1 234 567.10');
// console.assert(numberToMoney(12345678.12) === '12 345 678.12');
// console.assert(numberToMoney(123456789.123) === '123 456 789.12');
// console.assert(numberToMoney(1234567890.1234) === '1 234 567 890.12');
// console.log(numberToMoney(1234567));
// console.log(numberToMoney(12345678));
// console.log(numberToMoney(123456789));
// console.log(numberToMoney(1234567890));
// console.log(numberToMoney(1234567.1));
// console.log(numberToMoney(12345678.12));
// console.log(numberToMoney(123456789.123));
// console.log(numberToMoney(1234567890.1234));

