const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log('The index of this number is: ' + i);
  }, 3000);
} // 4 4 4 4

const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  // i 값 을 setTime 함수 안에 전달하여 각 함수 호출마다 올바른 값에 접근하게 합니다.
  setTimeout(
    (function (i_local) {
      return function () {
        console.log('The index of this number is: ' + i_local);
      };
    })(i),
    3000
  );
}

const arr = [10, 12, 15, 21];
for (let i = 0; i < arr.length; i++) {
  // ES6 의 let 은 함수가 호출 될 때 마다 인덱스 i 값이 바인딩 되는 새로운 바인딩 기법을 사용합니다.
  // 더 자세한 내용은 다음 링크에서 확인하세요.
  // http://exploringjs.com/es6/ch_variables.html#sec_let-const-loop-heads
  setTimeout(function () {
    console.log('The index of this number is: ' + i);
  }, 3000);
}

const arr = [10, 12, 15, 21];
let count = 0;
setTimeout(function run() {
  console.log(`${arr[count]}: ${count} `);
  count++;
  if (arr.length > count) setTimeout(run, 1000);
}, 1000);
