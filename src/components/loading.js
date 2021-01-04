import React, { Component } from 'react'
import {
  Icon
} from 'antd-mobile'
export default class Loading extends Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Icon type="loading" size="lg"></Icon>
    </div>
  }
}