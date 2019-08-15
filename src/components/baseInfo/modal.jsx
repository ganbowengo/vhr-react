import React from 'react';
import { Modal, Button, Input, Select, Form } from 'antd';

class BaseInfoFromContent extends React.Component {
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
        return (
            <Form {...this.formItemLayout} layout='inline'>
                {
                    this.formData.map(item => (
                        <Form.Item style={{width: 280}} label={item.label}>
                            {getFieldDecorator(item.value, item.options)(item.component())}
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
                title="Basic Modal"
                width={720}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <BaseInfoFrom></BaseInfoFrom>
            </Modal>
        )
    }
}

export default BaseInfoModal