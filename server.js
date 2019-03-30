const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(router.routes());

app.get('/', async (ctx, next) => {
    console.log(ctx.method);
    await next();
});

app.listen(3000);
