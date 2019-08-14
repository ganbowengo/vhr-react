import React from 'react'
import { Input, Button, Table, Select, Dropdown, TreeSelect, DatePicker, Radio } from 'antd'
import { getEmpInfo, getBasicData } from '../assets/api'
import { splitDate } from '../assets/js/tool'
const { Option } = Select
const { TreeNode } = TreeSelect
const { RangePicker } = DatePicker

class Test extends React.Component {
    state = {
        page: 1,
        size: 10,
        keywords: '',
        politicId: '',
        nationId: '',
        posId: '',
        jobLevelId:'',
        engageForm: '',
        departmentId: '',
        beginDateScope: '',
        showMore: false,
        deps: [],
        joblevels: [],
        nations: [],
        politics: [],
        positions: [],
        workID: [],
        columns:[
            {
                title: '姓名',
                dataIndex: 'name',
                width: 150,
                fixed: 'left'
            },
            {
                title: '工号',
                dataIndex: 'workID',
                width: 150
            },
            {
                title: '性别',
                dataIndex: 'gender',
                width: 150
            },
            {
                title: '出生日期',
                dataIndex: 'birthday',
                width: 150,
                render: birthday => splitDate(birthday),
                
            },
            {
                title: '身份证号码',
                dataIndex: 'idCard',
                width: 200
            },
            {
                title: '婚姻状况',
                dataIndex: 'wedlock',
                width: 150
            },
            {
                title: '民族',
                dataIndex: 'nation.name',
                width: 150
            },
            {
                title: '籍贯',
                dataIndex: 'nativePlace',
                width: 150
            },
            {
                title: '政治面貌',
                dataIndex: 'politicsStatus.name',
                width: 150
            },
            {
                title: '电子邮件',
                dataIndex: 'email',
                width: 200
            },
            {
                title: '电话号码',
                dataIndex: 'phone',
                width: 150
            },
            {
                title: '联系地址',
                dataIndex: 'address',
                width: 250
            },
            {
                title: '所属部门',
                dataIndex: 'department.name',
                width: 150
            },
            {
                title: '职位',
                dataIndex: 'position.name',
                width: 150
            },
            {
                title: '职称',
                dataIndex: 'jobLevel.name',
                width: 150
            },
            {
                title: '聘用形式',
                dataIndex: 'engageForm',
                width: 150
            },
            {
                title: '入职日期',
                dataIndex: 'beginDate',
                render: beginDate => splitDate(beginDate),
                width: 150
            },
            {
                title: '转正日期',
                dataIndex: 'conversionTime',
                render: conversionTime => splitDate(conversionTime),
                width: 150
            },
            {
                title: '合同起始日期',
                dataIndex: 'beginContract',
                render: beginContract => splitDate(beginContract),
                width: 150
            },
            {
                title: '合同截至日期',
                dataIndex: 'endContract',
                render: endContract => splitDate(endContract),
                width: 150
            },
            {
                title: '合同期限',
                dataIndex: 'contractTerm',
                render: contractTerm => contractTerm,
                width: 150
            },
            {
                title: '最高学历',
                dataIndex: 'tiptopDegree'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                fixed: 'right',
                width: 150,
                render: (text, record) => (<div>
                    <Button size='small'>编辑</Button>
                    <Button size='small' type="primary">查看</Button>
                    <Button size='small' type="danger">删除</Button>
                </div>)
            }
        ],
        data: []
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
        fixed: true,

    };
    componentWillMount() {
        getBasicData().then(res => {
            console.log('res',res.data)
            if(res.success){
                this.setState({
                    ...res.data
                })
            }
        })
    }
    search = _ => {
        let {page,size,keywords,politicId,nationId,posId,jobLevelId,engageForm,departmentId,beginDateScope} = this.state
        let params ={page,size,keywords,politicId,nationId,posId,jobLevelId,engageForm,departmentId,beginDateScope}
        getEmpInfo(params).then(res => {
            if(res.success){
                this.setState({
                    data: res.data.emps
                })
            }
        }).catch(err => {

        })
    }
    handleEnter = e => {
        this.setState({
            keywords: e.target.value
        })
        this.search()
    }
    handleChange = e => {
        this.setState({
            keywords: e.target.value
        })
    }
    joblevels = e => {
        this.setState({
            jobLevelId: e
        })
    }
    nations = e => {
        this.setState({
            nationId: e
        })
    } 
    politics = e => {
        this.setState({
            politicId: e
        })
    } 
    positions = e => {
        this.setState({
            posId: e
        })
    }
    treeSelect = e => {
        this.setState({
            departmentId: e
        })
    }
    onDateChange = (e,dateString) => {
        this.setState({
            beginDateScope: dateString.join(',')
        })
    }
    onEngageFormChange = e => {
        this.setState({
            engageForm: e.target.value
        })
    }
    showToggle = () => {
        let s = this.state.showMore
        this.setState(prevState => ({showMore: !prevState.showMore}))
        if(this.state.showMore){
            this.setState({
                politicId: '',
                nationId: '',
                posId: '',
                jobLevelId:'',
                engageForm: '',
                departmentId: '',
                beginDateScope: ''
            })
        }
    }
    loop = data =>(
        data.map(item => {
            if (item.children && item.children.length) {
                return (
                    <TreeNode key={item.id} value={item.id} title={item.name}>
                        {this.loop(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode key={item.id} value={item.id} title={item.name} />
        })
    )
    showMore = () => {
        const { deps, joblevels, nations, politics, positions, departmentId, engageForm } = this.state
        let selectArr = { joblevels, nations, politics, positions }
        return (
            <div className='search' style={{ justifyContent: 'left' }}>
                {
                    Object.keys(selectArr).map(selectItem => (
                        <div key={selectItem} style={{margin: '10px'}}>
                            <span style={{display: 'inline-block',width: 80}}>{selectItem}</span>
                            <Select style={{ width: 200 }} onChange={this[selectItem]}>
                                {
                                    selectArr[selectItem].map(item => (
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                    ))
                }
                <div style={{margin: '10px'}}>
                    <span style={{display: 'inline-block',width: 80}}>department</span>
                    <TreeSelect
                        blockNode
                        showLine
                        defaultExpandAll
                        style={{ width: 200 }}
                        onSelect={this.treeSelect}>
                        {this.loop(deps)}
                    </TreeSelect>
                </div>
                <div style={{margin: '10px'}}>
                    <span style={{display: 'inline-block',width: 80}}>engage</span>
                    <Radio.Group onChange={this.onEngageFormChange} value={engageForm}>
                        <Radio value='劳动合同'>劳动合同</Radio>
                        <Radio value='劳务合同'>劳务合同</Radio>
                    </Radio.Group>
                </div>
                <div style={{margin: '10px'}}>
                    <span style={{display: 'inline-block',width: 80}}>dateScope</span>
                    <RangePicker 
                        style={{ width: 280 }}
                        onChange={this.onDateChange} />
                </div>
            </div>
        )
    }
    render() {
        let { keywords, showMore, data, columns } = this.state
        return (
            <div>
                <div className='search'>
                    <div>
                        <Input value={keywords} onChange={this.handleChange} style={{width: '300px', marginRight:'10px'}} placeholder='通过员工名搜索员工,记得回车哦...' onPressEnter={this.handleEnter}></Input>
                        <Button type="primary" icon="search" onClick={this.search}>查询</Button>
                        <Button type="primary" icon="control" onClick={this.showToggle}>高级搜索</Button>
                    </div>
                    <div>
                        <Button type="success" icon="upload" onClick={this.showToggle}>导入数据</Button>
                        <Button type="success" icon="download" onClick={this.showToggle}>导出数据</Button>
                        <Button type="primary" icon="plus" onClick={this.showToggle}>添加员工</Button>
                    </div>
                </div>
                {showMore ? this.showMore() : ''}
                <div className='table-box'>
                    <Table bordered size="small" rowKey='workID' rowSelection={this.rowSelection} columns={columns} dataSource={data} scroll={{ x: 3800, y: 500 }} />
                </div>
                <div className='page-box'>123123</div>
            </div>
        )
    }
}
export default Test