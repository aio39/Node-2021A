var candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy: function () {
    this.status.count--;
    return this.status.count;
  },
};

var getCandy2 = candyMachine.getCandy;
console.log(getCandy == candyMachine.getCandy);

var getCandy = candyMachine.getCandy.bind(candyMachine);
var count = candyMachine.status.count;

console.log(getCandy());

candyMachine.getCandy = function () {
  this.status.count++;
  return this.status.count;
};

console.log(getCandy());

var getCandy3 = candyMachine.getCandy.bind(candyMachine);

console.log(candyMachine.status.count);
console.log(getCandy3());

console.log('---------------');
