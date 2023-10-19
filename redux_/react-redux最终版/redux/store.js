/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

// applyMiddleware 用于引入redux的中间件。
import { createStore, applyMiddleware } from 'redux';
//引入汇总之后的reducer
import reducer from './reducers';
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk';
// 一个可视化工具
import { composeWithDevTools } from 'redux-devtools-extension';

// thunk，异步中间件。用于处理Reducer无法处理的异步操作。
// 可以在action creator中返回一个函数，参数为dispatch，用于向Redux的store发送异步action。
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));