console.log(this);
console.log(this === global);
console.log(this === module.exports);
console.log(this === exports);

const check = () => {
  const a = 1;
  console.log('함수에서는', this === exports, this === global, this, a);
};
function check2() {
  const a = 1;
  console.log('함수2에서는', this === exports, this === global, this, a);
}
check();
console.log(`arrow 함수는 자신의 this를  만들지 않고 외부 컨텍스트에서 this를 찾는다.
여기서는 한단계 외부 컨텍스트가 전역 스코프이므로 전역의 this와 동일하게 this는 exports를 가리킨다.
`);
check2();
console.log(
  `일반 함수는 콜백또는 재활당된어서 사용된다면 this는 global을 가리키게 한다.
  전역 스코프에서 this는 global이 아니었으므로 this === exports가 false가 된다. `
);
