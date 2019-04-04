import React, { Component } from 'preact'
import { Consumer } from 'tiny-atom/preact'
import Item from '../components/Item'

export default class Segments extends Component {
  render (props, state) {
    const map = function (state) {
      return {
        segments: state.data.segments.items.map(segment => <Item title={segment} />)
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
