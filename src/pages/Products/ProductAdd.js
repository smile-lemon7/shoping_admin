import React, { Component } from 'react';
import { connect } from 'dva';

@connect()
class ProductAdd extends Component {
  render() {
    return <div>添加商品</div>;
  }
}

export default ProductAdd;
