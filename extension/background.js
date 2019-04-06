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
  var icon = active ? 'icon-enabled.png' : 'icon-disabled.png'
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

// injecting content script
window.chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (isActive() && changeInfo.status === 'loading') {
    window.chrome.tabs.executeScript(tabId, {
      file: './loader.js'
    })
  }
})

// sending DFP ad requests to content script
window.chrome.tabs.onCreated.addListener(function (tab) {
  var callback = function (details) {
    window.chrome.tabs.sendMessage(tab.id, {
      name: 'perm_extension_dfpRequest',
      url: details.url
    })
  }
  var filter = {
    urls: ['*://securepubads.g.doubleclick.net/gampad/ads?*', '*://pubads.g.doubleclick.net/gampad/ads?*'],
    tabId: tab.id
  }
  window.chrome.webRequest.onCompleted.addListener(callback, filter)
})
