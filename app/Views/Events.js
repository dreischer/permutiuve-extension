import React, { Component } from 'preact'
import { Consumer } from 'tiny-atom/preact'

import 'brace'
import 'brace/mode/json'
import 'brace/theme/dawn'
import AceEditor from 'react-ace'

class EventItem extends Component {
  constructor (props) {
    super(props)
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

    return (
      <div class={`event ${activeClass}`}>
        <div class='event-summary' onclick={this.toggle.bind(this)}>
          <div class='event-name'>{event.name}</div>
          <div class='event-time'>{time}</div>
        </div>
        <div class='event-full'>
          <AceEditor
            mode='json'
            theme='dawn'
            height='500px'
            width='100%'
            readOnly
            wrapEnabled
            value={JSON.stringify(event, null, 2)}
            editorProps={{ $blockScrolling: true }}
            setOptions={{ useWorker: false }} // we don't need syntax checking
          />
        </div>
      </div>
    )
  }
}

export default class Events extends Component {
  render (props, state) {
    const map = function (state) {
      return {
        events: state.data.events.map(event => <EventItem event={event} />)
      }
    }
    return (
      <Consumer map={map} >
        {({ events }) => (
          <div className=''>
            <h1 class='view-title'>Events</h1>
            <div>{events}</div>
          </div>
        )}
      </Consumer>
    )
  }
}
