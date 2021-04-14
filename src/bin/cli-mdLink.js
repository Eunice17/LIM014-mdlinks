#!/usr/bin/env node
const path = require('path');
const clc = require('cli-color');
const { mdLinks } = require('../mdLinks.js');
const { isFile } = require('../components/means.js');
const {
  statsMd, statsValidateMd, links, linkValidate, help, banner,
} = require('../components/means-cli.js');

if (process.argv.length > 5) {
  console.log(`Exceso de comandos, ¡Por favor ingrese comandos correctos!\n
  Si necesita ayuda ingrese: \n${clc.yellowBright('mdLink --help')}`);
} else if (process.argv.length < 3) {
  console.log(`Ingrese un path tipo directorio o archivo .md\n
  Si necesita ayuda ingrese: \n${clc.yellowBright('mdLink --help')}`);
} else {
  const li = path.normalize(process.argv[2]);
  const resolvePath = path.resolve(li);
  const flag = isFile(resolvePath);
  if (process.argv.length === 3) {
    if (process.argv[2].toLowerCase() === '--help') {
      console.log(help());
    } else {
      banner();
      setTimeout(() => {
        mdLinks(resolvePath).then((msg) => {
          if (msg.length > 0) {
            console.log(links(msg, flag));
          } else {
            console.log(`No se encontraron links en ${resolvePath}`);
          }
        })
        .catch((omg) => {
          console.log(new Error(omg));
        });
      }, 2000);
    }
  } else if (process.argv.length === 4) {
    if (process.argv[3].toLowerCase() === '--validate') {
      banner();
      mdLinks(resolvePath, true).then((msg) => {
        if (msg.length > 0) {
          console.log(linkValidate(msg, flag));
        } else {
          console.log(`No se encontraron links en ${resolvePath}`);
        }
      })
      .catch((omg) => {
        console.log(new Error(omg));
      });
    } else if (process.argv[3].toLowerCase() === '--stats') {
      banner();
      setTimeout(() => {
        mdLinks(resolvePath).then((msg) => {
          console.log(statsMd(msg, flag));
        })
        .catch((omg) => {
          console.log(new Error(omg));
        });
      }, 2000);
    } else {
      console.log(`Ingrese comandos válidos:
      \n${clc.yellowBright('mdLink <path> --stats')}
      \n${clc.yellowBright('mdLink <path> --validate')}
      \n${clc.yellowBright('mdLink <path> --stats --validate')}
      \nSi necesita ayuda ingrese:
      \n${clc.yellowBright('mdLink --help')}`);
    }
  } else if ((process.argv[3].toLowerCase() === '--validate' && process.argv[4].toLowerCase() === '--stats') || (process.argv[4].toLowerCase() === '--validate' && process.argv[3].toLowerCase() === '--stats')) {
    banner();
    mdLinks(resolvePath, true).then((msg) => {
      console.log(statsValidateMd(msg, flag));
    })
    .catch((omg) => {
      console.log(new Error(omg));
    });
  } else {
    console.log(`Ingrese comandos válidos:
      \n${clc.yellowBright('mdLink <path> --stats')}
      \n${clc.yellowBright('mdLink <path> --validate')}
      \n${clc.yellowBright('mdLink <path> --stats --validate')}
      \nSi necesita ayuda ingrese:
      \n${clc.yellowBright('mdLink --help')}`);
  }
}
