import React from 'react'
import safeAreaInsets from 'safe-area-insets'
import {
  TabBar,
  Toast
} from 'antd-mobile'
export default class DeleteDataPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      token: window.demoConfig.token,
      fileArr: window.demoConfig.fileArr
    }
  }

  ctx

  componentDidMount () {
    Toast.loading('文件加载中', 0)
    const ctx = new window.WSContext('#ctxEl', {
      token: this.state.token,
      fileArr: this.state.fileArr,
      callerId: 'wellsign',
      callerName: '好签',
      callerDesc: '签字用好签',
      safeAreaBottom: safeAreaInsets.bottom,
      onRenderEnd: result => {
        if (result.success === true) {
          this.ctx = ctx
          Toast.success('文件加载成功', 1, undefined, false)
        } else {
          Toast.fail('文件加载失败')
        }
      }
    })
  }

  componentWillUnmount () {
    this.ctx && this.ctx.Destroy()
  }

  SignBtnHandle () {
    this.ctx && this.ctx.FireSigntemp()
  }

  SubmitBtnHandle () {
    if (this.ctx) {
      Toast.loading('提交中', 0)
      this.ctx.Save(result => (result.success === true) ? Toast.success('提交成功') : Toast.fail('提交失败'))
    }
  }

  DeleteBtnHandle () {
    if (this.ctx) {
      this.ctx.DeleteSignData()
      Toast.success('删除成功', 1)
    }
  }

  render () {
    return (
    <div className="ws-page">
      {/* 签字视图 */}
      <div id="ctxEl" style={{ height: `calc(100%${safeAreaInsets.bottom ? ' - 30px' : ''}${!this.state.writeScreen ? ' - 50px' : ''})` }}></div>
      {/* 底部按钮 */}
      <div className="ws-bottom" style={{ height: '50px', overflow: 'hidden' }}>
        <TabBar noRenderContent={true} >
          <TabBar.Item
            title="签名"
            onPress={ () => this.SignBtnHandle() }
            icon={<i className="iconfont iconsign"/>}/>
          <TabBar.Item
            title="删除"
            onPress={ () => this.DeleteBtnHandle() }
            icon={<i className="iconfont icondelete"/>}/>
          <TabBar.Item
            title="提交"
            onPress={ () => this.SubmitBtnHandle() }
            icon={<i className="iconfont iconduigoux"/>}/>
        </TabBar>
      </div>
      {/* end */}
    </div>
    )
  }
}