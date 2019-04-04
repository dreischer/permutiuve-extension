import React, { Component } from 'preact'
import './Item.css'

import 'brace'
import 'brace/mode/json'
import 'brace/theme/dawn'
import AceEditor from 'react-ace'

export default class Item extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      open: false,
      hasPayload: !!props.payload
    }
  }

  toggle () {
    if (this.state.hasPayload) {
      this.setState({
        open: !this.state.open
      })
    }
  }

  render (props, state) {
    const { payload, title, subtitle } = props
    const openClass = state.open ? 'open' : ''
    const activeClass = state.hasPayload ? 'hasPayload' : ''
    const content = !state.open ? null : (<AceEditor
      mode='json'
      theme='dawn'
      height='500px'
      width='100%'
      readOnly
      wrapEnabled
      value={JSON.stringify(payload, null, 2)}
      editorProps={{ $blockScrolling: true }}
      setOptions={{ useWorker: false }} // we don't need syntax checking
    />)

    return (
      <div class={`item ${openClass}`}>
        <div class={`item-summary ${activeClass}`} onclick={this.toggle}>
          <div class='item-title'>{title}</div>
          <div class='item-subtitle'>{subtitle}</div>
        </div>
        <div class='item-content'>
          { content }
        </div>
      </div>
    )
  }
}
