import React from 'react';
import { Modal, Button, Input, Select, Form } from 'antd';


class BaseInfoFromContent extends React.Component {
    componentWillMount() {
        this.setState({
            ...this.props.baseInfoData
        })
    }
    formData = [
        {
            label : '姓名',
            value : 'name',
            options: {},
            component: () => (<Input />)
        },
        {
            label : '身份证号码',
            value : 'idCard',
            options: {},
            component: () => (<Input />)
        },
        {
            label : '政治面貌',
            value : 'politicsStatus.name',
            options: {},
            component: () => (<Select style={{ width: 200 }} onChange={this[selectItem]}>
                {
                    selectArr[selectItem].map(item => (
                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    ))
                }
            </Select>)
        }
    ]
    
    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        console.log('this.state',this.state)
        return (
            <Form {...this.formItemLayout} layout='inline'>
                {
                    this.formData.map(item => (
                        <Form.Item key={item.value} style={{width: 280}} label={item.label}>
                            {getFieldDecorator(item.value, {...item.options,...{initialValue : this.state[item.value]}})(item.component())}
                        </Form.Item>
                    ))
                }
            </Form>
        )
    }
}

const BaseInfoFrom = Form.create({ name: 'baseInfoFromContent' })(BaseInfoFromContent);


class BaseInfoModal extends React.Component {
    handleOk = () => {

    }
    handleCancel = () => {
        this.props.onClose()
    }
    render() {
        let { modalData }= this.props
        return (
            <Modal
                title={modalData.modalTitle}
                width={720}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <BaseInfoFrom baseInfoData={modalData}></BaseInfoFrom>
            </Modal>
        )
    }
}

export default BaseInfoModal