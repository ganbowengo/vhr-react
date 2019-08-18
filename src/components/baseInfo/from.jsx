import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Select, DatePicker, Form, Radio } from 'antd'
import { degree } from '@src/assets/js/dictionary'
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
            label : '民族',
            value : 'nation.name',
            options: {
                selectName: 'nation'
            },
            component: () => (<Select style={{ width: 200 }}>
                {
                    this.props.dict.nations.map(item => {
                        return (
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        )
                    })
                }
            </Select>)
        },
        {
            label : '籍贯',
            value : 'nativePlace',
            options: {},
            component: () => (<Input style={{ width: 200 }} />)
        },
        {
            label : '电子邮箱',
            value : 'email',
            options: {},
            component: () => (<Input style={{ width: 200 }} />)
        },
        {
            label : '联系地址',
            value : 'address',
            options: {},
            component: () => (<Input style={{ width: 200 }} />)
        },
        {
            label : '职位',
            value : 'position.name',
            options: {
                selectName: 'position'
            },
            component: () => (<Select style={{ width: 200 }}>
                {
                    this.props.dict.positions.map(item => {
                        return (
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        )
                    })
                }
            </Select>)
        },
        {
            label : '职称',
            value : 'jobLevel.name',
            options: {
                selectName: 'jobLevel'
            },
            component: () => (<Select style={{ width: 200 }}>
                {
                    this.props.dict.joblevels.map(item => {
                        return (
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        )
                    })
                }
            </Select>)
        },
        // {
        //     label : '所属部门',
        //     value : 'email',
        //     options: {},
        //     component: () => (<Input style={{ width: 200 }} />)
        // },
        {
            label : '电话号码',
            value : 'phone',
            options: {},
            component: () => (<Input style={{ width: 200 }} />)
        },
        {
            label : '工号',
            value : 'workID',
            options: {},
            component: () => (<Input style={{ width: 200 }} disabled />)
        },
        {
            label : '学历',
            value : 'tiptopDegree',
            options: {
                nameToCode : degree
            },
            component: () => (<Select style={{ width: 200 }}>
                {
                    degree.map(item => {
                        return (
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        )
                    })
                }
            </Select>)
        },
        {
            label : '毕业院校',
            value : 'school',
            options: {},
            component: () => (<Input style={{ width: 200 }} />)
        },
        {
            label : '专业名称',
            value : 'specialty',
            options: {},
            component: () => (<Input style={{ width: 200 }} />)
        },
        {
            label : '入职日期',
            value : 'beginDate',
            options: {
                isDate: true
            },
            component: () => (<DatePicker style={{ width: 200 }} format="YYYY-MM-DD" />)
        },
        {
            label : '转正日期',
            value : 'conversionTime',
            options: {
                isDate: true
            },
            component: () => (<DatePicker style={{ width: 200 }} format="YYYY-MM-DD" />)
        },
        {
            label : '合同起始日期',
            value : 'beginContract',
            options: {
                isDate: true
            },
            component: () => (<DatePicker style={{ width: 200 }} format="YYYY-MM-DD" />)
        },
        {
            label : '合同终止日期',
            value : 'endContract',
            options: {
                isDate: true
            },
            component: () => (<DatePicker style={{ width: 200 }} format="YYYY-MM-DD" />)
        },
        {
            label : '身份证号码',
            value : 'idCard',
            options: {},
            component: () => (<Input style={{ width: 200 }} />)
        },
        {
            label : '聘用形式',
            value : 'engageForm',
            options: {},
            component: () => (<Radio.Group>
                <Radio value='劳动合同'>劳动合同</Radio>
                <Radio value='劳务合同'>劳务合同</Radio>
            </Radio.Group>)
        },
        {
            label : '婚姻状况',
            value : 'wedlock',
            options: {},
            component: () => (<Radio.Group>
                <Radio value="已婚">已婚</Radio>
                <Radio value="未婚">未婚</Radio>
                <Radio value="离异">离异</Radio>
            </Radio.Group>)
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
            <Form {...this.formItemLayout} layout='inline' >
                {
                    this.formData.map(item => (
                        <Form.Item key={item.value} style={{width: 280}} label={item.label}>
                            {getFieldDecorator(item.value, {...item.options,...{
                                initialValue : (() => {
                                    if(baseInfoData.type === 'add'){
                                        return 
                                    }
                                    if(item.options.isDate) { // date的默认值
                                        return moment(baseInfoData[item.value],'YYYY-MM-DD')
                                    }
                                    if(item.options.nameToCode) {
                                        let value = degree.filter((it,key) => baseInfoData[item.value] === it.name)
                                        return value.length > 0 ? value[0].id : ''
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