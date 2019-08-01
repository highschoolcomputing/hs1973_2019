const fs = require('fs');

// ==========================================================
console.log('Read 0');
// ==========================================================

// Doesn't work - this might be how we expect it to work
// const file = fs.readFile('myFile', 'utf8');
// console.log(file);

// https://nodejs.org/dist/latest-v6.x/docs/api/fs.html

// ==========================================================
console.log('Read 1');
// ==========================================================

const read1 = (name, successFn, errorFn) => {
  fs.readFile(name, 'utf8', (err, data) => {
    if (err) {
  	  errorFn(err);
    } else {
      successFn(data);
    }
  });
};
read1('src/myFile', (data) => { console.log('1: ', data); }, (err) => { console.log(err); });

// ==========================================================
console.log('Read 2');
// ==========================================================

const read2 = (name) => {
  return new Promise(function(resolve, reject) {
    fs.readFile(name, 'utf8', (err, data) => {
      if (err) {
    	reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
read2('src/myFile').then(data => {
  console.log('2: ', data);
}).catch(err => {
  console.log(err);
});

// ==========================================================
console.log('Read 3');
// ==========================================================

const read3 = async name => {
  try {
    const data = await read2(name);
    console.log('3: ', data);
  } catch (err) {
    console.log(err);
  }
}
read3('src/myFile');

// ==========================================================
console.log('Done');
// ==========================================================
