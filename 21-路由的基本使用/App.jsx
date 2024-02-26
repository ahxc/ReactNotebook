import React, { Component } from "react";
import { NavLink, Link, Route, Switch, Redirect, Routes, useRoutes, useNavigate, } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import MyNavLink from "./components/MyNavLink";

import { withRouter } from 'react-router-dom'; // 解决一般组件无路由三大属性的问题。需要一般组件操控路由的场景
// const component = () => {
//     return <div></div>;
// };
// export default withRouter(Component);

// 1.一个路由就是key和value的映射关系
// 2.key就是路径path，value可以是组件和函数。

// 路由分为前端路由和后端路由
// 后端路由：value是函数，一般接收路径参数请求数据和请求接口的url就是后端路由。
// 前端路由：value是组件，即地址栏的路径的变化调用不同的前端组件。

//  react针对场景提供了三种路由，web，native，anywhere，脚手架里没有安装路由，需要自行安装

// 路由的基本使用
// 1。明确页面的导航区和展示区
// 2。导航区的a标签改为Link标签 <Link to="/about">About</Link>
// 3。展示区的路劲与a标签的路径匹配，<Route path="/about" component={About}/>
// 4。App组件标签外包裹一个<BrowserRouter> history 模式，或 <HashRouter> hash 模式

// ! 路由组件和一般组件本质的区别，只有路由组件会接收三大 props：location、history、match
// 然后就是写法不同，<App/><Route path="/about" component={About}/>

// 编程式路由
// 和js笔记history方法命名有区别，作用大体一致。
const click = () => {
    // params
    this.props.history.push(`/home/${id}/${title}`);

    // search
    this.props.history.replace(`/home/${id}/${title}`);

    // state
    this.props.history.replace(`/home`, { id, title });

    this.props.history.go();
    this.props.history.goForward();
    this.props.history.goBack();
};

// 函数编程

// 和vue类似路由列表，用模版语法直接渲染 { routesA }
const routesA = useRoutes([
    {
        path: '/about',
        element: <ClassTest />,
        children: {
            path: '/',
            element: <Navigate to='/about' />,
        },
    },
    {
        path: '/',
        element: <Navigate to='/about' />,
    },
]);

// useNavigate，编程路由替换了之前useHistory
function name(params) {
    const navigate = useNavigate();
    // 第一种方式
    navigate('/url', {
        replace: false,
        state: { a: 'zx', b: '29' }
    });
    // 第二种方式
    navigate(-1); // 和history类似。
}

// useParams 参数。
function ProfilePage() {
    // 获取URL中携带过来的params参数
    let { id } = useParams();
}

function App() {
    return (
        <Routes>
            <Route path="users/:id" element={<User />} />
        </Routes>
    );
}

// useSearchParams 参数。
import { useSearchParams } from 'react-router-dom';

export default function Detail() {
    // setSearch 仅用于更新search参数
    const [search, setSearch] = useSearchParams();
    // search 用于 search 中获取参数
    const id = search.get('id');
    const title = search.get('title');
    const content = search.get('content');
    return (
        <ul>
            <li>
                <button onClick={() => setSearch('id=008&title=哈哈&content=嘻嘻')}>点我更新一下收到的search参数</button>
            </li>
            <li>消息编号：{id}</li>
            <li>消息标题：{title}</li>
            <li>消息内容：{content}</li>
        </ul>
    );
}

// state 参数没有变化还是link标签，附带 state属性。


// useLocation，获取location对象。
import { useLocation } from 'react-router-dom';

export default function Detail() {
    const x = useLocation();
    // x就是location对象:
    /*
        {
      hash: "",
      key: "ah9nv6sz",
      pathname: "/login",
      search: "?name=zs&age=18",
      state: {a: 1, b: 2}
    }
    */
    return (
        <ul>
        </ul>
    );
}

// useOutlet 用来呈现组件渲染的嵌套路由， outlet 渲染的内容。
const res = useOutlet();

// useResolvedPath() 给定一个url值，解析其中 path，search，hash

