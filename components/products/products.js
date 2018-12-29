// components/products/products.js
Component({
  properties: {
    products: {
      type: Array,
    }
  },
  methods: {
    onProductsItemTap (event) {
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: `../../pages/product/product?id=${id}`,
      })
    }
  },
})