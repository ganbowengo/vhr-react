import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Select, DatePicker, Form, Radio } from 'antd'
import moment from 'moment'

class BaseInfoFromContent extends React.Component {
    formData = [
        {
            label : '姓名',
            value : 'name',
            options: {},
            component: () => (<Input style={{ width: 200 }} />)
        },
        {
            label : '性别',
            value : 'gender',
            options: {},
            component: () => (<Radio.Group>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
            </Radio.Group>)
        },
        {
            label : '出生日期',
            value : 'birthday',
            options: {
                isDate: true
            },
            component: () => (<DatePicker style={{ width: 200 }} format="YYYY-MM-DD" />)
        },
        {
            label : '政治面貌',
            value : 'politicsStatus.name',
            options: {
                selectName: 'politicsStatus'
            },
            component: () => (<Select style={{ width: 200 }}>
                {
                    this.props.dict.politics.map(item => {
                        return (
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        )
                    })
                }
            </Select>)
        },
        {
            label : '身份证号码',
            value : 'idCard',
            options: {},
            component: () => (<Input style={{ width: 200 }} />)
        },
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
    /* eslint-disable */
    render() {
        const { getFieldDecorator } = this.props.form
        const { baseInfoData } = this.props
        return (
            <Form {...this.formItemLayout} layout='inline'>
                {
                    this.formData.map(item => (
                        <Form.Item key={item.value} style={{width: 280}} label={item.label}>
                            {getFieldDecorator(item.value, {...item.options,...{
                                initialValue : (() => {
                                    if(baseInfoData.type === 'add'){
                                        return 
                                    }
                                    if(item.options.isDate){ // date的默认值
                                        return moment(baseInfoData[item.value],'YYYY-MM-DD')
                                    }
                                    if(item.value.indexOf('.') > 0) { // select的默认值
                                        return baseInfoData[item.options.selectName].id
                                    } else { // input的默认值
                                        return baseInfoData[item.value]
                                    }
                                    })()
                                }
                            })(item.component())}
                        </Form.Item>
                    ))
                }
            </Form>
        )
    }
}

const BaseInfoFrom = Form.create({ name: 'baseInfoFromContent' })(BaseInfoFromContent);

const mapStateToProps = state => {
    return {
        dict: state.dict
    }
}

export default connect(mapStateToProps)(BaseInfoFrom)