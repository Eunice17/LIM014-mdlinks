const fs = require('fs');
const http = require('http');
const https = require('https');
const { awaitStatusValidate } = require('./status');

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

const validateLinks = ((arrayObject) => {
  const objValidate = [];
  if (arrayObject.length > 0) {
    for (const elem of arrayObject) {
      if (elem.href.startsWith('https')) {
        const prueba1 = awaitStatusValidate(elem, https);
        objValidate.push(prueba1);
      } else {
        const prueba1 = awaitStatusValidate(elem, http);
        objValidate.push(prueba1);
      }
    }
  }
  return objValidate;
});

module.exports = {
  isFile,
  isDir,
  validateLinks,
};
