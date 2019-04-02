import React, { Component } from 'preact'
import { Consumer } from 'tiny-atom/preact'

import 'brace'
import 'brace/mode/json'
import 'brace/theme/dawn'
import AceEditor from 'react-ace'

class EventItem extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      open: false
    }
  }

  toggle () {
    this.setState({
      open: !this.state.open
    })
  }

  render (props, state) {
    const { event } = props
    const activeClass = state.open ? 'active' : ''
    const time = new Date(event.time).toLocaleString()
    const content = !state.open ? null : (<AceEditor
      mode='json'
      theme='dawn'
      height='500px'
      width='100%'
      readOnly
      wrapEnabled
      value={JSON.stringify(event, null, 2)}
      editorProps={{ $blockScrolling: true }}
      setOptions={{ useWorker: false }} // we don't need syntax checking
    />)

    return (
      <div class={`event ${activeClass}`}>
        <div class='event-summary' onclick={this.toggle}>
          <div class='event-name'>{event.name}</div>
          <div class='event-time'>{time}</div>
        </div>
        <div class='event-full'>
          { content }
        </div>
      </div>
    )
  }
}

class List extends Component {
  render (props) {
    return (
      <div class='list'>
        {props.items.map(event => <EventItem event={event} />)}
      </div>
    )
  }
}

class Search extends Component {
  constructor (props) {
    super(props)
    console.log('------- this', this)
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
        events: state.data.events
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
