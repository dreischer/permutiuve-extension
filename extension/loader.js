const OPEN_KEY = '_prmtv_widgetOpen'
const OPEN_CLASSNAME = 'prmtv_active'
const CDN_APP_URL = '../dist/app.js'

;(function initPermutiveIframe () {
  addCss(`
    .prtv_viewer {
      display: none;
      position: fixed;
      bottom: 15px;
      right: 15px;
      z-index: 9999999999;
      border: none;
      height: 65px;
      width: 65px;
    }
    .prtv_viewer.${OPEN_CLASSNAME} {
      top: 0;
      right: 0;
      height: 100vh;
      width: 610px;
      box-shadow: 0 0px 2px rgba(0, 0, 0, 0.4);
    }
  `)

  window.chrome.storage.sync.get(['devMode', 'appURL'], function (result) {
    var appURL = result.devMode ? result.appURL : CDN_APP_URL
    addIframe(appURL)
  })

  function addCss (str) {
    var node = document.createElement('style')
    node.innerHTML = str
    document.head.appendChild(node)
  }

  function addIframe (source) {
    var iframe = document.createElement('iframe')
    var active = JSON.parse(window.localStorage[OPEN_KEY] || 'false')
    var activeClass = active ? OPEN_CLASSNAME : ''
    iframe.className = `prtv_viewer ${activeClass}`
    document.body.appendChild(iframe)

    var context = (iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument)
    var doc = context.document

    doc.open()
    doc.write(`<script src="${source}" crossorigin="anonymous"></script>`)
    doc.close()
  }
})()
