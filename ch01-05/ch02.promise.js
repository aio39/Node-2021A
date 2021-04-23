const condition = true; //  true면 resolve , false면 reject;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('성공'); // then의 매개변수를 받을 수 있다.
  } else {
    reject('실패'); // error의 매개 변수를 받을 수 있다.
  }
});

promise
  .then((message) => {
    console.log(`resolve 성공시 실행됩니다:  ${message}`); // resolve(성공) 한 경우 실행
  })
  .catch((error) => {
    console.error(error); // reject 한 경우 실행
  })
  .finally(() => {
    console.log('finally는 무조건 실행 됩니다.');
  });

///////////////////////////

promise
  .then((message) => {
    console.log(`메시지1 ${message}`);
    return new Promise((resolve, reject) => {
      resolve(message);
    });
  })
  .then((message2) => {
    console.log(`메세지2 ${message2}`);
    return new Promise((resolve, reject) => {
      resolve(message2);
    });
  })
  .then((message3) => {
    console.log(`메세지3 ${message3}`);
  })
  .catch((err) => {
    console.error(err);
  });
