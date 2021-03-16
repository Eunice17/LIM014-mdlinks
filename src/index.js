const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

const objValidate = [];
const awaitStatus = ((esto, ht, pathLink) => {
  return new Promise((resolve) => {
    ht.get(esto, (res) => {
      resolve({ 'href': esto, 'text': res.statusCode, 'file': pathLink });
    });
  });
});
const returnObject = ((filterHttp, pathLink) => {
  for (const elem of filterHttp) {
    if (elem.startsWith('https')) {
      const prueba1 = awaitStatus(elem, https, pathLink);
      objValidate.push(prueba1);
    } else {
      const prueba1 = awaitStatus(elem, http, pathLink);
      objValidate.push(prueba1);
    }
  }
  return objValidate;
});
const validateLinks = ((filterHttp) => {
  console.log(`Ignora ${filterHttp}`);
});

const pathLocation = ((pathResolve, pathLink, validate) => {
  const prome = new Promise((resolve, reject) => {
    fs.readFile(pathResolve, 'utf8', ((error, data) => {
      if (error) {
        let msg = '';
        msg = `Archivo no encontrado ${error}`;
        reject(msg);
      } else {
        const cadena = data.split(/[)(*\n\r]/);
        const filterHttp = cadena.filter((item) => item.startsWith('http'));
        if (validate !== true) {
          resolve(returnObject(filterHttp, pathLink));
        } else {
          resolve(validateLinks(filterHttp, pathLink));
        }
      }
    }));
  });
  return prome;
});
module.exports.mdLinks = (link, validate) => {
  let li = link;
  let resolvePath = '';
  let ruta = '';
  li = path.normalize(link);
  resolvePath = path.resolve(li);
  ruta = path.parse(resolvePath);

  if (ruta.ext === '.md') {
    pathLocation(resolvePath, resolvePath, validate)
      .then((msg) => {
        Promise.all(msg).then((values) => {
          console.log(values);
        });
      })
      .catch((omg) => {
        console.log(omg);
      });
  } else if (ruta.ext === '') {
    // Ruta apunta a un directorio
    pathLocation(resolvePath, validate);
  } else {
    console.log(`La ruta apunta a un archivo con diferente extensión Marckdown, type: ${ruta.ext}`);
  }
  // const ruta1 = path.resolve('C://///Users/Eunice Fiorella/testgit/LIM014-mdlinks/src/doc/case1');
  // console.log(ruta1);
};
