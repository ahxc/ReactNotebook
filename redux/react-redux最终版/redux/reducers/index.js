/* 
	该文件用于汇总所有的reducer为一个总的reducer
*/
//引入combineReducers，用于汇总多个reducer
import { combineReducers } from 'redux';
//引入为Count组件服务的reducer
import count from './count';
//引入为Person组件服务的reducer
import persons from './person';

//汇总所有的reducer变为一个总的reducer
// 每个状态字段type必须唯一，包括不同reducer之间。
// 一个reducer就是一个state。
export default combineReducers({
	count,
	persons
});

// hooks 版
import React, { useReducer, useEffect } from "react";

function Counter() {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'increment':
				return { count: state.count + 1, step: 0 };
			case 'decrement':
				return { count: state.count - 1, step: 0 };
			case 'reset':
				return { count: 0, step: 0 };
			default:
				throw new Error();
		}
	}, { count: 0, step: 0 });

	const { count, step } = state;

	useEffect(() => {
		const id = setInterval(() => {
			if (step < 5) {
				dispatch({ type: 'increment' });
				step += 1;
			} else {
				dispatch({ type: 'decrement' });
				step = 0;
			}
		}, 1000);
		return () => clearInterval(id);
	}, [dispatch]);  // 将dispatch作为依赖项，这样useEffect将根据dispatch的动作重新渲染。  

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={() => dispatch({ type: 'increment' })}>+</button>
			<button onClick={() => dispatch({ type: 'decrement' })}>-</button>
			<button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
		</div>
	);
}