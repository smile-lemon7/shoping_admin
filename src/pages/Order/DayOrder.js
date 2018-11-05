import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

@connect( ({ login }) => {
  login
})
class DealerAccounts extends Component {
  render() {
    console.log( this.props.login )
    return <div>日订单</div>;
  }
}

export default DealerAccounts;
