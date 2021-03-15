//  스택의 이해
// LIFO

const first = () => {
  second();
  console.log('First');
};
const second = () => {
  third();
  console.log('second');
};
const third = () => {
  console.log('Third');
};

first();
// 3 2 1 undefined;

//이벤트 루프 29P
const run = () => {
  console.log('3초후 실행');
};
console.log('시작');
setTimeout(run, 3000);
console.log('끝');
// 시작 끝 undefined 3초후 실행

// 논 블로킹 방식의 코드
function longRunningTask() {
  //오래 걸리는 작업
  console.log('작업끝');
}

function longRunningTask2() {
  //오래 걸리는 작업
  console.log('작업끝2');
}

console.log('작업 시작 ');
longRunningTask();
setTimeout(longRunningTask2, 0); // 0이지만 4ms 정도의 오차는 있다.
console.log('다음 작업');
