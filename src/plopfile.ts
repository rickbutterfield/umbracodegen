import { kebabCase, startCase, camelCase } from 'lodash-es';
import { NodePlopAPI } from 'node-plop';
import { generators } from './generators.js';

const pascalCase = (str: string) => startCase(str).replace(/ /g, '');

export default function (plop: NodePlopAPI) {
  plop.setHelper('elementName', (name) => pascalCase(name));
  plop.setHelper('typeName', (name) => pascalCase(name));
  plop.setHelper('tagName', (name) => kebabCase(name));

  Object.entries(generators).forEach(([name, config]) => {
    plop.setGenerator(name, config);
  });
}