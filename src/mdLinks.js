const path = require('path');
const fs = require('fs');
const {
  isFile,
  isDir,
  validateLinks,
  returnObject,
} = require('./components/means');

const pathLocation = ((pathResolve, validate) => {
  let promises;
  const data = fs.readFileSync(pathResolve).toString();
  // const filterText = data.match(/\[([\s\w]+)\]/g);
  const cadena = data.split(/[)(*\n\r]/);
  const filterHttp = cadena.filter((item) => item.startsWith('http'));
  if (!validate) {
    promises = returnObject(filterHttp, pathResolve);
  } else {
    promises = validateLinks(filterHttp, pathResolve);
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
  let li = link;
  let resolvePath = '';
  li = path.normalize(link);
  resolvePath = path.resolve(li);
  if (isDir(resolvePath)) {
    const arrPath = [];
    const array2 = searchMd(resolvePath, arrPath);
    const dirPath = arrayDir(array2, validate);
    const prueba = dirPath.map((element) => Promise.all(element));
    const arrayPromise = Promise.all(prueba);
    resolve(arrayPromise);
  } else if (isFile(resolvePath)) {
    if (path.parse(resolvePath).ext === '.md') {
      const promises = pathLocation(resolvePath, validate);
      resolve(Promise.all(promises));
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
