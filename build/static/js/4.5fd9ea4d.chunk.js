(this["webpackJsonpwsh5sdkmobiledemo-v3"]=this["webpackJsonpwsh5sdkmobiledemo-v3"]||[]).push([[4],{175:function(e,t,n){},182:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return f}));var o=n(69),i=n(70),a=n(73),r=n(72),l=n(0),c=n.n(l),s=n(71),u=(n(175),function(e){Object(a.a)(n,e);var t=Object(r.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e)).state={colorArr:["#ff0000","#ff9100","#eeff00","#00a0ff"],sizeArr:[1,2,3,4,5,6,7,8],color:"#ff9100",size:8,eraserState:!1,moveState:!1},i}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.props.onInit&&this.props.onInit(this.state.color,this.state.size)}},{key:"SizeHandle",value:function(){var e=this;s.a.showActionSheetWithOptions({options:[1,2,3,4,5,6,7,8,"\u53d6\u6d88"],cancelButtonIndex:8,message:"\u9009\u62e9\u7b14\u8ff9\u7c97\u7ec6"},(function(t){t>=8||e.setState({size:t+1},(function(){e.props.onSize&&e.props.onSize(e.state.size)}))}))}},{key:"ColorHandle",value:function(){var e=this;s.a.showActionSheetWithOptions({options:["\u7ea2","\u6a59","\u9ec4","\u84dd","\u53d6\u6d88"],cancelButtonIndex:4,message:"\u9009\u62e9\u7b14\u8ff9\u989c\u8272"},(function(t){t>=4||e.setState((function(n){return n.color=e.state.colorArr[t],n}),(function(){e.props.onColor&&e.props.onColor(e.state.color)}))}))}},{key:"EraserHandle",value:function(){var e=!this.state.eraserState;this.setState({eraserState:e,moveState:!1}),this.props.onEraser&&this.props.onEraser(e)}},{key:"ClearHandle",value:function(){this.props.onClear&&this.props.onClear()}},{key:"MoveHandle",value:function(){var e=!this.state.moveState;this.setState({moveState:e,eraserState:!1}),this.props.onMove&&this.props.onMove(e)}},{key:"OkHandle",value:function(){this.props.onOk&&this.props.onOk()}},{key:"render",value:function(){var e={borderRadius:"4px",backgroundColor:"#00a0ff",color:"#ffffff"},t={color:"#00a0ff"};return c.a.createElement("div",{id:"s-control"},c.a.createElement("div",null,c.a.createElement(s.b,{align:"center"},c.a.createElement(s.b.Item,null,c.a.createElement("div",{onClick:this.SizeHandle.bind(this),style:{textAlign:"center",fontSize:"20px"}},this.state.size)),c.a.createElement(s.b.Item,null,c.a.createElement("div",{onClick:this.ColorHandle.bind(this),style:{textAlign:"center"}},c.a.createElement("i",{className:"iconfont iconpen",style:{color:this.state.color}}))),c.a.createElement(s.b.Item,null,c.a.createElement("div",{onClick:this.EraserHandle.bind(this),style:{textAlign:"center"}},c.a.createElement("i",{className:"iconfont iconerase",style:this.state.eraserState?e:t}))),c.a.createElement(s.b.Item,null,c.a.createElement("div",{onClick:this.MoveHandle.bind(this),style:{textAlign:"center"}},c.a.createElement("i",{className:"iconfont iconhandcursor",style:this.state.moveState?e:t}))),c.a.createElement(s.b.Item,null,c.a.createElement("div",{onClick:this.ClearHandle.bind(this),style:{textAlign:"center"}},c.a.createElement("i",{className:"iconfont iconbrush"}))),c.a.createElement(s.b.Item,null,c.a.createElement("div",{onClick:this.OkHandle.bind(this),style:{textAlign:"center"}},c.a.createElement("i",{className:"iconfont iconduigoux"}))))))}}]),n}(c.a.Component)),f=function(e){Object(a.a)(n,e);var t=Object(r.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e)).state={token:window.demoConfig.token,fileArr:window.demoConfig.fileArr,visible:!1},i}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this;s.g.loading("\u6587\u4ef6\u52a0\u8f7d\u4e2d",0);var t=new window.WSContext("#ctxEl",{token:this.state.token,fileArr:this.state.fileArr,callerId:"wellsign",callerName:"\u597d\u7b7e",callerDesc:"\u597d\u7b7e\u516c\u53f8",customWriteUI:!0,onRenderEnd:function(n){!0===n.success?(e.ctx=t,s.g.success("\u6587\u4ef6\u52a0\u8f7d\u6210\u529f",1,void 0,!1)):s.g.fail("\u6587\u4ef6\u52a0\u8f7d\u5931\u8d25")},onWriteStart:function(t){e.control=t,e.setState({visible:!0})},onWriteEnd:function(){e.control=void 0,e.setState({visible:!1})}})}},{key:"componentWillUnmount",value:function(){this.ctx&&(this.ctx.Destroy(),this.ctx=void 0)}},{key:"WriteHandle",value:function(){this.ctx&&this.ctx.FireWrite()}},{key:"SubmitHandle",value:function(){this.ctx&&(s.g.loading("\u63d0\u4ea4\u4e2d",0),this.ctx.Save((function(e){return!0===e.success?s.g.success("\u63d0\u4ea4\u6210\u529f"):s.g.fail("\u63d0\u4ea4\u5931\u8d25")})))}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"ws-page"},c.a.createElement("div",{id:"ctxEl",style:{height:"calc(100% - 50px)"}}),c.a.createElement("div",{className:"ws-bottom"},c.a.createElement(s.f,{noRenderContent:!0},c.a.createElement(s.f.Item,{title:"\u5708\u6279",onPress:function(){return e.WriteHandle()},icon:c.a.createElement("i",{className:"iconfont iconfullwrite3"})}),c.a.createElement(s.f.Item,{title:"\u63d0\u4ea4",onPress:function(){return e.SubmitHandle()},icon:c.a.createElement("i",{className:"iconfont iconduigoux"})}))),this.state.visible&&c.a.createElement(u,{onInit:function(t,n){e.control&&e.control.setLineSize(n),e.control&&e.control.setLineColor(t)},onOk:function(){e.control&&e.control.fireOk()},onSize:function(t){e.control&&e.control.setLineSize(t)},onColor:function(t){e.control&&e.control.setLineColor(t)},onEraser:function(t){!0===t?e.control&&e.control.fireEraser():e.control&&e.control.fireStroke()},onMove:function(t){!0===t?e.control&&e.control.fireMove():e.control&&e.control.fireStroke()},onClear:function(){e.control&&e.control.fireClear()}}))}}]),n}(c.a.Component)}}]);