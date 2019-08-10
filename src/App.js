/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-09 20:06:46
 * @LastEditTime: 2019-08-10 19:04:03
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Icon, Menu, Dropdown, Modal } from 'antd'
import DocumentTitle from 'react-document-title'
import SiderMneu from './components/SliderCustom'
import { logout } from './assets/api'
import Routes from './router'
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
	state = {
	    title : 'React-微人事'
	}
	logout = () => {
	    logout().then(res=>{
	        if(res.status === 200){
	            this.props.history.push({pathname: '/login'})
	        }
	    })
	}
	dropClick = (e) =>{
	    let reflect = {
	        user : () => {
	            this.props.history.push({pathname: '/user'})
	        },
	        set : () => {
	            this.props.history.push({pathname: '/login'})
	        },
	        logout : this.showConfirm
	    }
	    reflect[e.key].bind(this)()
	}
	showConfirm() {
	    Modal.confirm({
	        title: '提示',
	        content: '注销登录, 是否继续?',
	        okText:"确认",
          	cancelText:"取消",
	        onOk: this.logout
	    })
	}
	selectMenu = e => {
	    this.props.history.push({pathname: '/app' + e.key})
	}
	menu = (
		<Menu onClick={this.dropClick}>
		    <Menu.Item key='user'>个人中心</Menu.Item>
		    <Menu.Item key='set'>设置</Menu.Item>
		    <Menu.Item key='logout'>注销</Menu.Item>
		</Menu>
	)
	render() {
	    const { user } = this.props
	    console.log('user',user)
	    let { title } = this.state
	    return (<DocumentTitle title={title}>
	        <Layout style={{ minHeight: '100%' }}>
	            <Header style={{ background: '#fff', display: 'flex', justifyContent:' space-between' }} >
	                <h3>微人事</h3>
	                <Dropdown overlay={this.menu}>
	                    <div style={{height:'45px'}}>
	                        <Icon type="github" style={{fontSize:'28px'}} />
	                        <span>{user.name}</span>
	                    </div>
	                </Dropdown>
	            </Header>
	            <Layout>
	                <SiderMneu selectMenu={this.selectMenu}></SiderMneu>
	                <Layout>
	                    <Content style={{ margin: '0 16px' }}>
	                        <Breadcrumb style={{ margin: '16px 0' }}>
	                            <Breadcrumb.Item>User</Breadcrumb.Item>
	                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
	                        </Breadcrumb>
	                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
	                            <Routes />
	                        </div>
	                    </Content>
	                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
	                </Layout>
	            </Layout>
	        </Layout>
	    </DocumentTitle>);
	}
}


const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(App)