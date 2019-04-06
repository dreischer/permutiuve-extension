import React, { Component } from 'preact'
import { Consumer } from 'tiny-atom/preact'

import Header from '../components/Header'
import Icon from '../components/Icon'
import Menu from '../components/Menu'

export default class Wrapper extends Component {
  componentDidMount () {
    const { atom } = this.props
    atom.actions.updateSegments()
    window.parent.addEventListener('message', atom.actions.addDfp)
    const allEvents = window.parent.permutive.on(/.*/, atom.actions.addEvent).replay()
    const segmentEvents = window.parent.permutive.on(/Segment(Entry|Exit)/, atom.actions.updateSegments)
    window.eventListeners = window.eventListeners || []
    window.eventListeners = [allEvents, segmentEvents]
  }
  componentWillUnmount () {
    const { atom } = this.props
    window.eventListeners.forEach(listener => listener.remove())
    window.parent.removeEventListener('message', atom.actions.addDfp)
  }
  render (props, state) {
    const map = function (state) {
      const { open, navigation, data } = state
      return {
        open,
        content: navigation.items.find(item => item.id === navigation.activeItem).component,
        activeItem: navigation.activeItem,
        items: navigation.items,
        counts: {
          events: data.events.count,
          segments: data.segments.count,
          googleAM: data.googleAM.count
        }
      }
    }
    const actions = ['toggleOpen', 'setMenuLocation']

    const icon = (
      <Consumer map={map} actions={actions} >
        {({ counts, toggleOpen }) => (
          <Icon counts={counts} toggle={toggleOpen} />
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
