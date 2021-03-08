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
