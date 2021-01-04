import { List, WingBlank } from 'antd-mobile'
import React, { Component } from 'react'
const Item = List.Item
export default class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  RouterTo (path) {
    this.props.history.push(path)
  }

  render () {
    return <div>
      <WingBlank>
        <h2>好签H5SDK移动端签字示例</h2>
      </WingBlank>
      {/*  */}
      <List>
        <Item onClick={() => { this.RouterTo('/sign/standard') }} arrow="horizontal">标准签字界面</Item>
        <Item onClick={() => { this.RouterTo('/sign/signboard') }} arrow="horizontal">自定义-签字板</Item>
        <Item onClick={() => { this.RouterTo('/sign/write') }} arrow="horizontal">自定义-圈批</Item>
        <Item onClick={() => { this.RouterTo('/sign/deletedata') }} arrow="horizontal">删除当前界面上未保存的笔迹数据</Item>
        <Item onClick={() => { this.RouterTo('/sign/text') }} arrow="horizontal">自定义-文本</Item>
        <Item onClick={() => { this.RouterTo('/sign/timestemp') }} arrow="horizontal">自定义-时间戳</Item>
      </List>
      {/* end */}
    </div>
  }
}