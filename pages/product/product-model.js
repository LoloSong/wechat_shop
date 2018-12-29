import Base from '../../utils/Base'
import regeneratorRuntime from '../../utils/regenerator-runtime.js'

export default class Product extends Base {
  constructor () {
    super()
  }

  async getDetailInfo(id) {
    let data = await this.request({
      url: `/product/${id}`,
      method: 'GET'
    })
    return data
  }
}