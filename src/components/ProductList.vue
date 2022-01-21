<template>
  <ul>
    <li v-for="item in productStore.all">
      {{ item.title }} - {{ item.price }}
      <br />
      <button :disabled="!item.inventory" @click="cartStore.addProduct(item)">
        添加到购物车
      </button>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { useCartStore } from '../store/cart'
import { useProductStore } from '../store/product'

const productStore = useProductStore()
const cartStore = useCartStore()

// 加载全部商品列表
productStore.loadAllProducts()
</script>
<style></style>
