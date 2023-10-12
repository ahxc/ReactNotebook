import React, { Component } from 'react';
import './index.css';
import C from '../1_setState';

export default class Parent extends Component {
	render() {
		return (
			<div className="parent">
				<h3>我是Parent组件</h3>
				{/* 通过自定义属性render实现插槽功能 */}
				<A render={(name) => <C name={name} />} /> {/* 路由组件也有render属性 */}
				{/* 下面的写法，A无法在组件内部传递数据name给C，因为语句为this.props.children */}
				{/* 当然可以把C直接在A内部定义，不通过props通信，但有新问题上面的写法A和C可以直接和父组件进行props通信，缩短了通信流。即插槽的一大作用 */}
				<A>
					<c></c>
				</A>
			</div>
		);
	}
}

class A extends Component {
	state = { name: 'tom' };
	render() {
		console.log(this.props);
		const { name } = this.state;
		return (
			<div className="a">
				<h3>我是A组件</h3>
				{this.props.render(name)}
			</div>
		);
	}
}
