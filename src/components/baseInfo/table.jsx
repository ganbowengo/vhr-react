import React from 'react'
import { splitDate } from '@src/assets/js/tool'
import { Table, Button } from 'antd'



class BaseInfoTable extends React.Component {
    columns = [
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
                <Button size='small' onClick={() => { this.onclick(record) }}>编辑</Button>
                <Button size='small' type="primary">查看</Button>
                <Button size='small' type="danger">删除</Button>
            </div>)
        }
    ]

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        fixed: true
    }

    onclick = (row) => {
        this.props.showEdit(row)
    }
    render () {
        let {data} = this.props
        return (
            <Table 
                bordered 
                size="small" 
                rowKey='workID' 
                rowSelection={this.rowSelection} 
                columns={this.columns}
                dataSource={data} 
                scroll={{ x: 3800, y: 500 }} />
        )
    }
}

export default BaseInfoTable