const path = require('path');
const fs = require('fs');

const pathLocation = ((pathResolve, validate) => {
  console.log(validate);
  const prome = new Promise((resolve, reject) => {
    fs.readFile(pathResolve, 'utf8', ((error, data) => {
      if (error) {
        let msg = '';
        msg = `Archivo no encontrado ${error}`;
        reject(msg);
      } else {
        const cadena = data.split(/[)(*\n\r]/);
        const filterHttp = cadena.filter((item) => item.startsWith('http'));
        resolve(filterHttp);
      }
    }));
  });
  prome.then((msg) => {
    console.log(msg);
  });
  prome.catch((omg) => {
    console.log(omg);
  });
});
module.exports.mdLinks = (link, validate) => {
  let li = link;
  let resolvePath = '';
  let ruta = '';
  li = path.normalize(link);
  resolvePath = path.resolve(li);
  ruta = path.parse(resolvePath);

  if (ruta.ext === '.md') {
    pathLocation(resolvePath, validate);
  } else if (ruta.ext === '') {
    // Ruta apunta a un directorio
    pathLocation(resolvePath, validate);
  } else {
    console.log(`La ruta apunta a un archivo con diferente extensión Marckdown, type: ${ruta.ext}`);
  }
  // const ruta1 = path.resolve('C://///Users/Eunice Fiorella/testgit/LIM014-mdlinks/src/doc/case1');
  // console.log(ruta1);
};
