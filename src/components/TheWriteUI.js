import React from 'react'
import '../styles/the.signboard.css'
import {
  Flex,
  ActionSheet
} from 'antd-mobile'
export default class TheWriteUI extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      colorArr: ['#ff0000', '#ff9100', '#eeff00', '#00a0ff'],
      sizeArr: [1, 2, 3, 4, 5, 6, 7, 8],
      color: '#ff9100',
      size: 8,
      eraserState: false,
      moveState: false
    }
  }

  componentDidMount () {
    this.props.onInit && this.props.onInit(this.state.color, this.state.size)
  }

  SizeHandle () {
    ActionSheet.showActionSheetWithOptions({
      options: [1, 2, 3, 4, 5, 6, 7, 8, '取消'],
      cancelButtonIndex: 8,
      message: '选择笔迹粗细'
    }, btnIdx => {
      if (btnIdx >= 8) return
      this.setState({ size: btnIdx + 1 }, () => {
        this.props.onSize && this.props.onSize(this.state.size)
      })
    })
  }

  ColorHandle () {
    ActionSheet.showActionSheetWithOptions({
      options: ['红', '橙', '黄', '蓝', '取消'],
      cancelButtonIndex: 4,
      message: '选择笔迹颜色'
    }, btnIdx => {
      if (btnIdx >= 4) return
      this.setState(s => {
        s.color = this.state.colorArr[btnIdx]
        return s
      }, () => {
        this.props.onColor && this.props.onColor(this.state.color)
      })
    })
  }

  EraserHandle () {
    const newEraserState = !this.state.eraserState
    this.setState({ eraserState: newEraserState, moveState: false })
    this.props.onEraser && this.props.onEraser(newEraserState)
  }

  ClearHandle () {
    this.props.onClear && this.props.onClear()
  }

  MoveHandle () {
    const newMoveState = !this.state.moveState
    this.setState({ moveState: newMoveState, eraserState: false })
    this.props.onMove && this.props.onMove(newMoveState)
  }

  OkHandle () {
    this.props.onOk && this.props.onOk()
  }

  render () {
    const eraserSelectCSS = { borderRadius: '4px', backgroundColor: '#00a0ff', color: '#ffffff' }
    const eraserDeselectCSS = { color: '#00a0ff' }
    return <div id="s-control">
      <div>
        <Flex align="center">
          <Flex.Item>
            <div onClick={this.SizeHandle.bind(this)} style={{ textAlign: 'center', fontSize: '20px' }}>{ this.state.size }</div>
          </Flex.Item>
          <Flex.Item>
            <div onClick={this.ColorHandle.bind(this)} style={{ textAlign: 'center' }}>
              <i className="iconfont iconpen" style={{ color: this.state.color }}></i>
            </div>
          </Flex.Item>
          <Flex.Item>
            <div onClick={this.EraserHandle.bind(this)} style={{ textAlign: 'center' }}>
              <i className="iconfont iconerase" style={this.state.eraserState ? eraserSelectCSS : eraserDeselectCSS}></i>
            </div>
          </Flex.Item>
          <Flex.Item>
            <div onClick={this.MoveHandle.bind(this)} style={{ textAlign: 'center' }}>
              <i className="iconfont iconhandcursor" style={this.state.moveState ? eraserSelectCSS : eraserDeselectCSS}></i>
            </div>
          </Flex.Item>
          <Flex.Item>
            <div onClick={this.ClearHandle.bind(this)} style={{ textAlign: 'center',  }}>
              <i className="iconfont iconbrush"></i>
            </div>
          </Flex.Item>
          <Flex.Item>
            <div onClick={this.OkHandle.bind(this)} style={{ textAlign: 'center' }}>
              <i className="iconfont iconduigoux"></i>
            </div>
          </Flex.Item>
        </Flex>
      </div>
    </div>
  }
}