const http = require('http')

const Koa = require('koa')
const app = new Koa()

app.keys = ['abc', '123']

// 可以在context上创建属性，但不建议过多的使用
app.context.baseApi = '//test.xxx.com/'
app.context.sayHi = () => `使用context获得api地址：`

app.use(async (ctx, next) => {
    console.log('cookie:::>', ctx.cookies.get('name', { signed: true }))
    console.log('step 1')
    // 为cookie加密
    ctx.cookies.set('name', 'cross', { signed: true })
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
    ctx.body = ctx.sayHi() + ctx.baseApi //'Hello World!'
})

// app.listen(3000)
http.createServer(app.callback()).listen(3000)