export default class App extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header">
                            <h2>React Router Demo</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/* 原生html中，靠<a>跳转不同的页面 */}
                            {/* <a className="list-group-item" href="./about.html">About</a>
								<a className="list-group-item active" href="./home.html">Home</a> */}

                            {/* 导航区 */}
                            {/* 在React中靠路由链接实现切换组件--编写路由链接，功能和a标签一致，点击后跳转路由但不会刷新页面 */}
                            {/* 原理：history.pushState */}
                            <Link className="list-group-item" to="/about">
                                About
                            </Link>
                            <Link className="list-group-item" to="/home">
                                Home
                            </Link>

                            {/* NavLink是link的升级版，可追加激活样式，还可通过isActive确认是否激活*/}
                            <NavLink
                                aciveClassName="active"
                                className="list-group-item"
                                to="/home"
                                isActive={``}
                            >
                                Home
                            </NavLink>

                            {/* 对NavLink的封装 */}
                            <MyNavLink to="/about" title="about" />
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/* 展示区 */}
                                {/* react路由在匹配路径时会多次匹配，使用switch组件用以匹配路径成功后停止匹配，常用于单一匹配 */}
                                <Switch>
                                    {/* 注册路由组件 */}
                                    {/* 路由的模糊匹配是默认的，即只要顺序一致即可匹配如 /home和/home/a/b，/a/home/b不可 */}
                                    {/* 精确匹配即加上exact，必须完全一致 */}
                                    <Route path="/about" component={About} />
                                    <Route
                                        exact
                                        path="/home"
                                        component={Home}
                                    />
                                    {/* Redireact相当于默认页面，当所有匹配失败重定向指定路由 */}
                                    <Redirect from='' to="/about" />
                                    {/* 注意，如果组件里还有路由，即嵌套路由，比如Home里的子路由，那么需要把Home的路由/home也加到path里
								如/home/news */}

                                    {/* 实现单个路由的重定向，进入/跳转路由home，并使用懒加载的方式。V6写法 */}
                                    <Route exact path='/' render={() => <Redirect to='/home' />}></Route>

                                    {/* 嵌套路由 */}
                                    <Route
                                        exact
                                        path="/home/news"
                                        component={Home}
                                    />

                                    {/* 组件导航路由 */}

                                    {/* 向路由组件传递参数 params，唯一需要声明的参数 */}
                                    {/* 组件通过 this.props.match.params 获取字典对象，也可以分析url字符串截取。 */}
                                    <Link to={`/home/news/${id}/${title}`}>
                                        About
                                    </Link>
                                    <Route
                                        exact
                                        path="/home/news/:id/:title"
                                        component={Home}
                                    />

                                    {/* 向路由组件传递参数 search */}
                                    {/* 组件通过 this.props.location.search 获取，也可以通过url.Slice(index)，也可以通过window.location对象获取 */}
                                    {/* urlencoded编码需要去除?和&符号 */}
                                    {/* 可使用 querystring 库处理，*/}
                                    {/* import qs from 'querystring */}
                                    {/* qs.parse(search)，返回一个参数字典 */}
                                    <Link to={`/home/news/?id=${id}&title=${title}`}>
                                        About
                                    </Link>
                                    <Route
                                        exact
                                        path="/home/news/?id=1&title=1"
                                        component={Home}
                                    />

                                    {/* 向路由组件传递参数 state，刷新也能保留参数 */}
                                    {/* 组件通过 this.props.location.state 获取字典对象，注意undefined */}
                                    <Link to={{ pathname: 'home/news/detail', state: { id: 1, title: 1 } }}>
                                        About
                                    </Link>
                                    <Route
                                        exact
                                        path="/home/news/?id=1&title=1"
                                        component={Home}
                                    />

                                    {/* replace属性 */}
                                    <Link replace to={{ pathname: 'home/news/detail', state: { id: 1, title: 1 } }}>
                                        About
                                    </Link>

                                </Switch>

                                {/* react router v6 变化 */}
                                {/* Switch 替成 Routes */}
                                <Routes>
                                    <Route
                                        path='/'
                                        caseSensitive /* 是否区分大小写 */
                                        element={<ClassTest />}
                                        Component={ClassTest}  /* 旧写法 Component 注意首字母大写 */
                                    />
                                    {/* 新版重定向，只要 navigate 组件被渲染就会修改path路径 */}
                                    <Route path='/' element={<Navigate to='/about'
                                        replace={false} // 默认push
                                    />} />
                                    {
                                        sum === 1
                                            ? Boolean
                                            : <Navigate to='/about'
                                                replace={false} // 默认push
                                            />
                                    }
                                </Routes>

                                {/* useRoutes 的使用 */}
                                {routesA} {/* 等同于上面 Routes 内容 */}

                                {/* 类似 vue 的 router-view ，路由组件的渲染地方 */}
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
