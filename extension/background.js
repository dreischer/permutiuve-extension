/*
* content_script doesn't have access to window variables / JS. Therefore
* we use this as an interface to pass on the event to the injected scripts.
* Chrome also doesn't allow customEvents, so we senf off a
* generic event and store the data in LS. The injected script then picks it
* up from there.
*/
window.chrome.browserAction.onClicked.addListener(function (tab) {
  var state = !isActive()
  setActive(state)
  setIcon(state)
})

window.chrome.runtime.onConnect.addListener(function (port) {
  var state = isActive()
  setIcon(state)
})

function setIcon (active) {
  var icon = active ? './img-2.png' : './img.png'
  window.chrome.browserAction.setIcon({
    path: icon
  })
}

function setActive (val) {
  window.localStorage.active = JSON.stringify(val)
}

function isActive () {
  var val = window.localStorage.active || 'true'
  return JSON.parse(val)
}

window.chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (isActive() && changeInfo.status === 'complete') {
    window.chrome.tabs.executeScript(tabId, {
      file: './dist/loader.js'
    })
  }
})
