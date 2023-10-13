import PubSub from 'pubsub-js';
import { Component } from "react";

function ContextTest(props) {

    useEffect(() => {
        // 发布消息订阅，函数也可以
        PubSub.publish('message', { name: 'zx' });
    }, []);

    return (
        <div>
            <Context.Consumer>
                {(value) => { console.log(value); }}
            </Context.Consumer>
        </div>
    );
}

class Index extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {

        // 接收订阅。
        this.message = PubSub.subscribe('message', (name, data) => {
            console.log(`${name}:`, data);
        });
    }

    // 卸载组件前记得销毁 pubsub
    componentWillUnmount() {
        PubSub.unsubscribe(this.message);
    }

    render() {
        return (
            <div onClick={this.onListten}>
                消息订阅
            </div>
        );
    }
}
