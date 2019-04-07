import React, { Component } from 'preact'
import Filter from '../Filter'
import Item from '../Item'

export default class List extends Component {
  render (props, state) {
    return (
      <div className=''>
        <h1 class='view-title'>{props.title}</h1>
        <Inner items={props.items} filter={props.filter} setFilter={props.setFilter} />
      </div>
    )
  }
}

class Inner extends Component {
  constructor (props) {
    super(props)
    this.updateFilter = this.updateFilter.bind(this)
    this.state = {
      filter: props.filter
    }
  }
  updateFilter (filter) {
    this.setState({ filter })
    this.props.setFilter(filter)
  }
  getItems () {
    if (this.state.filter) {
      return this.props.items.filter(item => item.name.toLowerCase().includes(this.state.filter))
    } else {
      return this.props.items
    }
  }
  render (props, state) {
    const items = this.getItems()
    const css = {
      'font-size': '20px',
      'padding': '10px 10px'
    }
    const content = items.length ? <Items items={items} /> : <div style={css}>🤷‍ No results...</div>

    return (
      <div>
        <Filter callback={this.updateFilter} value={props.filter} />
        {content}
      </div>
    )
  }
}

class Items extends Component {
  render (props) {
    return (
      <div class='list'>
        {props.items.map(item => {
          const { name, subtitle, payload, tooltip } = item
          return <Item payload={payload} title={name} subtitle={subtitle} tooltip={tooltip} />
        })}
      </div>
    )
  }
}
