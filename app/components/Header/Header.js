import React, { Component } from 'preact'
import './Header.css'

export default class Header extends Component {
  render (props, state) {
    return (
      <header className='header'>
        <h1 className='brand-logo'>Permutive</h1>
        <div onClick={props.toggle} class='close'>{'×'}</div>
      </header>
    )
  }
}
