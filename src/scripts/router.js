import React from 'react'
import { Route, HashRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import pLoading from '../components/loading'

export default (
<HashRouter>
  <Route path="/" exact component={ Loadable({ loader: () => import('../pages/home'), loading: pLoading }) }/>
  <Route path="/sign/standard" exact component={ Loadable({ loader: () => import('../pages/sign.standard'), loading: pLoading }) }/>
  <Route path="/sign/signboard" exact component={ Loadable({ loader: () => import('../pages/sign.signboard'), loading: pLoading }) }/>
  <Route path="/sign/write" exact component={ Loadable({ loader: () => import('../pages/sign.write'), loading: pLoading }) }/>
  <Route path="/sign/deletedata" exact component={ Loadable({ loader: () => import('../pages/sign.deletedata'), loading: pLoading }) }/>
  <Route path="/sign/text" exact component={ Loadable({ loader: () => import('../pages/sign.text'), loading: pLoading }) }/>
  <Route path="/sign/timestemp" exact component={ Loadable({ loader: () => import('../pages/sign.timestemp'), loading: pLoading }) }/>
</HashRouter>
)