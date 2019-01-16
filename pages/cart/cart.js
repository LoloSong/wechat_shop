// pages/cart/cart.js
import Cart from 'cart-model.js'
const cart = new Cart()

Page({
  data: {
    cartData: [],
    selectedCounts: 0,
    selectedTypeCounts: 0,
    account: 0
  },

  onLoad: function(options) {

  },

  onShow() {
    let cartData = cart.getCartDataFromLocal()
    // let countsInfo = cart.getCartTotalCounts(true)
    let calc = this._calcTotalAccountAndCounts(cartData)
    this.setData({
      cartData: cartData,
      selectedCounts: calc.selectedCounts,
      selectedTypeCounts: calc.selectedTypeCounts,
      account: calc.account
    })
  },

  onHide() {
    cart.execSetStorageSync(this.data.cartData)
  },

  toggleSelect(event) {
    let id = cart.getDataSet(event, 'id')
    let status = cart.getDataSet(event, 'status')
    let index = this._getProductIndexById(id)
    this.data.cartData[index].selectStatus = !status
    this._resetCartData()
  },

  toggleSelectAll(event) {
    let status = cart.getDataSet(event, 'status') === 'true'
    let data = this.data.cartData
    let len = data.length
    for (let i = 0; i < len; i++) {
      data[i].selectStatus = !status
    }
    this._resetCartData()
  },

  changeCounts(event) {
    let id = cart.getDataSet(event, 'id')
    let type = cart.getDataSet(event, 'type')
    let index = this._getProductIndexById(id)
    let counts = 1
    if (type === 'add') {
      cart.addCounts(id)
    } else {
      counts = -1
      cart.cutCounts(id)
    }
    this.data.cartData[index].counts += counts
    this._resetCartData()
  },

  delete(event) {
    let id = cart.getDataSet(event, 'id')
    let index = this._getProductIndexById(id)
    this.data.cartData.splice(index, 1)
    this._resetCartData()
    cart.delete(id)
  },

  submitOrder () {
    wx.navigateTo({
      url: `../order/order?account=${this.data.account}&from=cart`
    })
  },

  _calcTotalAccountAndCounts(data) {
    let len = data.length
    // 选中商品的总价
    let account = 0
    // 选中商品的总个数
    let selectedCounts = 0
    // 选中商品种类的个数
    let selectedTypeCounts = 0
    let multiple = 100

    for (let i = 0; i < len; i++) {
      if (data[i].selectStatus) {
        account += data[i].counts * multiple * Number(data[i].price) * multiple
        selectedCounts += data[i].counts
        selectedTypeCounts++
      }
    }
    return {
      selectedCounts: selectedCounts,
      selectedTypeCounts: selectedTypeCounts,
      account: account / (multiple * multiple)
    }
  },

  // 根据商品id得到商品所在下标
  _getProductIndexById(id) {
    let data = this.data.cartData
    let len = data.length
    for (let i = 0; i < len; i++) {
      if (data[i].id === id) {
        return i
      }
    }
  },

  _resetCartData() {
    // 重新计算总金额数量
    let newData = this._calcTotalAccountAndCounts(this.data.cartData)
    this.setData({
      cartData: this.data.cartData,
      selectedCounts: newData.selectedCounts,
      selectedTypeCounts: newData.selectedTypeCounts,
      account: newData.account
    })
  }
})