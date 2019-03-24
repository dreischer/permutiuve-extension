import React from 'preact'
import App from './App'

let root

document.addEventListener('DOMContentLoaded', function (event) {
  if (window.parent.permutive) {
    window.frameElement.style.display = 'block'
    render()
  }
})

function render () {
  root = React.render(<App />, document.body, root)
}

if (module.hot) {
  require('preact/devtools')
  module.hot.accept('./App', render)
}
