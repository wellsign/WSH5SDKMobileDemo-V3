import React from 'react'
import { TabBar, Toast } from 'antd-mobile'
import TheWriteUI from '../components/TheWriteUI'
export default class SignWrite extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      token: window.demoConfig.token,
      fileArr: window.demoConfig.fileArr,
      visible: false
    }
  }

  ctx

  control

  componentDidMount () {
    Toast.loading('文件加载中', 0)
    const ctx = new window.WSContext('#ctxEl', {
      token: this.state.token,
      fileArr: this.state.fileArr,
      callerId: 'wellsign',
      callerName: '好签',
      callerDesc: '好签公司',
      customWriteUI: true, // 自定义圈批的UI
      onRenderEnd: result => {
        if (result.success === true) {
          this.ctx = ctx
          Toast.success('文件加载成功', 1, undefined, false)
        } else {
          Toast.fail('文件加载失败')
        }
      },
      // 签字板弹出回调。 customWriteUI 为 true 的时候 control 才有返回值
      onWriteStart: control => {
        this.control = control
        this.setState({ visible: true })
      },
      onWriteEnd: () => {
        this.control = undefined
        this.setState({ visible: false })
      }
    })
  }

  componentWillUnmount () {
    if (this.ctx) {
      this.ctx.Destroy()
      this.ctx = undefined
    }
  }

  WriteHandle () {
    this.ctx && this.ctx.FireWrite()
  }

  SubmitHandle () {
    if (this.ctx) {
      Toast.loading('提交中', 0)
      this.ctx.Save(result => (result.success === true) ? Toast.success('提交成功') : Toast.fail('提交失败'))
    }
  }

  render () {
    return <div className="ws-page">
      {/* 签字视图 */}
      <div id="ctxEl" style={{ height: 'calc(100% - 50px)' }}></div>
      {/* 底部按钮 */}
      <div className="ws-bottom">
        <TabBar noRenderContent={true} >
          <TabBar.Item
            title="圈批"
            onPress={() => this.WriteHandle()}
            icon={<i className="iconfont iconfullwrite3"/>}/>
          <TabBar.Item
            title="提交"
            onPress={() => this.SubmitHandle()}
            icon={<i className="iconfont iconduigoux"/>}/>
        </TabBar>
      </div>
      { this.state.visible && <TheWriteUI
          onInit={(color, size) => {
            this.control && this.control.setLineSize(size)
            this.control && this.control.setLineColor(color)
          }}
          onOk={() => {
            this.control && this.control.fireOk()
          }}
          onSize={size => {
            this.control && this.control.setLineSize(size)
          }}
          onColor={color => {
            this.control && this.control.setLineColor(color)
          }}
          onEraser={state => {
            if (state === true) {
              this.control && this.control.fireEraser()
            } else {
              this.control && this.control.fireStroke()
            }
          }}
          onMove={state  => {
            if (state === true) {
              this.control && this.control.fireMove()
            } else {
              this.control && this.control.fireStroke()
            }
          }}
          onClear={() => {
            this.control && this.control.fireClear()
          }}/> }
      {/* end */}
    </div>
  }
}