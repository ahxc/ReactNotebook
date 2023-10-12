import React, { Component } from 'react';
import './index.css';

// 创建Context对象，最好单独作为公共文件以便各个模块提取。
const MyContext = React.createContext();
const { Provider, Consumer } = MyContext;

export default class A extends Component {

	state = { username: 'tom', age: 18 };

	render() {
		const { username, age } = this.state;
		return (
			<div className="parent">
				<h3>我是A组件</h3>
				<h4>我的用户名是:{username}</h4>
				{/* 用 provider 包裹需要传递消息子组件，并通过value属性传递 */}
				<Provider value={{ username, age }}>
					<B />
				</Provider>
			</div>
		);
	}
}

// 不声明无法拿取
class B extends Component {
	render() {
		return (
			<div className="child">
				<h3>我是B组件</h3>
				<C />
				<D />
			</div>
		);
	}
}

class C extends Component {
	// 声明接收 context 
	static contextType = MyContext;
	render() {
		// 然后通过this拿去。
		const { username, age } = this.context;
		return (
			<div className="grand">
				<h3>我是C组件</h3>
				<h4>我从A组件接收到的用户名:{username},年龄是{age}</h4>
			</div>
		);
	}
}


// 函数组件通过 useContext 获取

import { useContext } from "react";

function D() {
	// use语法需写在函数体内。
	const ContextHooks = useContext(MyContext);
	// 一个字典对象
	console.log(ContextHooks.name, ContextHooks.age);

	return (
		<div className="grand">
			<h3>我是C组件</h3>
			<h4>我从A组件接收到的用户名:
				{/* 或者通过 consumer 组件获取，必须严格按照这个语法格式，且不能有多个子节点 */}
				<Consumer>
					{(value) => `${value.username},年龄是${value.age}`}
				</Consumer>
			</h4>
		</div>
	);
}