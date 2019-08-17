import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Select, TreeSelect, DatePicker, Form, Radio } from 'antd'

const { TreeNode } = TreeSelect
const { Option } = Select
const { RangePicker } = DatePicker

class ShowMore extends React.Component {
    joblevels = e => {
        this.props.onConditionChange({
            jobLevelId: e
        })
    }
    nations = e => {
        this.props.onConditionChange({
            nationId: e
        })
    } 
    politics = e => {
        this.props.onConditionChange({
            politicId: e
        })
    } 
    positions = e => {
        this.props.onConditionChange({
            posId: e
        })
    }
    treeSelect = e => {
        this.props.onConditionChange({
            departmentId: e
        })
    }
    onDateChange = (e,dateString) => {
        this.props.onConditionChange({
            beginDateScope: dateString.join(',')
        })
    }
    onEngageFormChange = e => {
        this.props.onConditionChange({
            engageForm: e.target.value
        })
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
    
    render() {
        const { deps, joblevels, nations, politics, positions } = this.props.dict
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
                    <Radio.Group onChange={this.onEngageFormChange}>
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
}

const mapStateToProps = state => {
    return {
        dict: state.dict
    }
}

export default connect(mapStateToProps)(ShowMore)