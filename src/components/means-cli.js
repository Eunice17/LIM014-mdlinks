const { table } = require('table');
const clc = require('cli-color');
const path = require('path');
const figlet = require('figlet');

const banner = (() => {
  figlet('MD-LINK', (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(clc.greenBright(data));
    console.log(clc.yellowBright('Wait a moment...'));
  });
});
const drawTable = ((show) => {
  const config = {
    border: {
      topBody: '─',
      topJoin: '┬',
      topLeft: '┌',
      topRight: '┐',
      bottomBody: '─',
      bottomJoin: '┴',
      bottomLeft: '└',
      bottomRight: '┘',
      bodyLeft: '│',
      bodyRight: '│',
      bodyJoin: '│',
      joinBody: '─',
      joinLeft: '├',
      joinRight: '┤',
      joinJoin: '┼',
    },
  };
  const output = table(show, config); // './src/doc/case1.md'
  return output;
});
const help = (() => {
  const show = [];
  const head = [`${clc.greenBright('************************ AYUDA AIDER HELP HILFE AIUTO ************************')}`];
  const body = [
    `Para empezar a usar corractamente la libreria, debe de ingresar\n
    primero el comando ${clc.greenBright('mdLink')} seguido del path del archivo o directorio:\n
    $>${clc.greenBright('mdLink ./example.md')}`,
  ];
  const sg = [`${clc.greenBright('Se sugiere escribir el path en forma relativa, si la ruta contiene espacios\nescribirla entre comillas simples')}`];
  const ejm = [`${clc.cyanBright('******************** Formas correctas de uso de comandos ********************')}\n
  ${clc.yellowBright('$ mdLink ./example.md')}\n
  ${clc.yellowBright('$ mdLink ./doc/')}\n
  ${clc.yellowBright('$ mdLink ./example.md --validate')}\n
  ${clc.yellowBright('$ mdLink ./example.md --validate --stats')}\n
  ${clc.yellowBright('$ mdLink ./doc/ --validate')}\n
  ${clc.yellowBright('$ mdLink ./doc/ --validate --stats')}\n`];
  show.push(head);
  show.push(body);
  show.push(sg);
  show.push(ejm);
  return drawTable(show);
});
const eachFile = ((msg) => {
  const showObject = [];
  showObject.push([clc.cyanBright('LINKS'), clc.cyanBright('TEXT'), clc.cyanBright('FILE')]);
  for (let i = 0; i < msg.length; i += 1) {
    const arrayHref = [];
    arrayHref.push((msg[i].href.length > 49 ? clc.yellowBright(`${msg[i].href.slice(0, 49)}...`) : clc.yellowBright(msg[i].href)));
    arrayHref.push((msg[i].text.length > 39 ? `${msg[i].text.slice(0, 39)}...` : msg[i].text));
    arrayHref.push(clc.blueBright(path.relative('0', msg[i].file)));
    showObject.push(arrayHref);
  }
  return showObject;
});
const links = ((msg, flag) => {
  let drawElement = '';
  if (flag) {
    const showObject = eachFile(msg);
    drawElement = drawTable(showObject);
  } else {
    const showObject = [];
    showObject.push([clc.cyanBright('LINKS'), clc.cyanBright('TEXT'), clc.cyanBright('FILE')]);
    msg.forEach((element) => {
      for (let i = 0; i < element.length; i += 1) {
        const arrayHref = [];
        arrayHref.push((element[i].href.length > 49 ? clc.yellowBright(`${element[i].href.slice(0, 49)}...`) : clc.yellowBright(element[i].href.slice(0, 49))));
        arrayHref.push((element[i].text.length > 39 ? `${element[i].text.slice(0, 39)}...` : element[i].text));
        arrayHref.push(clc.blueBright(path.relative('0', element[i].file)));
        showObject.push(arrayHref);
      }
    });
    drawElement = drawTable(showObject);
  }
  return drawElement;
});
const eachFileValidate = ((msg) => {
  const showObject = [];
  showObject.push([clc.cyanBright('LINKS'), clc.cyanBright('TEXT'), clc.cyanBright('FILE'), clc.cyanBright('STATUS'), clc.cyanBright('TEXT STATUS')]);
  for (let i = 0; i < msg.length; i += 1) {
    const arrayHref = [];
    arrayHref.push((msg[i].href.length > 49 ? clc.yellowBright(`${msg[i].href.slice(0, 49)}...`) : clc.yellowBright(msg[i].href.slice(0, 49))));
    arrayHref.push((msg[i].text.length > 39 ? `${msg[i].text.slice(0, 39)}...` : msg[i].text));
    arrayHref.push((msg[i].statusText === 'Ok' ? clc.blueBright(path.relative('0', msg[i].file)) : clc.bgRedBright(path.relative('0', msg[i].file))));
    arrayHref.push((msg[i].statusText === 'Ok' ? clc.greenBright(msg[i].status) : clc.redBright(msg[i].status)));
    arrayHref.push((msg[i].statusText === 'Ok' ? clc.greenBright(msg[i].statusText) : clc.redBright(msg[i].statusText)));
    showObject.push(arrayHref);
  }
  return showObject;
});
const linkValidate = ((msg, flag) => {
  let drawElement = '';
  if (flag) {
    const showValidate = eachFileValidate(msg);
    drawElement = drawTable(showValidate);
  } else {
    const showObject = [];
    showObject.push([clc.cyanBright('LINKS'), clc.cyanBright('TEXT'), clc.cyanBright('FILE'), clc.cyanBright('CODE'), clc.cyanBright('STATUS')]);
    msg.forEach((element) => {
      for (let i = 0; i < element.length; i += 1) {
        const arrayHref = [];
        const corte = element[i].href;
        arrayHref.push((element[i].href.length > 49 ? clc.yellowBright(`${corte.slice(0, 49)}...`) : clc.yellowBright(corte.slice(0, 49))));
        arrayHref.push((element[i].text > 39 ? `${element[i].text.slice(0, 39)}...` : element[i].text));
        arrayHref.push((element[i].statusText === 'Ok' ? clc.blueBright(path.relative('0', element[i].file)) : clc.bgRed(path.relative('0', element[i].file))));
        arrayHref.push((element[i].statusText === 'Ok' ? clc.greenBright(element[i].status) : clc.redBright(element[i].status)));
        arrayHref.push((element[i].statusText === 'Ok' ? clc.greenBright(element[i].statusText) : clc.redBright(element[i].statusText)));
        showObject.push(arrayHref);
      }
    });
    drawElement = drawTable(showObject);
  }
  return drawElement;
});
const statsMd = ((msg, flag) => {
  const showObject = [];
  if (flag) {
    showObject.push([clc.cyanBright('TOTAL LINKS'), clc.cyanBright('UNIQUE LINKS')]);
    const arrayHref = [];
    arrayHref.push(clc.yellowBright(msg.length));
    let ar = [];
    ar = msg.map((item) => item.href);
    arrayHref.push(clc.yellowBright([...new Set(ar)].length));
    showObject.push(arrayHref);
  } else {
    const arrayHref = [];
    let contLinks = 0;
    let contUnique = 0;
    showObject.push([clc.cyanBright('TOTAL FILES'), clc.cyanBright('TOTAL LINKS'), clc.cyanBright('UNIQUE LINKS')]);
    arrayHref.push(clc.greenBright(msg.length));
    msg.forEach((elm) => {
      let ar = [];
      ar = elm.map((item) => item.href);
      contLinks += elm.length;
      contUnique += ([...new Set(ar)].length);
    });
    arrayHref.push(clc.yellowBright(contLinks));
    arrayHref.push(clc.yellowBright(contUnique));
    showObject.push(arrayHref);
  }
  return drawTable(showObject);
});

