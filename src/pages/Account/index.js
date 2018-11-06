import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Dropdown, Menu, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';

@connect( ({ accounts }) => ({
    accounts
}))

class Accounts extends Component {
  componentDidMount() {
    const { dispatch, accounts: {limit} } = this.props;
    dispatch({type:'accounts/getAccounts', payload: {offset:'0', limit}});
  }
  state = {
    selectedRows: [],
  };
  columns = [
    {
      title: 'Account',
      dataIndex: 'account',
    },
    {
      title: 'Password',
      dataIndex: 'password',
    },
    {
        title: 'Authority',
        dataIndex: 'authority',
      },
    {
      title: '操作',
      render: (record) => (
        <Fragment>
          <Button onClick={()=>this.editAccount(record.key)} className={styles.button}>编辑</Button>
          <Button onClick={()=>this.deleteAccount(record.key)} >删除</Button>
        </Fragment>
      ),
    },
  ];
  editAccount = key => {
    const { dispatch } = this.props;
    dispatch( routerRedux.push(`/account/edit?userId=${key}`) );
  }
  deleteAccount = key => {
    const { dispatch } = this.props;
    let deleOne = [];
    deleOne.push( key );
    dispatch({type: 'accounts/removeAccounts', payload: {key: deleOne},callback: () => {
      this.setState({
        selectedRows: [],
      });
    }, });
  }
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  addAccount() {
    const { dispatch } = this.props;
    dispatch( routerRedux.push('/account/edit') );
  }
  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'accounts/removeAccounts',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };
  onGetPageData = (pageNumber) => {
    const { dispatch, accounts: {limit} } = this.props;
    dispatch({type:'accounts/getAccounts', payload: {offset: pageNumber-1,limit}});
  }
  render() {
      const { list } = this.props.accounts;
      list.forEach( itm => {
          itm.key = itm.id;
      });
      const accountList = {
        list: list,
        pagination: {
          total: list.length*3,
        },
      };
      const { selectedRows } = this.state;
      const menu = (
        <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
          <Menu.Item key="remove">删除</Menu.Item>
        </Menu>
      );
    return (
        <div> 
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" style={{marginRight: '20px'}} onClick={() => this.addAccount()}>新建</Button>
            {selectedRows.length > 0 && (
              <span>
                <Dropdown overlay={menu}>
                  <Button>
                    批量操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            )}
          </div>
          <StandardTable
              selectedRows={selectedRows}
              data={accountList}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onGetPageData={this.onGetPageData}
              // onChange={this.handleStandardTableChange}
            />
        </div>
        )
    }
}

export default Accounts;
