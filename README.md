# Pacific Global Etfs

This repository contains some custom code for the new Pacific Global Etfs website in Webflow, for the purpose of populating FLRT/FJNK data on it Holdings Table.

This project is built with:

- Preconfigured development tools:

  - [Typescript](https://www.typescriptlang.org/)
  - [Prettier](https://prettier.io/)
  - [ESLint](https://eslint.org/)
  - [ESBuild](https://esbuild.github.io/)
  - [PapaParse](https://www.npmjs.com/package/@types/papaparse)
  - [Finsweet Ts-Utils](https://www.npmjs.com/package/@finsweet/ts-utils?activeTab=dependents)


## How to start

Open the repository in your terminal and install the NPM packages by running:

```bash
npm install
```
Install finsweet ts-utils
```bash
npm i @finsweet/ts-utils
```
Instal Papaparse
```bash
npm install --save @types/papaparse
```
```bash
npm install papaparse
```
After that, you can generate the production files by running:
```bash
npm run build
```
The output will be generated in the dist folder.

