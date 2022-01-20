<template>
  <p>{{ mainStore.counter }}</p>
  <p>{{ mainStore.foo }}</p>
  <p>{{ mainStore.arr }}</p>
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
  // 方式一：数据修改最简单的方式
  // mainStore.counter++
  // 方式二：修改多个数据建议使用$patch方法,批量更新，因为这个方法修改多个变量不会多次重新渲染页面
  // mainStore.$patch({
  //   counter: mainStore.counter + 1,
  //   foo: 'bar',
  //   arr: [...mainStore.arr, 4]
  // })
  // 多个值更新推荐使用
  // 方式三：$patch方法可以传入方法，并携带state参数
  // mainStore.$patch(state => {
  //   state.counter++
  //   state.foo = 'bar'
  //   state.arr.push(4)
  // })
  // 方式四：直接将业务逻辑放在actions方法中,只是对方式三的封装
  // mainStore.changeState()
  // actions 传值
  mainStore.changeState(10)
}
</script>
