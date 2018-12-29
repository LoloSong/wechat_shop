// pages/home/home.js
import regeneratorRuntime from "../../utils/regenerator-runtime.js"
import Home from 'home-model'
const home = new Home()

Page({
  data: {
    bannerArr: [],
    themeArr: [],
    productsArr: []
  },

  onLoad () {
    this._loadData()
  },

  async _loadData () {
    let banner = await home.getBannerData()
    let theme = await home.getThemeData()
    let products = await home.getProductsData()

    this.setData({
      bannerArr: banner.data.items,
      themeArr: theme.data,
      productsArr: products.data
    })
  },

  onProductsItemTap (event) {
    let id = home.getDataSet(event, 'id')
    wx.navigateTo({
      url: `../product/product?id=${id}`,
    })
  },

  onThemesItemTap (event) {
    let id = home.getDataSet(event, 'id')
    let name = home.getDataSet(event, 'name')
    wx.navigateTo({
      url: `../theme/theme?id=${id}&name=${name}`,
    })
  },

})