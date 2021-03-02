import React from 'react'
import { TabBar, Toast } from 'antd-mobile'
import TheSignboardUI from '../components/TheSignboardUI.js'
export default class SignSignboard extends React.Component {
  
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
      customSignboardUI: true, // 自定义签字板的UI
      renderControl: false,
      onRenderEnd: result => {
        if (result.success === true) {
          this.ctx = ctx
          Toast.success('文件加载成功', 1, undefined, false)
        } else {
          Toast.fail('文件加载失败')
        }
      },
      // 签字板弹出回调。 customSignboardUI 为 true 的时候 control 才有返回值
      onSignboardStart: control => {
        console.log(`[demo] 签字板开启`, control)
        this.control = control
        this.setState({ visible: true })
      }
    })
  }

  componentWillUnmount () {
    if (this.ctx) {
      this.ctx.Destroy()
      this.ctx = undefined
    }
  }

  SignboardHandle () {
    this.ctx && this.ctx.FireSignboard()
  }

  SubmitHandle () {
    Toast.loading('提交中', 0)
    this.ctx.Save(result => {
      if (result.success === true) {
        Toast.success('提交成功')
      } else {
        Toast.fail('提交失败')
      }
    })
  }

  render () {
    return <div className="ws-page">
      {/* 签字视图 */}
      <div id="ctxEl" style={{ height: 'calc(100% - 50px)' }}></div>
      {/* 底部按钮 */}
      <div className="ws-bottom">
        <TabBar noRenderContent={true} >
          <TabBar.Item
            title="签字板"
            onPress={() => this.SignboardHandle()}
            icon={<i className="iconfont iconwhiteboard"/>}/>
          <TabBar.Item
            title="提交"
            onPress={() => this.SubmitHandle()}
            icon={<i className="iconfont iconduigoux"/>}/>
        </TabBar>
      </div>
      {/* 自定义的签字板UI */}
      { this.state.visible ? <TheSignboardUI
        onCancel={() => {
          this.control && this.control.fireCancel()
          this.setState({ visible: false })
        }}
        onOk={() => {
          this.control && this.control.fireOk()
          this.setState({ visible: false })
        }}
        onClear={() => {
          this.control && this.control.fireClear()
        }}
        onEraser={eraserState => {
          if (eraserState === true) {
            this.control && this.control.fireEraser()
          } else {
            this.control && this.control.fireStroke()
          }
        }}
        onColor={color => {
          this.control && this.control.setLineColor(color)
        }}
        onSize={size => {
          this.control && this.control.setLineSize(size)
        }}
        onInit={(color, size) => {
          this.control && this.control.setLineSize(size)
          this.control && this.control.setLineColor(color)
        }}
        /> : undefined }
      {/* end */}
    </div>
  }
}
