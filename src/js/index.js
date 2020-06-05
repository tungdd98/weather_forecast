// import SCSS
import '../sass/main.scss'

import TreeID3 from './modules/id3.js'
import DATA from './mocks/tranning.js'
import APP from './modules/app.js'

const demo = new TreeID3(DATA.data, DATA.attrs, DATA.target)
demo.getTree()

window.onload = () => {
  setInterval(() => {
    APP.getDateTime()
  }, 1000);
  APP.init('start', '', demo)
  APP.fn('#id3-search').addEventListener('keyup', () => {
    let value = event.target.value.trim()
    let keyCode = event.keyCode
    if (keyCode === 13) {
      APP.init('', value, demo)
    }
  })
}

