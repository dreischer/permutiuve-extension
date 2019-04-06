import React, { Component } from 'preact'
import './Filter.css'

export default class Filter extends Component {
  constructor (props) {
    super(props)
    this.updateFilter = this.updateFilter.bind(this)
  }
  updateFilter (e) {
    this.props.callback(e.target.value)
  }
  render (props, state) {
    return (
      <input type='text' placeholder='🔍 Filter...' class='list-filter' value={props.value} onkeyup={this.updateFilter} />
    )
  }
}
