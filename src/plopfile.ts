import Handlebars from 'handlebars';
import { kebabCase, startCase } from 'lodash-es';
import { NodePlopAPI } from 'node-plop';
import { generators } from './generators.js';

const pascalCase = (str: string) => startCase(str).replace(/ /g, '');

export default function (plop: NodePlopAPI) {
  plop.setHelper('elementName', (name) => pascalCase(name));
  plop.setHelper('typeName', (name) => pascalCase(name));
  plop.setHelper('tagName', (name) => kebabCase(name));

  plop.setHelper('times', (n: number, context: any, options: Handlebars.HelperOptions) => {
    let accum = '';
    for (let i = 0; i < n; i++) {
      accum += options.fn({ ...context, index: i });
    }
    return accum;
  });

  plop.setHelper('contains', (needle: string, haystack: string, context: any, options: Handlebars.HelperOptions) => {
    needle = Handlebars.escapeExpression(needle);
    haystack = Handlebars.escapeExpression(haystack);

    const found: boolean = haystack.indexOf(needle) > -1;

    if (found) {
      return options.fn(context);
    }
    else {
      return options.inverse(context);
    }
  });

  Object.entries(generators).forEach(([name, config]) => {
    plop.setGenerator(name, config);
  });
}