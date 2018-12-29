// components/category/category.js
Component({
  properties: {
    categoryInfo: {
      type: Object
    }
  },
  methods: {
    onProductsItemTap(event) {
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: `../../pages/product/product?id=${id}`,
      })
    }
  }
})
