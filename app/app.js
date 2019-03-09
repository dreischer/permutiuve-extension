import React from 'preact'

import Header from './components/Header'
import Icon from './components/Icon'
import Menu from './components/Menu'
import { Events, Segments } from './Views'
import { OPEN_KEY, OPEN_CLASSNAME } from '../constants'

import './index.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: JSON.parse(window.localStorage[OPEN_KEY] || 'true'),
      activeItem: 'events',
      items: [
        { name: 'Events', id: 'events', content: <Events /> },
        { name: 'Segments', id: 'segments', content: <Segments /> }
      ]
    }
  }
  toggle () {
    const open = !this.state.open
    window.localStorage[OPEN_KEY] = open
    if (open) {
      window.frameElement.classList.add(OPEN_CLASSNAME)
    } else {
      window.frameElement.classList.remove(OPEN_CLASSNAME)
    }
    this.setState({
      open: open
    })
  }
  navigationChange (id) {
    this.setState({
      activeItem: id
    })
  }
  render (props, state) {
    const icon = <Icon toggle={this.toggle.bind(this)} />
    const content = state.items.find(item => item.id === state.activeItem).content
    const widget = (
      <div>
        <Header toggle={this.toggle.bind(this)} />
        <div class='content'>
          <Menu items={this.state.items} activeItem={state.activeItem} onChange={this.navigationChange.bind(this)} />
          { content }
        </div>
      </div>
    )

    return (
      <div id='app'>
        {state.open ? widget : icon}
      </div>
    )
  }
}
