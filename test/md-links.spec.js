jest.mock('../src/components/status.js');

const data = require('./data.js');
const {
  isFile,
  isDir,
  validateLinks,
} = require('../src/components/means');
const {
  mdLinks,
} = require('../src/mdLinks');

describe('mdLinks', () => {
  it('Is function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  test('Case directory', () => {
    return expect(mdLinks(data.obj[0].dir, true))
      .resolves.toEqual(data.obj[0].salida);
  });
  test('Case directory obj', () => {
    return expect(mdLinks(data.obj[0].dir, false))
      .resolves.toEqual(data.obj[0].objDir);
  });
  test('Case file', () => {
    return expect(mdLinks(data.obj[0].path, true))
      .resolves.toEqual(data.obj[0].rst);
  });
  test('Case file object', () => {
    return expect(mdLinks(data.obj[0].path, false))
      .resolves.toEqual(data.obj[0].rst2);
  });
  test('Case type .txt', () => {
    return expect(mdLinks(data.obj[0].pathTxt, false))
      .rejects.toStrictEqual(new Error
('La ruta apunta a un archivo con diferente extensión Marckdown, type: .txt'));
  });
});
describe('Function isDirectory', () => {
  it('Should print is a function', () => {
    expect(typeof isDir).toBe('function');
  });
  test('Case directory no serch', () => {
    return expect(isDir('C:/Users/Eunice Fiorella/testgit/LIM014-mdlinks/src/dec'))
      .toBe('No such file or directory');
  });
});

describe('Function isFile', () => {
  it('Should print is a function', () => {
    expect(typeof isFile).toBe('function');
  });
  test('Case directory no serch', () => {
    return expect(isFile('C:/Users/Eunice Fiorella/testgit/LIM014-mdlinks/src/doc/case2.md'))
      .toBe('No such file or directory');
  });
});
describe('Function validateLinks', () => {
  it('Should print is a function', () => {
    expect(typeof validateLinks).toBe('function');
  });
  test('Case validateLinks cero', () => {
    return expect(validateLinks([]))
      .toEqual([]);
  });
});
