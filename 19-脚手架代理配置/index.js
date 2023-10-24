// ! img，link，script，不受同源策略限制

/* 代理服务器请求基本过程
客户端3000，服务器端5000，需要代理服务器与客户端一致3000，
客户端请求端口设置为3000，代理地址为5000。
原理：客户端跨域请求5000因为csor端口不一致，从而使用3000代理请求5000，跨域限制仅仅是浏览器行为，客户端再请求代理的资源
*/

/* 第一种跨域的解决方式：代理 */
// package.json下加入配置，缺点，代理ip固定，资源请求固定
// 需要设置多个代理
{
	proxy: '代理url';
}

/* 第二种方法：使用react的代理中间件，配置目标端口服务器地址。
setupProxy.js文件名，然后置入项目根目录 */
const proxy = require('http-proxy-middleware');
// http-proxy-middleware 是一个能够将请求代理到其他服务器的中间件。
// 它可以将前端页面收到的请求转发到其他服务器上，从而实现跨域访问或代理转发等功能。
// 这个中间件可以用来解决由于协议和端口造成的跨域问题，但需要在服务器端进行相应的配置和处理。

module.exports = function (app) {
	app.use(
		proxy('/api1', { // 遇见api1前缀的请求触发该代理
			target: 'http://loaclhost:5000',// 请求转发
			changeDrigin: true, // 控制服务器收到响应头中的Host字段
			pathRewrite: { '^/api1': "" }
		}),
		proxy('/api2', {
			target: 'http://localhost:5001',
			changeOrigin: true,
			pathRewrite: { '^/api2': "" }
		}));
};

/* 你的请求页面， */
import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {

	getStudentData = () => {
		axios.get('http://localhost:3000/api1/students').then(
			(response) => { console.log('成功了', response.data); },
			(error) => { console.log('失败了', error); }
		);
	};

	getCarData = () => {
		axios.get('http://localhost:3000/api2/cars').then(
			(response) => { console.log('成功了', response.data); },
			(error) => { console.log('失败了', error); }
		);
	};

	render() {
		return (
			<div>
				<button onClick={this.getStudentData}>点我获取学生数据</button>
				<button onClick={this.getCarData}>点我获取汽车数据</button>
			</div>
		);
	}
}