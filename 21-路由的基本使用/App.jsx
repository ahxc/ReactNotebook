import React, { Component } from "react";
import { NavLink, Link, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import MyNavLink from "./components/MyNavLink";

// 路由的基本使用
// 1。明确页面的导航区和展示区
// 2。导航区的a标签改为Link标签<Link to="/about">About</Link>
// 3。展示区的路劲与a标签的路径匹配，<Route path="/about" component={About}/>
// 4。App组件标签外包裹一个<BrowserRouter>或<HashRouter>

// 路由组件和一般组件本质的区别，路由组件会接收三大props：location、history、match
// 然后就是写法不同，<App/><Route path="/about" component={About}/>
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
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
