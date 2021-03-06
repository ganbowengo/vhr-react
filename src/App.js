/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-09 20:06:46
 * @LastEditTime: 2019-08-12 19:43:17
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Icon, Menu, Dropdown, Modal } from 'antd'
import DocumentTitle from 'react-document-title'
import SiderMneu from './components/SliderCustom'
import { logout } from './assets/api'
import Routes from './router'
import './assets/style/App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
	state = {
	    title : 'React-微人事',
	    currenBreadcrumb: ['首页']
	}  
	logout = () => {
	    logout().then(res => {
	        if(res.success){
	            this.props.history.push({pathname: '/login'})
	        }
	    })
	}
	componentDidMount() {
	    this.props.bread && this.setState({
	        currenBreadcrumb: this.props.bread
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
	selectMenu = (e,currenBreadcrumb) => {
	    this.props.history.push({pathname: '/app' + e.key})
	    this.setState({
	        currenBreadcrumb : currenBreadcrumb
	    })
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
	    let { title, currenBreadcrumb } = this.state
	    console.log('currenBreadcrumb',currenBreadcrumb)
	    return (<DocumentTitle title={title}>
	        <div style={{ height: '100%',width:'100%' }}>
	            <Header style={{ width: '100%',background: '#fff', display: 'flex', justifyContent:' space-between' }} >
	                <h3>微人事</h3>
	                <Dropdown overlay={this.menu}>
	                    <div style={{height:'45px'}}>
	                        <Icon type="github" style={{fontSize:'28px'}} />
	                        <span>{user.name}</span>
	                    </div>
	                </Dropdown>
	            </Header>
	            <div style={{ height:'calc(100% - 64px)',display: 'flex'}}>
	                <SiderMneu selectMenu={this.selectMenu}></SiderMneu>
	                <div style={{ height: '100%',width:'calc(100% - 200px)' }}>
	                    <div>
	                        <Breadcrumb style={{ margin: '16px' }}>
	                            {
	                                currenBreadcrumb.map((item,index) => (<Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>))
	                            }
	                        </Breadcrumb>
	                        <div style={{ padding: 24, background: '#fff', minHeight: 360, height: 'calc(100% - 53px)',borderTop:'1px solid #ccc' }}>
	                            <Routes />
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </DocumentTitle>);
	}
}

const mapStateToProps = state => {
    return {
        user: state.user,
        bread: state.bread
    }
}
export default connect(mapStateToProps)(App)