# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Primeros pasos](#2-primeros pasos)
* [3. API de la librería](#3-api-de-la-librería)
* [4. Entregables](#4-entregables)
* [5. Hacker edition](#5-hacker-edition)

***

## 1. Preámbulo
[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## 2. Primeros pasos
La librería Marckdown-read-link nos permite analizar archivos en formato Markdown, para validar los links que contenga y reportar algunas estadísticas usando Node.js.

Mediante **npm** se hace la instalación de la librería

`> npm i markdown-read-links`

Cuando la librería este instalada, deberá ingresar mediante la terminal las siguientes series de comandos para hacer el uso correcto de la librería.

Para poder obtener los links de un archivo markdown  o archivos markdown que se encuentren en un directorio, el comando básico que debe de ingresar es:

`> mdLink <path>`

Si desea obtener los links de un archivo markdown ingrese el path de ubicación del archivo, se recomienda ingresar un path relativo, ejemplo: **> mdLink ./doc/example.md **

Si desea obtener los links de un directorio que contiene archivos markdown, ingrese un path relativo de la ubicación del directorio, ejemplo: **> mdLink ./doc/ **

> *Si desea usar un path absoluto, se recomienda escribirlo entre comillas dobles o simples.*

##### Ejemplo gráfica de resultados por consola

[![Links de archivo markdown](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/mdLinkPath.PNG "Links de archivo markdown")](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/mdLinkPath.PNG "Links de archivo markdown")

Si desea validar los links encontrados en el archivo o directorio ingrese el siguiente comando:

`> mdLink <path> --validate`

##### Ejemplo gráfica de resultados por consola

[![Links validados](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/mdLinkValidate.PNG "Links validados")](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/mdLinkValidate.PNG "Links validados")

Si desea obtener estadistica de los links encontrados (Total de links y links únicos) en el/los archivos markdown, ingrese el siguiente comando:

`> mdLink <path> --stats`

##### Ejemplo gráfica de resultados por consola

[![Links estadística ](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/mdLinkStats.PNG "Links estadística ")](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/mdLinkStats.PNG "Links estadística ")

Si quieres obtener estadistica y validación de los links encontrados en el/los archivos markdown ingrese la siguiente combinación de comandos:

`> mdLink <path> --stats --validate`

> El orden de los comandos **--stats** y **--validate** no difiere en la obtención de los resultados.

##### Ejemplo gráfica de resultados por consola

[![links validados y estadística](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/mdLinkStatsValidate.PNG "links validados y estadística")](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/mdLinkStatsValidate.PNG "links validados y estadística")

Si necesita ayuda ingrese el comando **--help** seguido del comando **mdLink**

`> mdLink --help`

##### Ejemplo gráfica de resultados por consola

[![help](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/mdLinkHelp.PNG "help")](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/mdLinkHelp.PNG "help")

## 3. API de la librería

Si desea modificar la librería, puede requerir el API de la siguiente manera:

```js
const API = require('markdown-read-links/src/mdLinks');

API.mdLinks('./readmes/curve/readme2.md',false).then((msg) => {
console.log(msg);
});
```
el API tiene una función llamada **mdLinks** que recibe dos parametros, un **String** y **Boolean**, el primer parámetro debe de ser una ruta que apunte al archivo markdown que desea analizar; el segundo parámetro puede ser: **false**/**true**, si no desea validar los links, ingrese **false** como segundo parámetro de lo contrario ingrese **true**.
La función **mdLink** retorna una promesa que debe de ser consumida para poder visualizar los resultados.

##### Ejemplo gráfica de resultados por consola

[![prueba API](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/apiTrue.PNG "prueba API")](https://raw.githubusercontent.com/Eunice17/LIM014-mdlinks/main/src/img/apiTrue.PNG "prueba API")

## 4. Entregables

Módulo instalable via `npm install <github-user>/md-links`. Este módulo debe
incluir tanto **un ejecutable** como **una interfaz** que podamos importar con `require`
para usarlo programáticamente.

## 5. Hacker edition

Las secciones llamadas _Hacker Edition_ son **opcionales**. Si **terminaste**
con todo lo anterior y te queda tiempo, intenta completarlas. Así podrás
profundizar y/o ejercitar más sobre los objetivos de aprendizaje del proyecto.

* Puedes agregar la propiedad `line` a cada objeto `link` indicando en qué línea
  del archivo se encontró el link.
* Puedes agregar más estadísticas.
* Integración continua con Travis o Circle CI.