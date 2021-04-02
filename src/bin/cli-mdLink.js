#!/usr/bin/env node
const path = require('path');
const { mdLinks } = require('../mdLinks.js');
const { isFile } = require('../components/means.js');
const {
  statsMd,
  statsValidateMd,
  links,
  linkValidate,
} = require('../components/means-cli.js');

if (process.argv.length > 5) {
  console.log('Exceso de comandos, ¡Por favor ingrese comandos correctos!');
} else if (process.argv.length < 3) {
  console.log('Ingrese un Path directorio o archivo .md');
} else {
  const li = path.normalize(process.argv[2]);
  const resolvePath = path.resolve(li);
  const flag = isFile(resolvePath);
  if (process.argv.length === 3) {
    mdLinks(resolvePath).then((msg) => {
      links(msg, flag);
    });
  } else if (process.argv.length === 4) {
    if (process.argv[3].toLowerCase() === '--validate') {
      mdLinks(resolvePath, true).then((msg) => {
        linkValidate(msg, flag);
      });
    } else if (process.argv[3].toLowerCase() === '--stats') {
      const stats = statsMd();
      console.log(stats);
    } else {
      console.log('Ingrese comando válido, --stats o --validate');
    }
  } else if ((process.argv[3].toLowerCase() === '--validate' && process.argv[4].toLowerCase() === '--stats') || (process.argv[4].toLowerCase() === '--validate' && process.argv[3].toLowerCase() === '--stats')) {
    const statsValidate = statsValidateMd();
    console.log(statsValidate);
  } else {
    console.log('Ingrese comandos válidos, --stats y --validate');
  }
}
