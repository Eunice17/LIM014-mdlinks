const path = require('path');
const fs = require('fs');
const modules = require('./components/means.js');

const pathLocation = ((pathResolve, validate) => {
  const prome = new Promise((resolve, reject) => {
    fs.readFile(pathResolve, 'utf8', ((er, data) => {
      try {
        const cadena = data.split(/[)(*\n\r]/);
        const filterHttp = cadena.filter((item) => item.startsWith('http'));
        if (validate !== true) {
          resolve(modules.returnObject(filterHttp, pathResolve));
        } else {
          resolve(modules.validateLinks(filterHttp, pathResolve));
        }
      } catch (error) {
        reject(er);
      }
    }));
  });
  return prome;
});
const searchMd = ((pathDirMd, arr) => {
  const readCont = fs.readdirSync(pathDirMd);
  for (const elem of readCont) {
    const pathJoin = `${pathDirMd}\\${elem}`;
    if (modules.isFile(pathJoin)) {
      if (path.parse(pathJoin).ext === '.md') {
        arr.push(pathJoin);
      }
    } else {
      searchMd(pathJoin, arr);
    }
  }
  return arr;
});
module.exports.mdLinks = (link, validate) => {
  let li = link;
  let resolvePath = '';
  li = path.normalize(link);
  resolvePath = path.resolve(li);

  if (modules.isDir(resolvePath)) {
    try {
      const arrPath = [];
      console.log(searchMd(resolvePath, arrPath, validate));
    } catch (error) {
      console.log('Algo salió mal');
    }
  } else if (modules.isFile(resolvePath)) {
    if (path.parse(resolvePath).ext === '.md') {
      pathLocation(resolvePath, validate)
        .then((msg) => {
          Promise.all(msg).then((values) => {
            console.log(values);
          });
        })
        .catch((omg) => {
          console.log(omg);
        });
    } else {
      console.log(`La ruta apunta a un archivo con diferente extensión Marckdown, type: ${path.parse(resolvePath).ext}`);
    }
  }
};