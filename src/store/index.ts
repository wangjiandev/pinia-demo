import { defineStore } from 'pinia'

// 定义并导出容器
// defineStore方法的第一个参数为ID，必须唯一，将来pinia会把所有的容器都挂载到store上，id就是名字
// 返回值useMainStore是一个函数，调用得到容器实例
export const useMainStore = defineStore('main', {
  // 状态定义，用来存储全局状态，类似组件的data
  // 必须是函数：这里是为了防止在服务端渲染时不同的交叉请求导致的状态污染，其实客户端渲染不需要是函数，但是统一规定为函数
  // 必须是箭头函数: 为了更好的TS类型检查推导
  state: () => {
    return {
      counter: 100,
      foo: 'foo',
      arr: [1, 2, 3]
    }
  },
  // 用来封装计算属性，有缓存的功能，类似组件的computed
  getters: {},
  // 用来封装操作方法，类似组件的methods
  actions: {
    // 不能使用箭头函数定义action，因为箭头函数会把this绑定到定义时所在的作用域，而不是action所在的作用域
    changeState(num: number) {
      // this.counter += num
      // this.foo = 'bar'
      // this.arr.push(4)
      // actions 的方法中批量修改也是建议使用$patch
      this.$patch(state => {
        state.counter += num
        state.foo = 'bar'
        state.arr.push(4)
      })
    }
  }
})
