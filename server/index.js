// koa 服务
const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const path = require('path');
const koaBody = require('koa-body');

const store = require('./store');
const app = new Koa();


const staticPath = './html';
app.use(
    static(path.join( __dirname,  staticPath))
);
app.use(koaBody());

const home = new Router();
home.get('/', async (ctx, next) => {
    ctx.status = 302;
    ctx.redirect('/setting.html');
});


const api = new Router();
const defaultSetting = {
    morning: '08:00',
    night: '22:00',
    isOPen: false
}
const Event = require('events');
class EventEmitter extends Event {}
const emmiter = new EventEmitter();

api.get('/get_setting', async (ctx, next) => {
    let setting = await store.get();
    if (!setting) {
        setting = defaultSetting;
        await store.set(setting);
    }
    ctx.body = {
        errmsg: 'success',
        data: setting
    }
})

api.post('/update_setting', async (ctx, next) => {
    let setting = ctx.request.body;
    await store.set(setting);
    ctx.body = {
        errmsg: 'success'
    }
    emmiter.emit('update', setting);
});



const router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());


app.use(router.routes()).use(router.allowedMethods());

setImmediate(async () => {
    emmiter.emit('update', await store.get());
}, 100)

module.exports = {
    start() {
        app.listen(3000);
    },
    settingState: emmiter
}
