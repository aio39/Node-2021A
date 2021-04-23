const buffer = Buffer.from('저를 버퍼로 바꿔보세요/');
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [
  Buffer.from('따로따로1'),
  Buffer.from('따로따로2'),
  Buffer.from('따로따로3'),
  Buffer.from('따로따로4'),
];

const buffer2 = Buffer.concat(array);
console.log(buffer2);

const buffer3 = Buffer.alloc(5);
console.log(buffer3);
