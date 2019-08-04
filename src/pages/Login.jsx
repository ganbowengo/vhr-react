import React from 'react'
import { Input, Button, Icon } from 'antd';
import { login, getToken } from '../assets/api/index'
import md5 from 'md5'

export default class Login extends React.Component{
    state = {
        userName: '11123456789',
        password: '12345678W@'
    }
    userNameChange = key => {
        this.setState({
            userName : key.target.value
        })
    }
    passwordChange = key => {
        this.setState({
            password : key.target.value
        })
    }
    login = () => {
        let parms = {
            userName: this.state.userName,
            password:  md5(this.state.password)
        }
        login(parms).then(res => {
            if (res.success) {
                let data = res.data && res.data[0] || {}
                this.saveUserInfo(data)
                return getToken(parms)
            }
        }).then(res => {
            let token = res.headers.author
            if(token){
                sessionStorage.setItem('token', token)
                this.props.history.push({pathname: '/app'})
            }
        }).catch(error => {
            throw error
        })
    }   
    saveUserInfo(data = {}){
        Object.keys(data).forEach(key => {
            sessionStorage.setItem(key, data[key])
        })
    }
    render(){
        let { userName, password } = this.state
        const formItemLayout = {
            labelCol: {
              xs: { span: 0 },
              sm: { span: 0 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 24 },
            },
        };
        return (
            <div className='login'>
                <h3 className='login-title'>React-微人事</h3>
                <div className='login-item'>
                    <Input value={userName} onChange={this.userNameChange} prefix={<Icon type="user" style={{ fontSize: 13 }} />}  placeholder="用户名：" />
                </div>
                <div className='login-item'>
                    <Input value={password}  onChange={this.passwordChange} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='password' placeholder="密码：" />
                </div>
                <div className='login-item'>
                    <Button type="primary" onClick={this.login} block>登 录</Button>
                </div>
            </div>
        )
    }
}
