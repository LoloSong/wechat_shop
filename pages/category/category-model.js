import Base from '../../utils/Base'
import regeneratorRuntime from '../../utils/regenerator-runtime.js'

export default class Category extends Base {
  constructor() {
    super()
  }

  async getCategoryType() {
    let data = await this.request({
      url: '/category/all',
      method: 'GET'
    })
    return data
  }

  async getProductsByCategory(id) {
    let data = await this.request({
      url: '/product/by_category',
      method: 'GET',
      data: {
        id: id
      }
    })
    return data
  }
}