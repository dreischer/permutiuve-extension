[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


# Deployment

* Run `$ make build`
* Upload `dist/app.js` and `dist/app.js.map` to the CDN

TODO:
* Upload app file to a CDN and set it as `CDN_APP_URL` in `extension/loader.js`
* Upload the extension to the Chrome Web Store

---
# Development setup

## Chrome extension
* Open "Extensions" in Google Chrome (chrome://extensions/)
* Enable development mode and click on "Load unpacked"
* Select the `extension` folder from this project:
<img width="1539" alt="Screen Shot 2019-03-10 at 19 45 37" src="https://user-images.githubusercontent.com/5756475/54090554-446cfb80-436d-11e9-991b-3215db68d39b.png">


## Extension Options
* Open the extension and click on "Extension options"
* Tick `Development Mode`
* Set the app URL to `https://localhost:9000/dist/app.js`
<img width="1540" alt="Screen Shot 2019-03-10 at 19 47 41" src="https://user-images.githubusercontent.com/5756475/54090609-ee4c8800-436d-11e9-91bd-6372d5cdbc2b.png">

## Start dev server
* Run `$ make dev`
* Open `https://localhost:9000/dist/app.js` to allow Chrome to allow it as an unsafe resource