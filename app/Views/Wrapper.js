import React, { Component } from 'preact'
import { Consumer } from 'tiny-atom/preact'

import Header from '../components/Header'
import Icon from '../components/Icon'
import Menu from '../components/Menu'

export default class Wrapper extends Component {
  componentDidMount () {
    const { atom } = this.props
    atom.actions.updateSegments()
    const allEvents = window.parent.permutive.on(/.*/, atom.actions.addEvent).replay()
    const segmentEvents = window.parent.permutive.on(/Segment(Entry|Exit)/, atom.actions.updateSegments)

    // remove any existing event listeners
    window.eventListeners = window.eventListeners || []
    window.eventListeners.forEach(listener => listener.remove())
    window.eventListeners = [allEvents, segmentEvents]
  }
  render (props, state) {
    const map = function (state) {
      const { open, navigation, data } = state
      return {
        open,
        content: navigation.items.find(item => item.id === navigation.activeItem).content,
        activeItem: navigation.activeItem,
        items: navigation.items,
        counts: {
          events: data.eventCount,
          segments: data.segmentCount
        }
      }
    }
    const actions = ['toggleOpen', 'setMenuLocation']

    const icon = (
      <Consumer map={map} actions={actions} >
        {({ toggleOpen }) => (
          <Icon toggle={toggleOpen} />
        )}
      </Consumer>
    )
    const widget = (
      <Consumer map={map} actions={actions} >
        {({ content, activeItem, items, counts, toggleOpen, setMenuLocation }) => (
          <div>
            <Header toggle={toggleOpen} />
            <div class='content'>
              <Menu items={items} activeItem={activeItem} counts={counts} onChange={setMenuLocation} />
              { content }
            </div>
          </div>
        )}
      </Consumer>
    )

    return (
      <Consumer map={map} >
        {({ open }) => (
          <div id='app'>
            {open ? widget : icon}
          </div>
        )}
      </Consumer>
    )
  }
}
