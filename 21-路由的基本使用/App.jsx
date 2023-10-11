import React, { Component } from "react";
import { NavLink, Link, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import MyNavLink from "./components/MyNavLink";


// 1.一个路由就是key和value的映射关系
// 2.key就是路径path，value可以是组件和函数。
// 浏览器的路由即基于history的替换。

// 路由分为前端路由和后端路由
// 后端路由：value是函数，一般接收路径参数请求数据和请求接口的url就是后端路由。
// 前端路由：value是组件，即地址栏的路径的变化调用不同的前端组件。

//  react针对场景提供了三种路由，web，native，anywhere，脚手架里没有安装路由，需要自行安装

// 路由的基本使用
// 1。明确页面的导航区和展示区
// 2。导航区的a标签改为Link标签 <Link to="/about">About</Link>
// 3。展示区的路劲与a标签的路径匹配，<Route path="/about" component={About}/>
// 4。App组件标签外包裹一个<BrowserRouter>或<HashRouter>

// 路由组件和一般组件本质的区别，路由组件会接收三大props：location、history、match
// 然后就是写法不同，<App/><Route path="/about" component={About}/>

// 编程式路由
const click = () => {
    // params
    this.props.history.push(`/home/${id}/${title}`);

    // search
    this.props.history.replace(`/home/${id}/${title}`);

    // state
    this.props.history.replace(`/home`, { id, title });
};

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
                                    {/* Redireact相当于默认页面，当匹配失败重定向指定路由 */}
                                    <Redirect to="/about" />
                                    {/* 注意，如果组件里还有路由，即嵌套路由，比如Home里的子路由，那么需要把Home的路由/home也加到path里
								如/home/news */}

                                    {/* 实现单个路由的重定向，进入/跳转路由home */}
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
                                    {/* 组件通过 this.props.location.state 获取字典对象 */}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
