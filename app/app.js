import React from 'preact'
import createAtom from 'tiny-atom'
import { Provider, Consumer } from 'tiny-atom/preact'

import Header from './components/Header'
import Icon from './components/Icon'
import Menu from './components/Menu'
import { OPEN_KEY, OPEN_CLASSNAME } from './constants'

import './index.css'

const log = require('tiny-atom/log')
const { initialState, actions } = require('./actions')
const atom = window.atom = createAtom(initialState, actions, { debug: log() })

export default class App extends React.Component {
  toggle () {
    const open = !atom.get().open
    window.localStorage[OPEN_KEY] = open
    if (open) {
      window.frameElement.classList.add(OPEN_CLASSNAME)
    } else {
      window.frameElement.classList.remove(OPEN_CLASSNAME)
    }
    atom.set({ open })
  }
  navigationChange (id) {
    atom.set({
      navigation: {
        ...atom.get().navigation,
        activeItem: id
      }
    })
  }
  componentDidMount () {
    window.parent.permutive.on(/.*/, atom.actions.addEvent).replay()
    atom.actions.updateSegments()
    window.parent.permutive.on(/Segment(Entry|Exit)/, atom.actions.updateSegments)
  }
  render (props, state) {
    const icon = <Icon toggle={this.toggle.bind(this)} />
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
    const widget = (
      <Consumer map={map} >
        {({ content, activeItem, items, counts }) => (
          <div>
            <Header toggle={this.toggle.bind(this)} />
            <div class='content'>
              <Menu items={items} activeItem={activeItem} counts={counts} onChange={this.navigationChange.bind(this)} />
              { content }
            </div>
          </div>
        )}
      </Consumer>
    )

    return (
      <Provider atom={atom}>
        <Consumer map={map} >
          {({ open }) => (
            <div id='app'>
              {open ? widget : icon}
            </div>
          )}
        </Consumer>
      </Provider>
    )
  }
}
