import { defineStore } from 'pinia'
import { getProducts, IProduct } from './../api/shop'

export const useProductStore = defineStore('product', {
  state: () => {
    return {
      all: [] as IProduct[] //所有商品
    }
  },
  getters: {},
  actions: {
    async loadAllProducts() {
      const ret = await getProducts()
      this.all = ret
    },
    decremenInventory(product: IProduct) {
      const item = this.all.find(item => item.id === product.id)
      if (item) {
        item.inventory--
      }
    }
  }
})
