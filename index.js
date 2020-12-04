const express = require('express') // 在当前文件中引入express
const app = express()
    // 引入mysql数据库
var mysql = require('mysql')
    //创建数据库连接
var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'xwh'
    })
    // 连接数据库
connection.connect()
    //使用sql语句进行查询

//使用静态资源配置  public表示存放静态资源的文件目录
app.use(express.static('public'))
    // express header头解决跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
});
const port = 3000 // 定义运行的端口号

// api接口  get请求
app.get('/home', (req, res) => res.send('首页')) // res.send里边所写的内容就是后台返回的数据
app.get('/list', (req, res) => {
    //  req.query.参数名   可以获取前端调用接口传递过来的参数值   该参数值是以https://www.xxx.com?参数名1=参数值&参数名2=参数值 传递过来的数据
    // 只能获取问号后边的参数值
    var page = req.query.page
    var num = req.query.limit
    connection.query(`select * from t_goods limit ${(page-1)*num},${num};`, function(err, data, fields) {
        // lists=lists.concat(rows)
        res.send({
            status: 200,
            data: data // rows对应的是数据库查询返回的数据
        })
    })
})
app.get('/mine', (req, res) => res.send())
app.post('/login', function(req, res) {
    res.send('Hello World!')
})

/*
    当路由的地址是有规律进行出现的时候
        /detail/1
        /detail/2
    发现路由只有detail/后边的数值在变，而前边的地址没有改变，这个时候我们就可以使用动态路由来进行匹配
        /detail/:id    id表示前台传递接口斜杠后边的数值   前边的冒号表示当前的id是一个动态  他可以表示 1 2 3 4 ... n
        /detail/:自定义名字
        获取的时候需要使用 req.params.自定义名字    使用params这种形式获取的是 /后边的参数值
*/
app.get('/detail/:a', (req, res) => {
    // res.send({
    //         data: req.params.a
    //     })
    var id = req.params.a
    connection.query(`select * from t_goods where id=${id};`, function(err, rows, fields) {
        res.send({
            data: rows
        })
    })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))