import Config from 'Config'

export default class Base {
  constructor() {
    this.baseRequestUrl = Config.restUrl
  }

  request (params) {
    return new Promise((resolve, reject) => {
      if (!params.method) {
        params.method = 'GET'
      }
      wx.request({
        url: this.baseRequestUrl + params.url,
        method: params.method,
        data: params.data,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success (res) {
          resolve(res.data)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }

  // 获得元素上绑定的值
  getDataSet(event, key) {
    return event.currentTarget.dataset[key]
  }
}