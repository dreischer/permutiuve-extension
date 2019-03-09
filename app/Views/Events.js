import React, { Component } from 'preact'

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

    return (
      <div class={`event ${activeClass}`}>
        <div class='event-summary' onclick={this.toggle.bind(this)}>
          <div class='event-name'>{event.name}</div>
          <div class='event-time'>{event.time}</div>
        </div>
        <div class='event-full'>
          <pre>{JSON.stringify(event, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

export default class Events extends Component {
  constructor (props) {
    super(props)
    this.state = {
      events: [],
      count: 0
    }
  }

  componentDidMount () {
    window.parent.permutive.on(/.*/, (event) => {
      this.setState({
        events: this.state.events.concat(event),
        count: ++this.state.count
      })
    }).replay()
  }

  render (props, state) {
    const events = state.events.map(event => <EventItem event={event} />)
    return (
      <div className=''>
        <h1 class='view-title'>Events</h1>
        <span class='count'>{`(${state.count})`}</span>
        <div>{events}</div>
      </div>
    )
  }
}
