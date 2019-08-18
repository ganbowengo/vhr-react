import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal } from 'antd';
import BaseInfoFrom from './from'

class BaseInfoModal extends React.Component {
    handleOk = e => {
        this.form.props.form.validateFields((err,values) => {
            console.log('err,values',err,values)
        })
    }
    handleCancel = () => {
        this.props.onClose()
    }
    render() {
        let { modalData } = this.props
        return (
            <Modal
                title={modalData.type === 'add' ? '新增基础信息' : '修改基础信息'}
                width={720}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <BaseInfoFrom wrappedComponentRef={(form) => this.form = form} baseInfoData={modalData}></BaseInfoFrom>
            </Modal>
        )
    }
}

export default BaseInfoModal