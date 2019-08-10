import React from 'react'
import { Menu, Icon, Layout } from 'antd'
import { getMenu } from '../assets/api/index'

const { SubMenu } = Menu;
const { Sider } = Layout;

class SiderMenu extends React.Component {
    // 一级菜单组件
    rootSubmenuKeys = null
    state = {
        openKeys: [],
        menu:[]
    }
    componentWillMount() {
        getMenu().then(res => {
            if(res){
                this.rootSubmenuKeys = res.data.map(({id}) => id.toString())
                this.setState({ menu: res.data})
            }
        })
    }
    handleClick = e => {
        this.props.selectMenu(e)
    }
    onOpenChange = openKeys => {
        this.setState({ openKeys : [openKeys[openKeys.length - 1]] })
    }
    render() {
        return (
            <Sider style={{ width: 256 }}>
                <Menu
                    onSelect={this.handleClick}
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
export default SiderMenu