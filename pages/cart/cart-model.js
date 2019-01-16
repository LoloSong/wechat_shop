import Base from '../../utils/Base'

export default class Cart extends Base {
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

  delete (ids) {
    if (!(ids instanceof Array)) {
      ids = [ids]
    }
    let cartData = this.getCartDataFromLocal()
    for (let i = 0; i < ids.length; i++) {
      let hasInfo = this._isHasThatOne(ids[i], cartData)
      if (hasInfo.index != -1) {
        cartData.splice(hasInfo.index, 1)
      }
    }
    wx.setStorageSync(this._storageKeyName, cartData)
  }

  /**
   * 增加商品数目
   */
  addCounts(id) {
    this._changeCounts(id, 1)
  }

  /**
   * 减少商品数目
   */
  cutCounts(id) {
    this._changeCounts(id, -1)
  }

  /**
   * 获取购物车内商品总数量
   * flag true 考虑商品选择状态
   * flag false 忽略商品选择状态，返回所有商品数量
   */
  getCartDataFromLocal(flag) {
    var res = wx.getStorageSync(this._storageKeyName)
    if (!res) {
      return []
    }
    if (flag) {
      let newRes = []
      for (let i = 0; i < res.length; i++) {
        if (res[i].selectStatus) {
          newRes.push(res[i])
        }
      }
      res = newRes
    }
    return res
  }

  /**
   * 获取购物车内商品总数量
   * flag true 考虑商品选择状态
   * flag false 忽略商品选择状态，返回所有商品数量
   */
  getCartTotalCounts (flag) {
    var data = this.getCartDataFromLocal()
    var counts = 0
    for (let i = 0; i < data.length; i++) {
      if (flag) {
        if (data[i].selectStatus) {
          counts += data[i].counts
        }
      } else {
        counts += data[i].counts
      }
    }
    return counts
  }

  execSetStorageSync (data) {
    wx.setStorageSync(this._storageKeyName, data)
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
        break
      }
    }
    return result
  }

  /**
   * 修改商品数目
   * @params id {int} 商品id
   * @params counts {int} 数目
   */
  _changeCounts(id, counts) {
    let cartData = this.getCartDataFromLocal()
    let hasInfo = this._isHasThatOne(id, cartData)
    if (hasInfo.index != -1) {
      if (hasInfo.data.counts > 1) {
        cartData[hasInfo.index].counts += counts
      }
    }
    wx.setStorageSync(this._storageKeyName, cartData)
  }
}