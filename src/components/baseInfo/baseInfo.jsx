import React from 'react'
import { Input, Button, Select, Dropdown, TreeSelect, DatePicker, Radio } from 'antd'
import { getEmpInfo, getBasicData } from '@src/assets/api'
import BaseInfoModal from './modal'
import BaseInfoTable from './table'

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
        visible: false,
        modalData: {}
    }
    ;
    componentWillMount() {
        getBasicData().then(res => {
            if(res.success){
                this.setState({
                    ...res.data
                })
            }
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
    visibleToggle = (e) => {
        this.setState(prevState => ({visible: !prevState.visible}))
    }
    showEdit = (e) => {
        this.setState({visible: true, modalData: e})
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
        let { keywords, showMore, data, visible, modalData } = this.state
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
                    <BaseInfoTable showEdit={this.showEdit} data={data} />   
                </div>
                <div className='page-box'><Button onClick={this.visibleToggle}></Button></div>
                <BaseInfoModal visible={visible} modalData={modalData} onClose={this.visibleToggle}></BaseInfoModal>
            </div>
        )
    }
}
export default Test