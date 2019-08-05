import React from 'react'
import { Input, Button, Icon } from 'antd';
import { login, getToken } from '../assets/api/index'

export default class Login extends React.Component{
    state = {
        userName: 'admin',
        password: '123'
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
            username: this.state.userName,
            password:  this.state.password
        }
        login(parms).then(resp=> {
            if (resp && resp.status == 200) {
              var data = resp.data;
              console.log('data.obj', data.obj)
              this.props.history.push({pathname: '/app'})
            }
          });
    }   
    saveUserInfo(data = {}){
        Object.keys(data).forEach(key => {
            sessionStorage.setItem(key, data[key])
        })
    }
    render(){
        let { userName, password } = this.state
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
