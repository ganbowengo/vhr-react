import React, { Component } from 'react';
import { Button,Message } from 'antd';
import DocumentTitle from 'react-document-title';
import './App.css';

class App extends Component {
	state = {
		title : 'React-微人事'
	}
	showInfo = ()=>{
		Message.info('hello world')
	}
	render() {
		let { title } = this.state
		return (<DocumentTitle title={title}>
			<div className="App">
				<Button type="primary" onClick={this.showInfo}>
					Display normal message
				</Button>
			</div>
		</DocumentTitle>);
	}
}
export default App;