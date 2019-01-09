import React,{Component} from 'react'
import { Table, Pagination, Popconfirm,Icon,Button,Divider } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {CURRENT_PAGE,PAGE_SIZE} from '../constants';
import UserModel from './UserModel';
import styles from './Users.css';

class Users extends Component {
  
    render() {     
      const {list,total,page,onChangeHandler,deleteHandler,editHandler,createHandler} = this.props;
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
          render: (text, record, index) => (
            <span className={styles.operation}>
              <UserModel record={record} onOk={editHandler.bind(null,record.id)} title="User Edit Modal">
                <a>Edit</a>
              </UserModel>
              <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
              <Divider type="vertical" />
              <a href="javascript:;">Delete</a>
              </Popconfirm>
            </span>
          ),
        },
      ];
      let totalNums = Number.parseInt(total);
      let current = Number.parseInt(page);
      console.info("current:" + current);
        return (
            <div>
                <UserModel record = {{}} onOk={createHandler.bind(null)} title="User Create Modal">
                  <div className={styles.create}>
                    <Button type="primary">Create User</Button>
                  </div>
                </UserModel>
                <Table dataSource={list} columns={columns} rowKey={(record )=>record.id} pagination={false} loading={this.props.loading}/>
                <Pagination current={current} defaultCurrent={CURRENT_PAGE} total={totalNums} 
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                defaultPageSize={PAGE_SIZE} className="ant-table-pagination" onChange={onChangeHandler}/>                
            </div>
        )
    }
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
      dispatch(routerRedux.push({
        pathname: '/users',
        query: { page },
      }));
    },
    deleteHandler(id) {
      console.warn(`TODO: ${id}`);
      dispatch({
        type: 'users/remove',
        payload: id,
      });
    },
    editHandler(id,values) {
      dispatch({
        type:'users/patch',
        payload:{
          id,
          values
        }
      })
    },
    createHandler(values) {
      console.info("createHandler" + JSON.stringify(values));
      dispatch({
        type:'users/create',
        payload:{
          values
        }
      });
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);