import { OPEN_KEY, OPEN_CLASSNAME } from './constants'

  ;(function initPermutiveIframe () {
  addCss(`
    .prtv_viewer {
      display: none;
      position: fixed;
      bottom: 15px;
      right: 15px;
      z-index: 99999999;
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

  addIframe()

  function addCss (str) {
    var node = document.createElement('style')
    node.innerHTML = str
    document.head.appendChild(node)
  }

  function addIframe (content, className) {
    var iframe = document.createElement('iframe')
    var active = JSON.parse(window.localStorage[OPEN_KEY] || 'true')
    var activeClass = active ? OPEN_CLASSNAME : ''
    iframe.className = `prtv_viewer ${activeClass}`
    document.body.appendChild(iframe)

    var context = (iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument)
    var doc = context.document
    var appUrl = 'https://localhost:9000/dist/app.js' || window.chrome.runtime.getURL('./dist/app.js')

    doc.open()
    // TODO can we write the script as inline JS?
    doc.write(`<script src="${appUrl}" crossorigin="anonymous"></script>`)
    doc.close()
  }
})()
