什么是express
    express是基于nodejs的一个web的框架
    主要就是进行api的编写的

    在express中想要实现后台数据库的操作
    首先需要在你的项目中安装mysql
        1 安装命令
        npm install mysql --save


    在express中如果想要前端对接口进行传参，有两种形式
    1 https://www.xxx.com/参数值  以斜杠后边追加参数的形式传递
    我们在使用nodejs编写接口的时候，如果多个参数值请求的使用一个接口的时候(列表跳转详情页面，详情页需要传递不同的id，但是使用的却是同一个sql查询语句)这个时候，我们
    需要使用动态路由来进行匹配
    app.get("/detail/:自定义名字")   :自定义名字的形式就是动态路由  他可以匹配  /detail/1   /detail/2  /detail/张三  不管斜杠后边传递的是什么

    想要获取一下前端传递过来斜杠后边的值 使用 req.params.自定义名字

    2 https://www.xxx.com?参数名1=参数值&参数名2=参数值  以问号形式追加参数
    优势：
        可以一次性传递多个参数
        
    那么我们想要获取一下问号后边的参数值，需要使用
    req.query.参数名1    
    req.query.参数名2