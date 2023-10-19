import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';
// react.PropTypes

// 方法一：创建Context对象，最好单独作为公共文件以便各个模块提取。
const MyContext = React.createContext();
const { Provider, Consumer } = MyContext;

export default class A extends Component {

	state = { username: 'tom', age: 18 };

	// ! 如果接受者要更新提供者传来的context，可以把更新的办法传递过去。
	// 函数组件则不需要bind this，把set方法传过去即可。

	get
		render() {
		const { username, age } = this.state;
		return (
			<div className="parent">
				<h3>我是A组件</h3>
				<h4>我的用户名是:{username}</h4>
				{/* 用 provider 包裹需要传递消息子组件，并通过value属性传递 */}
				<Provider value={{ username, age, update: this.updateContextValue.bind(this) }}>
					<B />
				</Provider>
			</div>
		);
	}
}

class B extends Component {
	// 不声明无法拿取
	static childContext = {
		color: PropTypes.string,
		changeColor: PropTypes.func,
	};

	//--- 方法二：context 也可不用导入createContext，通过生命周期方法 getChildContext 获取孙子组件的上下文。
	// ! 注意这方法只能父子组件通信，而createContext包裹的组件无此限制。

	getChildContext() {
		return {
			color: 'red',
			theme: {},
		};
	}

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
	static contextType = {
		...MyContext,
		//--- 在此声明
		color: PropTypes.string,
		theme: PropTypes.object,
	};
	render() {
		console.log(this.context.color);
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