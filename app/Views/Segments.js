import React, { Component } from 'preact'

export default class Segments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      segments: [],
      count: 0
    }
  }

  componentDidMount () {
    this.setSegmentState()
    window.parent.permutive.on(/Segment(Entry|Exit)/, this.setSegmentState)
  }

  setSegmentState () {
    window.parent.permutive.segments(segments => {
      this.setState({
        segments: segments,
        count: segments.length
      })
    })
  }

  render (props, state) {
    const content = state.segments.map(segment => <div>{segment}</div>)
    return (
      <div className=''>
        <h1 class='view-title'>Segments</h1>
        <span class='count'>{`(${state.count})`}</span>
        {content}
      </div>
    )
  }
}
