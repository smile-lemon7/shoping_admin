import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Input, InputNumber, Popconfirm, Form, Button, Dropdown, Menu, Icon } from 'antd';
import { FormattedMessage } from 'umi/locale';
import { routerRedux } from 'dva/router';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import {  EditableFormRow } from '@/components/EditableCell';
// import EditableCell from '@/components/EditableCell';
import styles from './index.less';

// const FormItem = Form.Item;
// const { Consumer } = React.createContext();


const FormItem = Form.Item;
const { Consumer, Provider} = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <Provider value={form}>
      <tr {...props} />
    </Provider>
  );
const EditableFormRow = Form.create()(EditableRow);
  
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </Consumer>
    );
  }
}


@connect( (lists) => ({
    lists
}))
class Products extends Component {
    state = {
        selectedRows: [],
        editingKey: ''
    };
    componentDidMount() {
        const { lists: {limit} } = this.props.lists;
        const { dispatch } = this.props;
        dispatch({type:'lists/getLists', payload: {requestMethod: 'getProducts',offset:'0', limit}});
    }
    
    columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            width: '10%',
            editable: true,
        },
        {
            title: '商品图片',
            dataIndex: 'img',
            width: '10%',
            editable: true,
            render: (img) => ( <img src={img} alt="img" style={{width: '34px'}} /> )
        },
        // {
        //     title: '商品介绍',
        //     dataIndex: 'content',
        //     width: '10%',
        //     editable: true,
        // },
        {
            title: '商品价格',
            dataIndex: 'price',
            width: '10%',
            editable: true,
        },
        {
            title: '商品类型',
            dataIndex: 'class',
            width: '20%',
            editable: true,
        },
        {
            title: '商品销量',
            dataIndex: 'sales',
            width: '10%',
            editable: true,
        },
        {
            title: '操作',
            render: (text, record) => {
            const editable = this.isEditing(record);
            return (
                <div>
                {editable ? (
                <span>
                    <Consumer>
                        {(form) => (
                            <Button
                                onClick={() => this.save(form, record.key)}
                                style={{ marginRight: 8 }}
                            >
                            保存</Button>)}
                    </Consumer>
                    <Popconfirm
                        title="Sure to cancel?"
                        onConfirm={() => this.cancel(record.key)}
                    >
                        <Button>取消</Button>
                    </Popconfirm>
                </span>
                ) : (
                    <div>
                        <Button onClick={() => this.edit(record.key)}>编辑</Button>
                        <Button >下架</Button>
                        <Button onClick={() => this.deleteList(record.key)}>删除</Button>
                    </div>
                )}
                </div>
            );
            },
        },          
    ];
    deleteList = key => {
        const { dispatch } = this.props;
        let deleOne = [];
        deleOne.push( key );
        dispatch({type: 'lists/removeLists', payload: {key: deleOne},callback: () => {
          this.setState({
            selectedRows: [],
          });
        }, });
      }
    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };
    edit(key) {
        this.setState({ editingKey: key });
    }
    save(form, key) {
        form.validateFields((error, row) => {
          if (error) {
            return;
          }
          console.log( row )
        });
      }
    cancel = () => {
        this.setState({ editingKey: '' });
    };
    addProduct = () => {
        const { dispatch } = this.props;
        dispatch( routerRedux.push('/products/edit') );
    }
    handleSelectRows = rows => {
        this.setState({
          selectedRows: rows,
        });
    };
    handleMenuClick = e => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
    
        if (!selectedRows) return;
        switch (e.key) {
          case 'remove':
            dispatch({
              type: 'lists/removeLists',
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
    render() {
        const { listData } = this.props.lists.lists;
        listData.forEach( itm => {
            itm.key = itm.id;
        });
         
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
    
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                record,
                // inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: this.isEditing(record),
                }),
            };
        });
        
        const { selectedRows } = this.state;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              this.handleSelectRows(selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', 
              name: record.name,
            }),
          };
        const menu = (<Menu onClick={this.handleMenuClick} selectedKeys={[]}>
            <Menu.Item key="remove">删除</Menu.Item>
        </Menu>);

        return (
            <PageHeaderWrapper>
                <div className={styles.tableListOperator}>
                    <Button icon="plus" type="primary" style={{marginRight: '20px',marginBottom: '20px'}} onClick={() => this.addProduct()}>新建</Button>
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
                <Table
                    selectedRows={selectedRows}
                    rowSelection={rowSelection}
                    components={components}
                    bordered
                    dataSource={listData}
                    columns={columns}
                    rowClassName="editable-row"
                    onSelectRow={this.handleSelectRows}
                    pagination={{defaultCurrent:1, total: 20}}
                />
            </PageHeaderWrapper>
        )
    }
}
    

export default Products;
