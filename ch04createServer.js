const http = require('http');
const fs = require('fs').promises;

//  사용자의 요청은 언제 올지 모르기에 cb으로 처리한다.
const server = http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile('./ch04createServer.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(error.message);
  }
});

server.listen(8080);

server.on('listening', () => {
  console.log('서버 8080포트에 연결됨..');
});

server.on('error', (error) => {
  console.log('error');
});
