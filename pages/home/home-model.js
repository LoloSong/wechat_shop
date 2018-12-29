import Base from '../../utils/Base'
import regeneratorRuntime from '../../utils/regenerator-runtime.js'

export default class Home extends Base {
  constructor() {
    super()
  }

  async getBannerData() {
    let data = await this.request({
      url: '/banner',
      method: 'GET',
      data: { id: 1 },
    })
    return data
  }

  async getThemeData() {
    let data = await this.request({
      url: '/theme',
      method: 'GET'
    })
    return data
  }

  async getProductsData() {
    let data = await this.request({
      url: '/product/recent',
      method: 'GET'
    })
    return data;
  }
}