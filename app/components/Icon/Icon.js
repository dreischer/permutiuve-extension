import React, { Component } from 'preact'
import './Icon.css'

export default class Icon extends Component {
  render (props, state) {
    return (
      <div onClick={props.toggle} class='icon-outer'>
        <div class='icon-count'>{props.counts.events}</div>
        <div class='icon-inner'>
          <div class='icon-logo' />
        </div>
      </div>
    )
  }
}
