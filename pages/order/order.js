// pages/order/order.js
import regeneratorRuntime from "../../utils/regenerator-runtime.js"
import Cart from '../cart/cart-model.js'
import Address from '../../utils/address-model.js'
const cart = new Cart()
const address = new Address()
Page({
  data: {
    productsArr: [],
    account: 0,
    orderStatus: 0,
    addressInfo: ''
  },

  async onLoad (options) {
    let productsArr = cart.getCartDataFromLocal(true)
    let account = options.account
    let addressInfo = await address.getAddress()
    this._bindAddressInfo(addressInfo)

    this.setData({
      productsArr: productsArr,
      account: account,
      orderStatus: 0
    })
  },

  async editAddress () {
    let addressInfo = await address.setAddressInfo()
    this._bindAddressInfo(addressInfo)
    
    let data = await address.submitAddress()
    if(data.code === 1) {
      this.showTips('操作提示', '地址信息更新失败!')
    }
  },

  showTips (title, content, flag) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success (res) {
        if (flag) {
          wx.switchTab({
            url: '/pages/my/my',
          })
        }
      }
    })
  },

  // 绑定地址信息
  _bindAddressInfo(addressInfo) {
    this.setData({
      addressInfo: addressInfo
    })
  },

  pay () {
    if (!this.data.addressInfo) {
      this.showTips('下单提示', '请填写您的收获地址')
      return;
    }
    if (this.data.orderStatus === 0) {
      this._firstTimePay()
    } else {
      this._oneMoresTimePay()
    }
  }
})