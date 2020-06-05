// import CONFIGS
import CONFIGS from '../configs/index.js'
// import IMAGEs
import imgMatMe from '../../assets/weathers/mat-me.png'
import imgClaer from '../../assets/weathers/Clear.png'
import imgLanh from '../../assets/weathers/lanh.png'
import imgMua from '../../assets/weathers/mua.png'
import imgNangNong from '../../assets/weathers/nang-nong.png'

const APP = (function () {
  const APPKEY = "eced4bc43b5ff2260de43f1e7beb9d73"
  const IMAGES = {
    'mat-me': imgMatMe,
    'nang-nong': imgNangNong,
    'lanh': imgLanh,
    'clear': imgClaer,
    'mua': imgMua
  }
  /**
   * Lấy đối tượng
   * @param {*} selector 
   */
  function fn(selector, all = false) {
    return !all ? document.querySelector(selector) : document.querySelectorAll(selector)
  }

  /**
   * Lấy thời gian
   */
  function getDateTime() {
    const today = new Date()
    const arrDay = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
    const hour = today.getHours()
    const minute = today.getMinutes()
    const day = today.getDay()
    const time = `${hour}:${parseInt(minute) < 10 ? `0${minute}` : minute}`
    const date = `${arrDay[day]}, ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

    fn('.w-calendar__time').textContent = time
    fn('.w-calendar__date').textContent = date
  }

  /**
   * Khởi tạo dữ liệu khi bắt đầu load trang
   * @param {*} action 
   * @param {*} val 
   */
  function init(action = null, val = null, ID3) {
    let value = ''
    if (action === 'start') {
      value = fn('#id3-search').value.trim()
    } else {
      value = val
    }
    getApiWeather(value)
      .then(res => {
        if (res.cod === 200) {
          showData(res)
          if (ID3.tree) {
            getForeCastToday(ID3.tree, definedProperty(res))
          }
          console.log(ID3)
        } else {
          alert(res.message)
        }
      })
  }

  /**
   * Lấy dữ liệu thời tiết từ API
   * @param {*} input 
   */
  async function getApiWeather(input) {
    try {
      let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=${APPKEY}`)
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Hiển thị dữ liệu lấy được
   * @param {*} data 
   */
  function showData(data) {
    fn('.w-forecast__location').innerHTML = data.name
    fn('.w-forecast__temp').innerHTML = parseInt(data.main.temp - 273) + "°C"
    fn('.w-forecast__humidity').innerHTML = data.main.humidity + "%"
    fn('.w-forecast__wind').innerHTML = data.wind.speed + "km/h"
    fn('.w-forecast__clouds').innerHTML = data.clouds.all + "%"
  }

  /**
   * Định nghĩa dữ liệu lấy được
   * @param {*} data 
   */
  function definedProperty(data) {
    let temp, humidity, clouds, wind
    let valTemp = parseInt(data.main.temp - 273),
      valHumidity = data.main.humidity,
      valClouds = parseFloat(data.clouds.all),
      valWind = parseFloat(data.wind.speed)

    if (valTemp <= CONFIGS.temp["thấp"].max) temp = "t.thấp"
    else if (valTemp >= CONFIGS.temp["trung bình"].min && valTemp <= CONFIGS.temp["trung bình"].max) temp = "t.trung bình"
    else temp = "t.cao"

    if (valHumidity <= CONFIGS.humidity["thấp"].max) humidity = "d.thấp"
    else if (valHumidity >= CONFIGS.humidity["trung bình"].min && valHumidity <= CONFIGS.humidity["trung bình"].max) humidity = "d.trung bình"
    else humidity = "d.cao"

    if (valClouds >= CONFIGS.clouds["nhiều"].min && valClouds <= CONFIGS.clouds["nhiều"].max) clouds = "nhiều"
    else clouds = "ít"

    if (valWind >= CONFIGS.wind["mạnh"].min) wind = "mạnh"
    else wind = "nhẹ"

    console.log([temp, humidity, clouds, wind])
    return [temp, humidity, clouds, wind]
  }

  /**
   * Dựa vào dữ liệu lấy được -> hiển thị dự báo ngày hôm nay
   * @param {*} tree 
   * @param {*} data 
   * @param {*} depth 
   */
  function getForeCastToday(tree, data) {
    console.log(tree)
    if (tree.n === 0) {
      fn('.w-forecast__outlook').innerHTML = tree.attrs.name
      doWeather(slug(tree.attrs.name))
      fn('.w-forecast__image img').src = IMAGES[slug(tree.attrs.name)]
    } else {
      fn('.w-forecast__outlook').innerHTML = '...'
    }
    for (let i in tree.attrs.value) {
      for (let j in data) {
        if (data[j] === tree.attrs.value[i]) {
          getForeCastToday(tree.childs[i], data)
        }
      }
    }
  }

  /**
   * Hiệu ứng thời tiết
   * @param {*} action 
   */
  function doWeather(action) {
    const actions = ['mua', 'nang-nong', 'mat-me', 'lanh']
    actions.forEach(action => fn(`.w-do-weather .${action}`).style = 'display: none')
    if (actions.includes(action)) {
      fn(`.w-do-weather .${action}`).style = 'display: block'
    } else {
      alert('Kiểu thời tiết chưa được định nghĩa')
    }
  }

  /**
   * Lấy dữ liệu từ ô input dự báo
   */
  function getInputField(ID3) {
    let temp, humidity
    let valTemp = fn('#ip-nhietdo').value.trim() || 0
    let valHumidity = fn('#ip-doam').value.trim() || 0
    let cloud = fn('#sl-may').value
    let wind = fn('#sl-gio').value

    if (valTemp <= CONFIGS.temp["thấp"].max) temp = "t.thấp"
    else if (valTemp >= CONFIGS.temp["trung bình"].min && valTemp <= CONFIGS.temp["trung bình"].max) temp = "t.trung bình"
    else temp = "t.cao"

    if (valHumidity <= CONFIGS.humidity["thấp"].max) humidity = "d.thấp"
    else if (valHumidity >= CONFIGS.humidity["trung bình"].min && valHumidity <= CONFIGS.humidity["trung bình"].max) humidity = "d.trung bình"
    else humidity = "d.cao"

    getForeCastToday(ID3.tree, [temp, humidity, cloud, wind])

    fn('.w-forecast__temp').innerHTML = valTemp + "°C"
    fn('.w-forecast__humidity').innerHTML = valHumidity + "%"
    fn('.w-forecast__wind').innerHTML = cloud
    fn('.w-forecast__clouds').innerHTML = wind
  }

  /**
   * Loại bỏ dấu tiếng Việt
   * @param {*} str 
   */
  function slug(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.toLowerCase();
    str = str
      .replace(/[&]/g, "-and-")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/[-]+/g, "-")
      .replace(/-$/, "");
    return str;
  }

  return Object.freeze({
    fn,
    getDateTime,
    init,
    getApiWeather,
    showData,
    definedProperty,
    getForeCastToday,
    doWeather,
    slug,
    getInputField
  })
})()

export default APP