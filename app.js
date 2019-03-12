const http = require('http')

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    console.log('step 1')
    await next()
    // 以下内容是最后会执行的
    console.log('step 5')
    const responseTime = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method} ${ctx.url} - ${responseTime}`)
})

app.use(async (ctx, next) => {
    const start = Date.now()
    console.log('step 2')
    await next()
    const ms = Date.now() - start
    console.log('step 4 ，共需要' + ms + '毫秒')
    ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(async ctx => {
    console.log('step 3')
    ctx.body = 'Hello World!'
})

// app.listen(3000)
http.createServer(app.callback()).listen(3000)