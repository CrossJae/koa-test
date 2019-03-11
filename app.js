const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    console.log('step 1')
    await next()
    console.log('step 5')
})

app.use(async (ctx, next) => {
    const start = Date.now()
    console.log('step 2')
    await next()
    const ms = Date.now() - start
    console.log('step 4 ，共需要' + ms + '毫秒')
})

app.use(async ctx => {
    console.log('step 3')
    ctx.body = 'Hello World!'
})

app.listen(3000)