import { useProductStore } from './product'
import { defineStore } from 'pinia'
import { IProduct, buyProduct } from './../api/shop'

type CartProduct = {
  quantity: number
} & Omit<IProduct, 'inventory'>

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cartProducts: [] as CartProduct[], // 购物车商品列表
      checkoutStatus: null as null | string
    }
  },
  getters: {
    totalPrice(state) {
      return state.cartProducts.reduce((total, product) => {
        return total + product.quantity * product.price
      }, 0)
    }
  },
  actions: {
    // 添加购物车
    addProduct(product: IProduct) {
      // 看商品有没有库存
      if (product.inventory < 1) {
        return
      }
      // 检查购物车中是否已经存在该商品
      const cartItem = this.cartProducts.find(item => item.id === product.id)
      // 如果有让商品的数量+1
      if (cartItem) {
        cartItem.quantity++
      } else {
        // 如果没有则添加新的商品
        this.cartProducts.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1
        })
      }
      // 更新商品库存
      // 不建议直接修改库存,并且实际项目也不可能这么干
      // product.inventory--
      const productStore = useProductStore()
      productStore.decremenInventory(product)
    },
    async checkout() {
      const ret = await buyProduct()
      this.checkoutStatus = ret ? '成功' : '失败'
      if (ret) {
        this.cartProducts = []
      }
    }
  }
})
