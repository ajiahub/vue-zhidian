### 后端技术架构
***
*  yiisoft/yii2
*  yiisoft/yii2-redis
*  yiisoft/yii2-mongodb
*  firebase/php-jwt
*  aliyuncs/oss-sdk-php
*  php-curl-class/php-curl-class
*  cornernote/yii2-softdelete

### 前端技术架构
***
*  vue-cli
*  vue
*  axios
*  vue-router
*  vuex
*  font-awesome
*  element-ui
*  scss
*  webpack
*  mock
*  echarts

### 安装

***
项目地址: (`git clone`)
```shell
git clone https://github.com/chinahub/vue-zhidian.git
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
cnpm install
```
启动服务: (http://localhost:3000)

```
npm run dev
```
发布代码

```
npm run build
```
***
### 目录结构
<pre>
├── build                     // 项目的 Webpack 配置文件
├── config                    // 项目配置目录
├── server                    // 项目开发的请求数据
├── src                       // 生产目录
│   ├── assets                // 一些资源文件
│   ├── common                // 通用文件、如工具类、状态码
│   ├── components            // 各种组件
│   ├── pages                 // 各种页面
│   ├── plugins               // 各种插件
│   ├── router                // 路由配置及map
│   ├── store                 // Vuex 状态管理器
│   ├── App.vue               // 根组件
│   ├── favicon.ico           // ico小图标
│   ├── index.html            // 项目入口文件
│   ├── main.js               // Webpack 编译入口文件，入口js
├── static                    // 静态资源，一般把不需要处理的文件可以放这里
├── .babelrc                  // babelrc配置文件
├── .editorconfig             // 代码风格文件，前提是要你的编辑器支持
├── .gitignore                // 用于Git配置不需要加入版本管理的文件
├── .postcssrc.js             // autoprefixer的配置文件
├── package.json              // 项目配置文件
</pre>

### 在线体验:
网址：http://pc.ragonli.com<br>
用户名：zhidian<br>
密码：123456<br>

### 效果截图：
![image](http://ragonli.com/statics/images/home.png)
![image](http://ragonli.com/statics/images/stock.png)

### 扫码加微信交流：
![image](http://ragonli.com/statics/images/ligang.png)
