const { table } = require('table');
const clc = require('cli-color');
const path = require('path');

const drawTable = ((show) => {
  const data = show;
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
  const output = table(data, config);
  console.log(output);
});
const eachFile = ((msg) => {
  const showObject = [];
  showObject.push([clc.cyanBright('HREF'), clc.cyanBright('TEXT'), clc.cyanBright('FILE')]);
  for (let i = 0; i < msg.length; i += 1) {
    const arrayHref = [];
    arrayHref.push(clc.yellowBright(msg[i].href.slice(0, 49)));
    arrayHref.push(msg[i].text.slice(0, 49));
    arrayHref.push(path.relative('0', msg[i].file));
    showObject.push(arrayHref);
  }
  return showObject;
});
const eachFileValidate = ((msg) => {
  const showObject = [];
  showObject.push([clc.cyanBright('HREF'), clc.cyanBright('TEXT'), clc.cyanBright('FILE'), clc.cyanBright('STATUS'), clc.cyanBright('TEXT STATUS')]);
  for (let i = 0; i < msg.length; i += 1) {
    const arrayHref = [];
    arrayHref.push(clc.yellowBright(msg[i].href.slice(0, 49)));
    arrayHref.push(msg[i].text.slice(0, 49));
    arrayHref.push(path.relative('0', msg[i].file));
    arrayHref.push(msg[i].status);
    arrayHref.push((msg[i].statusText === 'Ok' ? clc.greenBright(msg[i].statusText) : clc.redBright(msg[i].statusText)));
    showObject.push(arrayHref);
  }
  return showObject;
});
const links = ((msg, flag) => {
  if (flag) {
    const showObject = eachFile(msg);
    drawTable(showObject);
  } else {
    const showObject = [];
    showObject.push([clc.cyanBright('HREF'), clc.cyanBright('TEXT'), clc.cyanBright('FILE')]);
    msg.forEach((element) => {
      for (let i = 0; i < element.length; i += 1) {
        const arrayHref = [];
        arrayHref.push(clc.yellowBright(element[i].href.slice(0, 49)));
        arrayHref.push(element[i].text.slice(0, 49));
        arrayHref.push(path.relative('0', element[i].file));
        showObject.push(arrayHref);
      }
    });
    drawTable(showObject);
  }
});
const linkValidate = ((msg, flag) => {
  if (flag) {
    const showValidate = eachFileValidate(msg);
    drawTable(showValidate);
  } else {
    const showObject = [];
    showObject.push([clc.cyanBright('HREF'), clc.cyanBright('TEXT'), clc.cyanBright('FILE'), clc.cyanBright('CODE'), clc.cyanBright('STATUS')]);
    msg.forEach((element) => {
      for (let i = 0; i < element.length; i += 1) {
        const arrayHref = [];
        const corte = element[i].href;
        arrayHref.push(clc.yellowBright(corte.slice(0, 49)));
        arrayHref.push(element[i].text.slice(0, 49));
        arrayHref.push(path.relative('0', element[i].file));
        arrayHref.push(element[i].status);
        arrayHref.push((element[i].statusText === 'Ok' ? clc.greenBright(element[i].statusText) : clc.redBright(element[i].statusText)));
        showObject.push(arrayHref);
      }
    });
    drawTable(showObject);
  }
});
const statsMd = (() => {
  return 'Estado de md';
});

const statsValidateMd = (() => {
  return 'Stats validate .md';
});
module.exports = {
  links,
  statsMd,
  statsValidateMd,
  linkValidate,
};
