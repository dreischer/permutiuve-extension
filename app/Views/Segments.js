import React, { Component } from 'preact'
import { Consumer } from 'tiny-atom/preact'

export default class Segments extends Component {
  render (props, state) {
    const map = function (state) {
      return {
        segments: state.data.segments.map(segment => <div>{segment}</div>)
      }
    }
    return (
      <Consumer map={map} >
        {({ segments }) => (
          <div className=''>
            <h1 class='view-title'>Segments</h1>
            {segments}
          </div>
        )}
      </Consumer>
    )
  }
}
