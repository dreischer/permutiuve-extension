import React, { Component } from 'preact'
import { Consumer } from 'tiny-atom/preact'
import Item from '../components/Item'

class List extends Component {
  render (props) {
    return (
      <div class='list'>
        {props.items.map(event => {
          const { name, time } = event
          return <Item payload={event} title={name} subtitle={new Date(time).toLocaleString()} />
        })}
      </div>
    )
  }
}

class Search extends Component {
  constructor (props) {
    super(props)
    this.updateFilter = this.updateFilter.bind(this)
    this.state = {
      filterText: null
    }
  }
  updateFilter (e) {
    this.setState({ filterText: e.target.value.toLowerCase() })
  }
  render (props, state) {
    const hasFilter = state.filterText && state.filterText.length > 0
    const items = !hasFilter ? props.items : props.items.filter(item => {
      return item.name.toLowerCase().includes(state.filterText)
    })
    return (
      <div>
        <input type='text' placeholder='Filter...' class='list-filter' value={this.state.filterText} onkeyup={this.updateFilter} />
        <List items={items} />
      </div>
    )
  }
}

export default class Events extends Component {
  render (props, state) {
    const map = function (state) {
      return {
        events: state.data.events.items
      }
    }
    return (
      <Consumer map={map} >
        {({ events }) => (
          <div className=''>
            <h1 class='view-title'>Events</h1>
            <Search items={events} />
          </div>
        )}
      </Consumer>
    )
  }
}
