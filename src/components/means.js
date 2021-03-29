const fs = require('fs');
const http = require('http');
const https = require('https');

const isDir = ((pathDir) => {
  try {
    const status = fs.statSync(pathDir);
    return status.isDirectory();
  } catch (error) {
    return 'No such file or directory';
  }
});
const isFile = ((pathFile) => {
  try {
    const status = fs.statSync(pathFile);
    return status.isFile();
  } catch (error) {
    return 'No such file or directory';
  }
});

const awaitStatusValidate = ((esto, ht, pathValidate) => {
  return new Promise((resolve) => {
    ht.get(esto, (res) => {
      if (res.statusCode === 404) {
        resolve({
          'href': esto, 'text': res.statusCode, 'file': pathValidate, 'status': 'Fail',
        });
      } else {
        resolve({
          'href': esto, 'text': res.statusCode, 'file': pathValidate, 'status': 'Ok',
        });
      }
    });
  });
});

const awaitStatus = ((esto, ht, pathLink) => {
  return new Promise((resolve) => {
    ht.get(esto, (res) => {
      resolve({ 'href': esto, 'text': res.statusCode, 'file': pathLink });
    });
  });
});

const returnObject = ((filterHttp, pathLink) => {
  const objValidate = [];
  if (filterHttp.length > 0) {
    for (const elem of filterHttp) {
      if (elem.startsWith('https')) {
        const prueba1 = awaitStatus(elem, https, pathLink);
        objValidate.push(prueba1);
      } else {
        const prueba1 = awaitStatus(elem, http, pathLink);
        objValidate.push(prueba1);
      }
    }
  }
  return objValidate;
});
const validateLinks = ((filterHttp, pathValidate) => {
  const objValidate = [];
  if (filterHttp.length > 0) {
    for (const elem of filterHttp) {
      if (elem.startsWith('https')) {
        const prueba1 = awaitStatusValidate(elem, https, pathValidate);
        objValidate.push(prueba1);
      } else {
        const prueba1 = awaitStatusValidate(elem, http, pathValidate);
        objValidate.push(prueba1);
      }
    }
  }
  return objValidate;
});

module.exports = {
  awaitStatus,
  awaitStatusValidate,
  isFile,
  isDir,
  validateLinks,
  returnObject,
};
