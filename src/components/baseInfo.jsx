import React from 'react'
import { Input, Button, Table } from 'antd'
import { getEmpInfo } from '../assets/api'
import { splitDate } from '../assets/js/tool'

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
        columns:[
            {
                title: '姓名',
                dataIndex: 'name'
            },
            {
                title: '工号',
                dataIndex: 'workID'

            },
            {
                title: '性别',
                dataIndex: 'gender',
            },
            {
                title: '出生日期',
                dataIndex: 'birthday',
                render: birthday => splitDate(birthday),
                
            },
            {
                title: '身份证号码',
                dataIndex: 'idCard',
                
            },
            {
                title: '婚姻状况',
                dataIndex: 'wedlock',
                
            },
            {
                title: '民族',
                dataIndex: 'nation.name',
                
            },
            {
                title: '籍贯',
                dataIndex: 'nativePlace',
                
            },
            {
                title: '政治面貌',
                dataIndex: 'politicsStatus.name',
                
            },
            {
                title: '电子邮件',
                dataIndex: 'email',
                
            },
            {
                title: '电话号码',
                dataIndex: 'phone',
                
            },
            {
                title: '联系地址',
                dataIndex: 'address',
                
            },
            {
                title: '所属部门',
                dataIndex: 'department.name',
                
            },
            {
                title: '职位',
                dataIndex: 'position.name',
                
            },
            {
                title: '职称',
                dataIndex: 'jobLevel.name',
                
            },
            {
                title: '聘用形式',
                dataIndex: 'engageForm',
                
            },
            {
                title: '入职日期',
                dataIndex: 'beginDate',
                render: beginDate => splitDate(beginDate),
                
            },
            {
                title: '转正日期',
                dataIndex: 'conversionTime',
                render: conversionTime => splitDate(conversionTime),
                
            },
            {
                title: '合同起始日期',
                dataIndex: 'beginContract',
                render: beginContract => splitDate(beginContract),
                
            },
            {
                title: '合同截至日期',
                dataIndex: 'endContract',
                render: endContract => splitDate(endContract),
                
            },
            {
                title: '合同期限',
                dataIndex: 'contractTerm',
                render: contractTerm => contractTerm,
                
            },
            {
                title: '最高学历',
                dataIndex: 'tiptopDegree',
                
            },
            {
                title: '操作',
                dataIndex: 'operation',
                fixed: 'right',
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
        fixed: true
    };
    search = _ => {
        let params = {
            page: 1,
            size: 10,
            keywords: this.state.keywords,
            politicId: '',
            nationId: '',
            posId: '',
            jobLevelId:'',
            engageForm: '',
            departmentId: '',
            beginDateScope: '',
        }
        getEmpInfo(params).then(res => {
            console.log('res',res)
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
    showToggle = () => {
        this.setState(prevState => ({
            showMore: !prevState.showMore
        }))
    }
    showMore = () => {
        return (
            <div className='serach'>
                <Button type="primary" onClick={this.search}>高级搜索</Button>
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
                    <Table bordered size='small' scroll={{ x: 1600 }} rowKey='workID' rowSelection={this.rowSelection} columns={columns} dataSource={data} />
                </div>
                <div className='page-box'>123123</div>
            </div>
        )
    }
}
export default Test