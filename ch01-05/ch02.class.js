var Human = function (type) {
  //function-FUnction 객체
  this.type = type || 'human';
}; // this.type으로 클래스형이자 생성자 역할을 함.

Human.isHuman = function (human) {
  // static 메소드 클래스 메소드 구현
  return human instanceof Human; // instaceOf 연산자
};

Human.prototype.breathe = function () {
  console.log('h-aaaan'); // 일반 메소드 구현 , 인스터스 없이는 못 씀.
};

var aio = function (type, firstName, lastName) {
  Human.apply(this.arguments); // 자바의 super() 역할
  this.firstName = firstName;
  this.lastName = lastName;
};

aio.prototype = Object.create(Human.prototype);
aio.prototype.constructor = aio; // 상속 하는 부분
aio.prototype.sayName = function () {
  console.log(this.firstName + ' ' + this.lastName); // 자식 객체의 메소드 구현
};

var oldAio = new aio('human', 'Aio', 'JS');
console.log(Human.isHuman(oldAio)); // true
oldAio.sayName();
//////////////////////////////////////////////////////

// 새로운 Class 기반 코드
/////////////////////////////////////////////////
class Human {
  constructor(type = 'human') {
    this.type = type;
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  breathe() {
    console.log('haaaa');
  }
}

class Aio extends Human {
  constructor(type, firstName, lastName) {
    super(type); // Human의 생성자 메소드를 실행
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    super.breathe(); // Human의 breath 메소드를 상속
    console.log(`${this.lastName}에 ${this.lastName}`);
  }
}

const newAio = new Aio('human', 'aio', 'JS');
console.log(Human.isHuman(newAio));
newAio.sayName();
console.dir(newAio); // 브라우저에서 상속 관게를 전부 알수 있어 보안에 위험이 있음
