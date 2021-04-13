const fs = require('fs');

const readStream = fs.createReadStream('./ch03fs.txt');
const writeStream = fs.createWriteStream('./ch03fsWrite.txt');

readStream.pipe(writeStream);
