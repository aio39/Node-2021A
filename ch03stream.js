const fs = require('fs');

const readStream = fs.createReadStream('./ch03fs.txt', { highWaterMark: 16 });

const data = [];
let count = 1;

readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log(`data${count}`, chunk, chunk.length);
  count++;
});

readStream.on('end', () => {
  console.log('end:', Buffer.concat(data).toString());
});

readStream.on('error', (error) => {
  console.log('error:', error);
});
