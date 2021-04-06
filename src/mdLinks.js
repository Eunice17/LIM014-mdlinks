const path = require('path');
const fs = require('fs');
const {
  isFile,
  isDir,
  validateLinks,
} = require('./components/means');

const filterLinks = ((data, filterHttp, pathResolve) => {
  const arrayText = [];
  const arrayLinks = [];
  for (let i = 0; i < data.length; i += 1) {
    if (/^(https?:\/\/)/.test(data[i])) {
      arrayText.push(data[i - 2]);
    }
  }
  for (let j = 0; j < filterHttp.length; j += 1) {
    if (arrayText[j].length > 0) {
      arrayLinks.push({ 'href': filterHttp[j], 'text': arrayText[j], 'file': pathResolve });
    } else {
      arrayLinks.push({ 'href': filterHttp[j], 'text': 'Text default', 'file': pathResolve });
    }
  }
  return arrayLinks;
});
const pathLocation = ((pathResolve, validate) => {
  let promises;
  const data = fs.readFileSync(pathResolve).toString();
  const cadena = data.split(/[)(*\]'\n[\r]/);
  // const filterHttp = cadena.filter((item) => item.startsWith('http'));
  const filterHttp = cadena.filter((item) => item.match(/^(https?:\/\/)/));
  const arrayObject = filterLinks(cadena, filterHttp, pathResolve);
  if (!validate) {
    promises = arrayObject;
  } else {
    const prom = validateLinks(arrayObject);
    promises = Promise.all(prom);
  }
  return promises;
});
const searchMd = ((pathDirMd, arr) => {
  const readCont = fs.readdirSync(pathDirMd);
  for (const elem of readCont) {
    const pathJoin = `${pathDirMd}\\${elem}`;
    if (isFile(pathJoin)) {
      if (path.parse(pathJoin).ext === '.md') {
        arr.push(pathJoin);
      }
    } else {
      searchMd(pathJoin, arr);
    }
  }
  return arr;
});
const arrayDir = ((arrayDr, flag) => {
  const objArray = [];
  arrayDr.forEach((e) => {
    objArray.push(pathLocation(e, flag));
  });
  return objArray;
});

const mdLinks = (link, validate) => new Promise((resolve, reject) => {
  const li = path.normalize(link);
  const resolvePath = path.resolve(li);
  if (isDir(resolvePath)) {
    const arrPath = [];
    const array2 = searchMd(resolvePath, arrPath);
    const dirPath = arrayDir(array2, validate);
    const arrayPromise = Promise.all(dirPath);
    resolve(arrayPromise);
  } else if (isFile(resolvePath)) {
    if (path.parse(resolvePath).ext === '.md') {
      const promises = pathLocation(resolvePath, validate);
      resolve(promises);
    } else {
      reject(new Error(`La ruta apunta a un archivo con diferente extensión Marckdown, type: ${path.parse(resolvePath).ext}`));
    }
  }
});
module.exports = {
  pathLocation,
  searchMd,
  arrayDir,
  mdLinks,
};
