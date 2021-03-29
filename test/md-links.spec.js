const data = require('./data.js');
const {
  isFile,
  isDir,
  validateLinks,
  returnObject,
} = require('../src/components/means');
const {
  pathLocation,
  searchMd,
  arrayDir,
  mdLinks,
} = require('../src/mdLinks');

const array = [];
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
      .rejects.toStrictEqual(new Error('La ruta apunta a un archivo con diferente extensión Marckdown, type: .txt'));
  });
});
describe('Function pathLocation', () => {
  it('Is function', () => {
    expect(typeof pathLocation).toBe('function');
  });
  test('Should print Promises links validate', () => {
    const promises = pathLocation(data.obj[0].path2, true);
    Promise.all(promises).then((msg) => {
      expect(msg).toEqual(data.obj[0].rst);
    });
  });
  test('Should print Promises object links', () => {
    const promesas = pathLocation(data.obj[0].path2, false);
    Promise.all(promesas).then((msg) => {
      expect(msg).toEqual(data.obj[0].rst2);
    });
  });
});
describe('Function searchMd', () => {
  it('Is function', () => {
    expect(typeof searchMd).toBe('function');
  });
  test('Should print arrayDir', () => {
    expect(searchMd(data.obj[0].dir, array)).toEqual(data.obj[0].arrayDir);
  });
});

describe('Function arayDir', () => {
  it('Is function', () => {
    expect(typeof arrayDir).toBe('function');
  });
  test('Should print information directory', () => {
    const esto = arrayDir(data.obj[0].arrayDir, true);
    const arrayPromises = esto.map((element) => Promise.all(element));
    return expect(Promise.all(arrayPromises))
      .resolves.toEqual(data.obj[0].salida);
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
describe('Function returnObject', () => {
  it('Should print is a function', () => {
    expect(typeof returnObject).toBe('function');
  });
  test('Case returnObject cero', () => {
    return expect(returnObject([]))
      .toEqual([]);
  });
});