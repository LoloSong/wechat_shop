// pages/category/category.js
import regeneratorRuntime from "../../utils/regenerator-runtime.js"
import Category from 'category-model'
const category = new Category()

Page({
  data: {
    categoryData: [],
    categoryProducts: [],
    currentMenuIndex: 0,
    loadedData: {}
  },

  onLoad(options) {
    this._loadData()
  },

  async _loadData() {
    let categoryData = await category.getCategoryType()
    let categoryProducts = await category.getProductsByCategory(categoryData.data[0].id)

    categoryProducts = {
      products: categoryProducts.data,
      topImgUrl: categoryData.data[0].img.url,
      title: categoryData.data[0].name
    }
    this.setData({
      categoryData: categoryData.data,
      categoryProducts: categoryProducts,
    })
    this.data.loadedData[0] = categoryProducts
  },

  isLoadedData (index) {
    console.log(123)
    if (this.data.loadedData[index]) {
      return true
    }
    return false
  },

  async changeCategoty (event) {
    let index = category.getDataSet(event, 'index')
    let id = category.getDataSet(event, 'id')
    if (!this.isLoadedData(index)) {
      let categoryProducts = await category.getProductsByCategory(id)
      categoryProducts = {
        products: categoryProducts.data,
        topImgUrl: this.data.categoryData[index].img.url,
        title: this.data.categoryData[index].name
      }
      this.setData({
        categoryProducts: categoryProducts,
        currentMenuIndex: index
      })
      this.data.loadedData[index] = categoryProducts
    } else {
      this.setData({
        categoryProducts: this.data.loadedData[index],
        currentMenuIndex: index
      })
    }
    
  }
})