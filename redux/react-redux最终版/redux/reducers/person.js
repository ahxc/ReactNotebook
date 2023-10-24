import { ADD_PERSON } from '../constant';

// 初始化人的列表
const initState = [{ id: '001', name: 'tom', age: 18 }];

export default function personReducer(preState = initState, action) {
	const { type, data } = action;
	switch (type) {
		case ADD_PERSON: //若是添加一个人
			// preState.unshift(data) // 此处不可以这样写，这样会导致preState被改写了，personReducer就不是纯函数了。
			// 纯函数，内部操作不会影响到外部环境，且相同的输入有相同的输出。
			return [data, ...preState];
		default:
			return preState;
	}
}
