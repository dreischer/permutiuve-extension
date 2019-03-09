import React, { Component } from 'preact'
import './Menu.css'

export default class Menu extends Component {
  render (props, state) {
    const items = props.items.map(item => {
      const isActive = props.activeItem === item.id ? 'menu-active' : ''
      const name = item.count ? item.name + ` (${item.count})` : item.name

      return <a className={isActive} onClick={() => props.onChange(item.id)}>{name}</a>
    })
    return (
      <div className='menu'>
        { items }
      </div>
    )
  }
}
