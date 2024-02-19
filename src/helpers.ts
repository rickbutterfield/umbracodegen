import Handlebars from 'handlebars';

Handlebars.registerHelper('times', (n: number, context: any, options: Handlebars.HelperOptions) => {
  let accum = '';
  for (let i = 0; i < n; i++) {
    accum += options.fn({ ...context, index: i });
  }
  return accum;
});