import React from 'react'
import { TabBar, Toast, Modal } from 'antd-mobile'
export default class SignText extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      // 渲染的 token 和 fileArr 已在 public/index.html 里面设置好
      token: window.demoConfig.token,
      fileArr: window.demoConfig.fileArr
    }
  }

  ctx // 签字实例

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
          Toast.success('文件加载成功', 1, undefined, false)
        } else {
          Toast.fail('文件加载失败')
        }
      },
      // 当文本被编辑的时候回调。如果配置了本回调方法，默认编辑弹窗不会显示
      onTextEdit: ({ text, color }, callback) => {
        Modal.prompt('编辑文本', undefined, [
          { text: '关闭' },
          {
            text: '确定',
            onPress: value => {
              if (value) {
                callback(value + '_好签-20210101', color)
              }
            }
          }
        ], 'default', text.substring(0, text.length - 12), ['输入文本'])
      }
    })
  }

  componentWillUnmount () {
    if (this.ctx) {
      this.ctx.Destroy()
      this.ctx = undefined
    }
  }

  // 插入文本
  InsertText () {
    Modal.prompt('插入文本', undefined, [
      { text: '关闭' },
      {
        text: '确定',
        onPress: value => {
          if (value) {
            this.ctx && this.ctx.InsertText(value + '_好签-20210101', '#00a0ff')
          }
        }
      }
    ], 'default', null, ['输入文本'])
  }

  SubmitHandle () {
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

  render () {
    return <div className="ws-page">
      {/* 签字视图 */}
      <div id="ctxEl" style={{ height: 'calc(100% - 50px)' }}></div>
      {/* 底部按钮 */}
      <div className="ws-bottom">
        <TabBar noRenderContent={true} >
          <TabBar.Item title="文本" onPress={() => this.InsertText()} icon={<i className="iconfont icontext"/>}/>
          <TabBar.Item title="提交" onPress={() => this.SubmitHandle()} icon={<i className="iconfont iconduigoux"/>}/>
        </TabBar>
      </div>
      {/* end */}
    </div>
  }
}