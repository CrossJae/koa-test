const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    console.log(ctx.req) //在本行断点，可以查看req或者res的方法
})

app.listen(3000)