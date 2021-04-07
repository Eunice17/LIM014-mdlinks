// const { isFile } = require('../means');
const data = require('../../../test/data');

const awaitStatusValidate = ((link) => {
  return new Promise((resolve) => {
    for (let i = 0; i < data.obj[0].salida.length; i += 1) {
      for (let j = 0; j < data.obj[0].salida[i].length; j += 1) {
        if (data.obj[0].salida[i][j].href === link.href) {
          link.status = data.obj[0].salida[i][j].status;
          link.statusText = data.obj[0].salida[i][j].statusText;
          resolve(link);
        }
      }
    }
  });
});
module.exports = { awaitStatusValidate };
