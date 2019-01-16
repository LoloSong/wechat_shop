import Base from 'Base'
import Config from 'Config'
import regeneratorRuntime from 'regenerator-runtime.js'

export default class Address extends Base {
  constructor() {
    super()
    this.name = ''
    this.mobile = ''
    this.province = ''
    this.city = ''
    this.country = ''
    this.detail = ''
  }

  async setAddressInfo() {
    let wxInfo = await this._getWxAddress()
    return this.formatAddress(wxInfo)
  }

  formatAddress(addressInfo) {
    this.name = addressInfo.userName || addressInfo.name
    this.mobile = addressInfo.telNumber || addressInfo.mobile
    this.province = addressInfo.provinceName || addressInfo.province
    this.city = addressInfo.cityName || addressInfo.city
    this.country = addressInfo.countyName || addressInfo.country
    this.detail = addressInfo.detailInfo || addressInfo.detail
    let totalDetail = this.city + this.country + this.detail
    if (!this._isCenterCity(this.province)) {
      totalDetail = this.province + totalDetail
    }
    return {
      name: this.name,
      mobile: this.mobile,
      totalDetail
    }
  }

  async getAddress () {
    let data = await this.request({
      url: '/address',
      method: 'GET',
    })
    data.data = this.formatAddress(data.data)
    return data.data
  }

  async submitAddress(address) {
    let data = await this.request({
      url: '/address',
      method: 'POST',
      data: {
        name: this.name,
        province: this.province,
        city: this.city,
        country: this.country,
        mobile: this.mobile,
        detail: this.detail
      },
    })
    return data
  }

  _getWxAddress () {
    return new Promise((resolve) => {
      wx.chooseAddress({
        success(res) {
          resolve(res)
        }
      })
    })
  }

  // 是否为直辖市
  _isCenterCity (name) {
    let centerCitys = ['北京市', '天津市', '上海市', '重庆市']
    let flag = centerCitys.indexOf(name) >= 0
    return flag
  }
}