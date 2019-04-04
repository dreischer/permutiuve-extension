import React, { Component } from 'preact'
import createAtom from 'tiny-atom'
import { Provider } from 'tiny-atom/preact'
import Wrapper from './Views/Wrapper'

import './index.css'

const log = require('tiny-atom/log')
const { actions } = require('./actions')
const atom = createAtom(initialState(), actions, { debug: log() })

function initialState () {
  const { initialState } = require('./actions')
  // console.log(initialState)
  // console.log(Object.assign({}, initialState, window.hotAtom))
  // return Object.assign({}, initialState, window.hotAtom)
  return initialState
}

atom.observe(function onChange (atom) {
  window.hotAtom = atom.get()
})

export default class App extends Component {
  render () {
    return (
      <Provider atom={atom}>
        <Wrapper atom={atom} />
      </Provider>
    )
  }
}
