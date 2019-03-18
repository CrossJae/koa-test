const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    // ctx.throw('name required!') // 默认是500，server会报错
    // ctx.throw(400, 'name required!!!')
    ctx.state.user = 'crossjae'
    await next()
})

app.use( ctx => {
    ctx.assert(ctx.state.user, 401, '未登录！')
    ctx.body = `hi, ${ctx.state.user}!`
})

app.listen(3000)