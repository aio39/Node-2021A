const { odd, even } = require('./ch03var');

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  } else {
    return even;
  }
}

module.exports = checkOddOrEven;
