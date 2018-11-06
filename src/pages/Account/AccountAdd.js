import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Card} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { routerRedux } from 'dva/router';
import { getPageQuery } from '@/utils/utils';
import styles from './AccountAdd.less';
const FormItem = Form.Item;

@connect(({ accounts })=>({
  accounts
}))
class AccountAdd extends Component {

  componentDidMount() {
    let { userId } = getPageQuery( window.location.href );
    const { dispatch, form } = this.props;
    if( userId ) {
      dispatch({type: 'accounts/getAccount', payload: userId, callback: (account, password) => {
        form.setFieldsValue({
          "account": account,
          "passwrd": password
        })
      }})
    }
  }
  
  handleSubmit = (e) => {
    let { userId } = getPageQuery( window.location.href );
    if( userId ) {
      e.preventDefault();
      const { dispatch, form } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'accounts/updateForm',
            payload: values,
          });
        }
      });
    }else {
      e.preventDefault();
      const { dispatch, form } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'accounts/submitForm',
            payload: values,
          });
        }
      });
    }
    
  }
  goBack() {
    const { dispatch } = this.props;
    dispatch( routerRedux.push(`/account/list`) );
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    let userId = getPageQuery( window.location.href );
    
    return (
      <PageHeaderWrapper 
        title={<FormattedMessage id={ userId.userId?'app.forms.edit.title':'app.forms.add.title' } />} 
      >
        <Card bordered={false}>
          <Form  onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem
              {...formItemLayout}   
              label="账号"
            >
              {getFieldDecorator('account', {
                rules: [{ required: true, message: 'please input your account' }],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入账户名"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout} 
              label="密码"
            >
              {getFieldDecorator('passwrd', {
                rules: [{ required: true, message: 'Please input your password!', whitespace: true }],
              })(
                <Input style={{ width: '100%' }} type="password" placeholder="请输入密码"/>
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              {
                userId.userId? (<Button type="primary" htmlType="submit">
                  <FormattedMessage id="form.update" />
                </Button>): 
                (<Button type="primary" htmlType="submit">
                  <FormattedMessage id="form.submit" />
                </Button>)
              }
              <Button type="primary" style={{ marginLeft: 32 }} onClick={() => this.goBack()}>
                  <FormattedMessage id="form.back" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

const WrappedAccountAdd = Form.create()(AccountAdd);

export default WrappedAccountAdd;
