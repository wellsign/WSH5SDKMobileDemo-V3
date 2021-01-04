import React, { Component } from 'react'
import safeAreaInsets from 'safe-area-insets'
import {
  TabBar,
  ActionSheet,
  Toast
} from 'antd-mobile'
export default class SignStandard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: window.demoConfig.token,
      fileArr: window.demoConfig.fileArr,
      writeScreen: false // 圈批模式全屏
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
      safeAreaBottom: safeAreaInsets.bottom,
      onRenderEnd: result => {
        console.log(`[demo] 文件渲染结束: ${result.success}`, result)
        if (result.success === true) {
          this.ctx = ctx
          Toast.success('文件加载成功', 1, () => {}, false)
        } else {
          Toast.fail('文件加载失败')
        }
      },
      onScrollEnd: pageInfo => {
        console.log(`[demo] 文件界面滚动结束 : 当前页面${pageInfo.pageNum}`)
      },
      onWriteStart: () => {
        console.log(`[demo] 圈批开启`)
        this.setState({ writeScreen: true }, () => { this.ctx.ResizeHeight() })
      },
      onWriteEnd: () => {
        console.log(`[demo] 圈批关闭`)
        this.setState({ writeScreen: false }, () => { this.ctx.ResizeHeight() })
      },
      onSignboardStart: () => {
        console.log(`[demo] 签字板开启`)
      }
    })
  }

  componentWillUnmount () {
    if (this.ctx) {
      this.ctx.Destroy()
      this.ctx = undefined
    }
  }

  /* 底部按钮点击事件 */
  SignBtnHandle () {
    this.ctx && this.ctx.FireSigntemp()
  }

  /* 文本按钮点击事件 */
  TextBtnHandle () {
    this.ctx && this.ctx.FireText()
  }

  /* 圈批按钮点击事件 */
  WriteBtnHandle () {
    this.ctx && this.ctx.FireWrite()
  }

  /* 更多按钮点击事件 */
  MoreBtnHandle () {
    const options = ['图片', '签字板', '田字格', '验签', '缩略图', '取消']
    const cancelButtonIndex = 5
    ActionSheet.showActionSheetWithOptions({ options, cancelButtonIndex }, btnIdx => {
      if (btnIdx === 0) {
        this.ImageHandle()
      } else if (btnIdx === 1) {
        this.SignboardHandle()
      } else if (btnIdx === 2) {
        this.MeterHandle()
      } else if (btnIdx === 3) {
        this.VerifyHandle()
      } else if (btnIdx === 4) {
        this.ThumbnailHandle()
      }
    })
  }

  /* 提交按钮点击事件 */
  SubmitBtnHandle () {
    if (this.ctx) {
      Toast.loading('提交中', 0)
      this.ctx.Save(result => {
        if (result.success === true) {
          Toast.success('提交成功')
        } else {
          Toast.fail('提交失败')
        }
      })
    }
  }

  /* 图片 */
  ImageHandle () {
    this.ctx && this.ctx.FireImage()
  }

  /* 签字板 */
  SignboardHandle () {
    this.ctx && this.ctx.FireSignboard()
  }

  /* 田字格 */
  MeterHandle () {
    this.ctx && this.ctx.FireMeter()
  }

  /* 验签 */
  VerifyHandle () {
    this.ctx && this.ctx.FireVerify()
  }

  /* 缩略图 */
  ThumbnailHandle () {
    this.ctx && this.ctx.FireThumbnail()
  }

  render () {
    return <div className="ws-page">
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
            title="文本"
            onPress={ () => this.TextBtnHandle() }
            icon={<i className="iconfont icontext"/>}/>
          <TabBar.Item
            title="圈批"
            onPress={ () => this.WriteBtnHandle() }
            icon={<i className="iconfont iconfullwrite3"/>}/>
          <TabBar.Item
            title="更多"
            onPress={ () => this.MoreBtnHandle() }
            icon={<i className="iconfont iconmore"/>}/>
          <TabBar.Item
            title="提交"
            onPress={ () => this.SubmitBtnHandle() }
            icon={<i className="iconfont iconduigoux"/>}/>
        </TabBar>
      </div>
      {/* end */}
    </div>
  }
}