const statsValidateMd = ((msg, flag) => {
  const showObject = [];
  if (flag) {
    showObject.push([clc.cyanBright('TOTAL LINKS'), clc.cyanBright('UNIQUE LINKS'), clc.cyanBright('BROKEN LINKS')]);
    const arrayHref = [];
    arrayHref.push(clc.greenBright(msg.length));
    let ar = [];
    ar = msg.map((item) => item.href);
    arrayHref.push(clc.yellowBright([...new Set(ar)].length));
    const esto = msg.map((elm) => elm.statusText);
    const filterFail = esto.filter((fail) => fail === 'Fail');
    arrayHref.push((filterFail.length > 0 ? clc.redBright(filterFail.length)
      : clc.greenBright(filterFail.length)));
    showObject.push(arrayHref);
  } else {
    showObject.push([clc.cyanBright('TOTAL FILES'), clc.cyanBright('TOTAL LINKS'), clc.cyanBright('UNIQUE LINKS'), clc.cyanBright('BROKEN LINKS')]);
    const arrayHref = [];
    let contLinks = 0;
    let contUnique = 0;
    let failTotal = 0;
    arrayHref.push(clc.greenBright(msg.length));
    msg.forEach((elm) => {
      let ar = [];
      ar = elm.map((item) => item.href);
      contLinks += elm.length;
      contUnique += ([...new Set(ar)].length);
      const esto = elm.map((element) => element.statusText);
      const filterFail = esto.filter((fail) => fail === 'Fail');
      failTotal += filterFail.length;
    });
    arrayHref.push(clc.yellowBright(contLinks));
    arrayHref.push(clc.yellowBright(contUnique));
    arrayHref.push((failTotal > 0 ? clc.redBright(failTotal)
      : clc.greenBright(failTotal)));
    showObject.push(arrayHref);
  }
  return drawTable(showObject);
});
module.exports = {
  links,
  statsMd,
  statsValidateMd,
  linkValidate,
  drawTable,
  help,
  banner,
};
