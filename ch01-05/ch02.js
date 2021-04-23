if (true) {
  var x = 3;
}

console.log(x);
// result: 3 , var 함수 스코프이기에 block 스코프인 if 밖에서도 유효함

if (true) {
  const y = 3;
  const z = 3;
}

// console.log(y, z);
//y is not defined
// 블록 스코프이므로 if 문이 끝나면 메모리상에서 제거됨

console.log(a);
var a = '호이스팅!! undefined';

// console.log(b);
const b = "error: cannot access 'b' before initialization";

// 객체 리터럴
var sayNode = function () {
  console.log('node');
};

var es = 'ES';
var oldObject = {
  // 이전 버전의 객체 리터럴 초기화
  sayJS: function () {
    console.log('JS');
  },
  sayNode: sayNode,
}; // 리터럴

oldObject[es + 6] = 'Fantastic'; // 실시간으로 추가 가능.
oldObject.ES6 = 'test'; // 변경도 가능
console.log(oldObject.ES6);

// 새로운 오브젝트
const es = 'ES';
const sayNode2 = () => console.log('node2');
const newObject = {
  sayJS() {
    // function  생략 가능
    console.log('js');
  },
  sayNode2, //key: value 가 같다면 value 생략가능
  [es + 7]: '환타스틱 ', // 객체의  동적 속성을 객체 안에서 선언 해도 됨;
};

console.log(newObject.ES7);
console.log(newObject['ES7']);

var relationship1 = {
  name: 'aio',
  friends: ['a', 'b', 'c'],
  logFriends: function () {
    var that = this;
    // const that = this;  작동함
    this.friends.forEach(function (friend) {
      console.log(that.name, friend);
    });
  },
};
relationship1.logFriends();
