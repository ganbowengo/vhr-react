import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setDict } from '@src/store/actions'

import { Input, Button, Select, Dropdown, TreeSelect, DatePicker, Radio } from 'antd'
import { getEmpInfo, getBasicData } from '@src/assets/api'
import BaseInfoModal from './modal'
import BaseInfoTable from './table'
import ShowMore from './showMore'


class BaseInfo extends React.Component {
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
        visible: false,
        modalData: {},
        tableDate: {}
    }
    ;
    componentWillMount() {
        getBasicData().then(res => {
            if(res.success){
                this.setState({
                    ...res.data
                })
                this.props.setDict(res.data)
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
    onPageChange = e => {
        this.setState({
            ...e
        },() => {
            this.search()
        })
    }
    search = _ => {
        let {page,size,keywords,politicId,nationId,posId,jobLevelId,engageForm,departmentId,beginDateScope} = this.state
        let params ={page,size,keywords,politicId,nationId,posId,jobLevelId,engageForm,departmentId,beginDateScope}
        getEmpInfo(params).then(res => {
            if(res.success){
                this.setState({
                    tableDate:{
                        data: res.data.emps,
                        total: res.data.count
                    }
                })
            }
        }).catch(err => {

        })
    }
    visibleToggle = (e = {type : 'add'}) => {
        this.setState(prevState => ({visible: !prevState.visible, modalData: e}))
    }
    showToggle = () => {
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
    onConditionChange = e => {
        this.setState({...e})
    }
    
    render() {
        let { keywords, showMore, tableDate, visible, modalData, departmentId, engageForm } = this.state
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
                        <Button type="primary" icon="plus" onClick={() => this.visibleToggle()/* add */}>添加员工</Button>
                    </div>
                </div>
                {showMore ? <ShowMore onConditionChange={this.onConditionChange} /> : ''}
                <div className='table-box'>
                    <BaseInfoTable onCrrentChange={this.onPageChange} onShowEdit={this.visibleToggle /* update */} tableDate={tableDate} />   
                </div>
                <BaseInfoModal visible={visible} modalData={modalData} onClose={this.visibleToggle /* close */}></BaseInfoModal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setDict
    }, dispatch)
)

export default connect(null,mapDispatchToProps)(BaseInfo)