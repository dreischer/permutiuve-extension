import React, { Component } from 'preact'
import { Consumer } from 'tiny-atom/preact'
import List from '../components/List'

export default class Segments extends Component {
  render (props, state) {
    const map = function (state) {
      return {
        items: state.data.segments.items.map(mapSegment),
        filter: state.data.segments.filter
      }
    }
    return (
      <Consumer map={map} >
        {({ items, filter, dispatch }) => (
          <List items={items} filter={filter} setFilter={function (value) {
            dispatch('setFilter', { type: 'segments', value })
          }} title='Segments' />
        )}
      </Consumer>
    )
  }
}

function mapSegment (item) {
  return {
    name: String(item),
    subtitle: null,
    payload: null
  }
}
