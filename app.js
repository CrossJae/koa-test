const Koa = require('koa')
const app = new Koa()

// 监听一个事件
app.on('getUrl', (value) => {
    console.log(value)
})

app.use(async (ctx) => {
    console.log('ctx.app:::>', ctx.app) // { subdomainOffset: 2, proxy: false, env: 'development' }
    // 发出一个事件
    // 一般用途：手动释放error事件
    ctx.app.emit('getUrl', ctx.req.url)
})

app.listen(3000)