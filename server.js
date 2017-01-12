const Koa = require('koa');
const mount = require('koa-mount');
const convert = require('koa-convert');
const graphqlHTTP = require('koa-graphql');
const { schema, rootValue } = require('./schema');

const app = new Koa();

app.use(mount('/graphql', convert(graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}))));

app.listen(3000);
