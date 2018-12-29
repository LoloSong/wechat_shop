// pages/theme/theme.js
import regeneratorRuntime from "../../utils/regenerator-runtime.js"
import Theme from 'theme-model'
const theme = new Theme()

Page({
  data: {
    id: 0,
    name: '',
    themeData: []
  },

  onLoad (options) {
    this.data.id = options.id
    this.data.name = options.name
    this._loadData()
  },

  onReady () {
    wx.setNavigationBarTitle({
      title: this.data.name
    })
  },

  async _loadData() {
    let themeData = await theme.getProductsData(this.data.id)
    this.setData({
      themeData: themeData.data
    })
  }
})