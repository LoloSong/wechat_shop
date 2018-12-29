import Base from '../../utils/Base'
import regeneratorRuntime from '../../utils/regenerator-runtime.js'

export default class Category extends Base {
  constructor() {
    super()
    this._storageKeyName = 'cart'
  }

  /**
   * 加入到购物车
   * 如果之前没有这样的商品, 则直接添加一条新的记录，数量为counts
   * 如果有，则只将相应数量 + count
   * @params item {obj} 商品对象
   * @params counts {int} 商品数目
   */
  add(item, counts) {
    var cartData = this.getCartDataFromLocal()
    var isHasInfo = this._isHasThatOne(item.id, cartData)
    if (isHasInfo.index === -1) {
      item.counts = counts
      item.selectStatus = true
      cartData.push(item)
    } else {
      cartData[isHasInfo.index].counts += counts
    }
    wx.setStorageSync(this._storageKeyName, cartData)
  }

  getCartDataFromLocal() {
    var res = wx.getStorageSync(this._storageKeyName)
    if (!res) {
      return []
    }
    return res
  }

  /**
   * 获取购物车内商品总数量
   */
  getCartTotalCounts () {
    var data = this.getCartDataFromLocal()
    var counts = 0
    for (let i = 0; i < data.length; i++) {
      counts += data[i].counts
    }
    return counts
    
  }

  _isHasThatOne(id, arr) {
    var item
    var result = {
      index: -1
    }
    for (let i = 0; i < arr.length; i++) {
      item = arr[i]
      if (item.id === id) {
        result = {
          index: i,
          data: item
        }
      }
      break
    }
    return result
  }
}