import Base from '../../utils/Base'
import regeneratorRuntime from '../../utils/regenerator-runtime.js'

export default class Theme extends Base {
  constructor () {
    super()
  }
  
  async getProductsData (id) {
    let data = await this.request({
      url: `/theme/${id}`,
      method: 'GET'
    })
    return data
  }
}