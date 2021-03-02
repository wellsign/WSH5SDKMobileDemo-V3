import React, { Component } from 'react'
import {
  Toast
} from 'antd-mobile'
export default class SignStandard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: window.demoConfig.token,
      fileArr: window.demoConfig.fileArr
    }
  }

  // 签名实例
  ctx

  componentDidMount () {
    Toast.loading('文件加载中', 0)
    const ctx = new window.WSContext('#ctxEl', {
      token: this.state.token,
      fileArr: this.state.fileArr,
      callerId: 'wellsign',
      callerName: '好签',
      callerDesc: '好签公司',
      onRenderEnd: result => {
        if (result.success === true) {
          this.ctx = ctx
          Toast.success('文件加载成功', 1, () => {}, false)
        } else {
          Toast.fail('文件加载失败')
        }
      }
    })
  }

  componentWillUnmount () {
    if (this.ctx) {
      this.ctx.Destroy()
      this.ctx = undefined
    }
  }

  render () {
    return <div className="ws-page">
      {/* 签字视图 */}
      <div id="ctxEl" style={ { height: '100%' } }></div>
      {/* end */}
    </div>
  }
}