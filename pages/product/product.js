// pages/porduct/product.js
import regeneratorRuntime from "../../utils/regenerator-runtime.js"
import Product from 'product-model'
import Cart from '../cart/cart-model.js'
const product = new Product()
const cart = new Cart()

Page({
  data: {
    id: 0,
    product: null,
    productCounts: 1,
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    currentTabsIndex: 0,
    cartTotalCounts: 0
  }, 

  onLoad (options) {
    this.data.id = options.id
    this._loadData()
  },

  async _loadData () {
    let productDetail = await product.getDetailInfo(this.data.id)
    this.setData({
      product: productDetail.data,
      cartTotalCounts: cart.getCartTotalCounts()
    })
  },

  bindPickerChange (event) {
    let index = event.detail.value
    let selectedCount = this.data.countsArray[index]
    this.setData({
      productCounts: selectedCount
    })
  },

  onTabsItemTap (event) {
    let index = product.getDataSet(event, 'index')
    this.setData({
      currentTabsIndex: index
    })
  },

  onAddingToCartTap () {
    var tempObj = {}
    var keys = ['id', 'name', 'main_img_url', 'price']

    for (let key in this.data.product) {
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.data.product[key]
      }
    }
    cart.add(tempObj, this.data.productCounts)
  }
})