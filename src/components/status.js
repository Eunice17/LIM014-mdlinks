const http = require('http');
const https = require('https');

const awaitStatusValidate = ((link, ht) => {
  return new Promise((resolve) => {
    ht
      .get(link.href, (res) => {
        if (res.statusCode >= 404 && res.statusCode <= 599) {
          link.status = res.statusCode;
          link.statusText = 'Fail';
          resolve(link);
        } else {
          link.status = res.statusCode;
          link.statusText = 'Ok';
          resolve(link);
        }
      })
      .on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
          link.status = 'No status';
          link.statusText = 'Fail';
          resolve(link);
        }
      });
  });
});

module.exports = { awaitStatusValidate };
