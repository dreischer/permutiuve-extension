function saveOptions () {
  window.chrome.storage.sync.set({
    devMode: document.querySelector('.devMode').checked,
    appURL: document.querySelector('.appURL').value
  }, function () {
    var status = document.getElementById('saveStatus')
    status.textContent = 'Options saved'
    window.setTimeout(function () {
      status.textContent = ''
    }, 750)
  })
}

function loadOptions () {
  // default values below
  window.chrome.storage.sync.get({
    devMode: false,
    appURL: 'https://localhost:9000/dist/app.js'
  }, function (settings) {
    document.querySelector('.devMode').checked = settings.devMode
    document.querySelector('.appURL').value = settings.appURL
  })
}

document.addEventListener('DOMContentLoaded', loadOptions)
document.getElementById('saveOptions').addEventListener('click', saveOptions)
