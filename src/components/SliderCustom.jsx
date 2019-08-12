import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Icon, Layout } from 'antd'
import { getMenu } from '../assets/api/index'
import { setCurrentBreadcrumb } from '../store/actions'

const { SubMenu } = Menu;
const { Sider } = Layout;

class SiderMenu extends React.Component {
    // 一级菜单组件
    rootSubmenuKeys = {}
    currentBreadcrumb = '首页'
    state = {
        openKeys: [],
        menu:[]
    }
    componentWillMount() {
        getMenu().then(res => {
            if(res.success){
                res.data.forEach(({id,name}) => {
                    this.rootSubmenuKeys[id] = name
                })
                this.setState({ menu: res.data})
            }
        })
    }
    handleSelect = e => {
        this.props.selectMenu(e,[this.currentBreadcrumb,e.item.props.children])
        this.props.setCurrentBreadcrumb([this.currentBreadcrumb,e.item.props.children])
    }
    onOpenChange = (openKeys) => {
        this.currentBreadcrumb = this.rootSubmenuKeys[openKeys[openKeys.length-1]] || this.currentBreadcrumb
        this.setState({ openKeys : [openKeys[openKeys.length - 1]] })
    }
    render() {
        return (
            <Sider style={{ width: 256 }}>
                <Menu
                    onSelect={this.handleSelect}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    mode="inline"
                    theme='dark'>
                    {
                        this.state.menu.map(item=>(
                            <SubMenu
                                key={item.id}
                                title={
                                    <span>
                                        <Icon type="mail" />
                                        <span>{item.name}</span>
                                    </span>
                                }>
                                {
                                    item.children.map(item => (
                                        <Menu.Item key={item.path}>{item.name}</Menu.Item>
                                    ))
                                }
                            </SubMenu>
                        ))
                    }
                </Menu>
            </Sider>
        )
    }
}

const mapStateToProps = state => {
    return {
        bread: state.bread
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setCurrentBreadcrumb: setCurrentBreadcrumb
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu)