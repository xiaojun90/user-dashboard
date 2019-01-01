import React,{Component} from 'react'
import {Menu,Icon} from 'antd'
import Link from 'umi/link';
import styles from './index.css';
import withRouter from 'umi/withRouter'; //使用withRouter,可以使props中包含history,location等信息
class Header extends Component {
    render () {
        console.info(this.props);
        return (
            <div className={styles.header}>
                <Menu mode="horizontal" selectedKeys={[this.props.location.pathname]}>
                <Menu.Item key="/">
                    <Link to="/"><Icon type="home" />Home</Link>
                </Menu.Item>
                <Menu.Item key="/users">
                    <Link to="/users"><Icon type="bars" />Users</Link>
                </Menu.Item>
                </Menu>

            </div>
        )
    }
}

export default withRouter(Header)