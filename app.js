const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    console.log('step 1')
    await next()
    console.log('step 3')
})

app.use(async ctx => {
    console.log('step 2')
    ctx.body = 'Hello World!'
})

app.listen(3000)