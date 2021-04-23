/* const fs = require('fs');

console.log(__dirname);
fs.readFile('./ch03fs.txt', (err, data) => {
  // ./ 경로의 기준은 노드 콘솔 실행 위치이디.
  if (err) throw err;
  console.log(data); // 메모리에 저장된 buffer 상태로 읽어진다 
  console.log(data.toString()); 
}); */

const fs = require('fs').promises; // fs를 promise로 쓰기

fs.readFile(__dirname + '/ch03fs.txt')
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => console.log(err));
