const test = new Promise(function (resolve, reject) {
  resolve('프라마이즈의 리졸브');
});

test.then((result) => {
  for (let index = 0; index < 10000; index++) {
    console.log('promise AAAAAAA');
  }
  return '첫번쨰 리턴';
});
test.then((result) => console.log('BBBBBBBBBB' + result));
