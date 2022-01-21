export interface IProduct {
  id: number
  title: string
  price: number
  inventory: number //库存模拟只考虑单机版
}

const _products: IProduct[] = [
  { id: 1, title: 'iphone', price: 100.99, inventory: 3 },
  { id: 2, title: 'mac', price: 200.02, inventory: 2 },
  { id: 3, title: 'ipad', price: 300.01, inventory: 3 }
]

export const getProducts = async () => {
  await wait(100)
  return _products
}

export const buyProduct = async () => {
  await wait(100)
  return Math.random() > 0.5
}

async function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}
