import Handlebars from 'handlebars';

const _this = this;

Handlebars.registerHelper('times', (n: number, context: any, options: Handlebars.HelperOptions) => {
  let accum = '';
  for (let i = 0; i < n; i++) {
    accum += options.fn({ ...context, index: i });
  }
  return accum;
});

Handlebars.registerHelper('contains', function (needle: string, haystack: string, options: Handlebars.HelperOptions) {
   needle = Handlebars.escapeExpression(needle);
   console.log("needle", needle);
   haystack = Handlebars.escapeExpression(haystack);
   console.log("haystack", haystack);
   return (haystack.indexOf(needle) > -1) ? options.fn(_this) : options.inverse(_this);
});