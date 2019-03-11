import React, { Component } from 'preact'
import './Menu.css'

export default class Menu extends Component {
  clickHandler (id) {
    return function () {
      this.props.onChange(id)
    }
  }
  getItem (item, counts) {
    const isActive = this.props.activeItem === item.id ? 'menu-active' : ''
    const clickHandler = this.clickHandler(item.id).bind(this)
    const count = counts && counts[item.id] ? ` (${counts[item.id]})` : ''

    return <a className={isActive} onClick={clickHandler}>{item.name + count}</a>
  }
  render (props, state) {
    const items = props.items.map((item) => this.getItem(item, props.counts))

    return (
      <div className='menu'>
        { items }
      </div>
    )
  }
}
