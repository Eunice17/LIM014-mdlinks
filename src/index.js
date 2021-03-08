const path = require('path');
// C:/Users/Eunice Fiorella/testgit/LIM014-mdlinks/src/doc
module.exports.mdLinks = () => {
  // const ruta1 = path.parse('C:/Users/Eunice Fiorella/testgit/LIM014-mdlinks/src/doc/case1');
  const prome = new Promise((resolve, reject) => {
    const ruta = path.parse('C:/Users/Eunice Fiorella/testgit/LIM014-mdlinks/src/doc/case1.md');
    if (ruta.ext === '.md') {
      resolve('Es un archivo con extensión Marckdown');
    } else {
      let msgError = '';
      if (ruta.ext === '') {
        msgError = `La ruta apunta a un directorio, ${ruta.dir}`;
      } else {
        msgError = `La ruta apunta a un archivo con diferente extensión Marckdown, type: ${ruta.ext}`;
      }
      const directorio = new Error(msgError);
      reject(directorio);
    }
  });
  prome.then((msg) => {
    console.log(msg);
  });
  prome.catch((omg) => {
    console.log(omg);
  });
};
