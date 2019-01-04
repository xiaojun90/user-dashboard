import React,{Component} from 'react'
import { Table, Pagination, Popconfirm,Icon,Button,Divider } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {CURRENT_PAGE,PAGE_SIZE} from '../constants'

class Users extends Component {
  
    render() {     
      const {list,total,page,onChangeHandler} = this.props;
      let totalNums = Number.parseInt(total);
      let current = Number.parseInt(page);
      console.info("current:" + current);
        return (
            <div>
                <Table dataSource={list} columns={columns} rowKey={(record )=>record.id} pagination={false} loading={this.props.loading}/>
                <Pagination current={current} defaultCurrent={CURRENT_PAGE} total={totalNums} 
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                defaultPageSize={PAGE_SIZE} className="ant-table-pagination" onChange={onChangeHandler}/>                
            </div>
        )
    }
}
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, { id }) => (
        <span>
          <a href="javascript:;">Edit</a>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, id)}>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
function deleteHandler(id) {
    console.warn(`TODO: ${id}`);
}
const  mapStateToProps = (state) => {
    const { list, total, page } = state.users;
    return {
      list,
      total,
      page,
      loading: state.loading.models.users //这个loading属性由dva-loading绑定,users为namespace的名字
    };
}

const mapDispatchToProps = (dispatch)=> {
  return {
    onChangeHandler(page, pageSize) {
      console.info(page + "===" + pageSize);
      dispatch(routerRedux.push({
        pathname: '/users',
        query: { page },
      }));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);