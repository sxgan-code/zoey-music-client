import {defineStore} from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('user', {
    // other options...
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            isMask: false,
            /*自增函数*/
            counter: 0
        }
    },
    actions: {
        /*自增函数*/
        increment() {
            this.counter++
        },
        /* 设置遮罩状态 */
        changeMaskState() {
            this.isMask = !this.isMask
        }
    },
    getters: {
        // 返回全局遮罩状态
        getIsMask: (state) => state.isMask,
    }

})