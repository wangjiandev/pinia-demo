<template>
  <p>{{ mainStore.counter }}</p>
  <p>{{ mainStore.foo }}</p>
  <br />
  <p>{{ counter }}</p>
  <p>{{ foo }}</p>
  <br />
  <button @click="handleChangeState">修改数据</button>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store'

const mainStore = useMainStore()

console.log(mainStore.counter)

// 可以直接解构使用，但是不建议这样做，这样会失去响应式，之后再修改页面就不会刷新了
// pinia把state中的所有数据都reactive处理了
// const { counter, foo } = mainStore
// 通过storeToRefs方法可以获取到响应式的数据，解决直接解构没有响应式的问题
const { counter, foo } = storeToRefs(mainStore)

const handleChangeState = () => {
  mainStore.counter++
}
</script>
