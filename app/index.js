import React from 'preact'
import App from './App'

window.React = React

document.addEventListener('DOMContentLoaded', function (event) {
  if (window.parent.permutive) {
    render()
  }
})

let root

function render () {
  root = React.render(<App />, document.body, root)
}

// in development, set up HMR:
if (module.hot) {
  require('preact/devtools')
  module.hot.accept('./App', render)
}
