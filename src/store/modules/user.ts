import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {
        username: '',
        avatar: '',
        notice: [],
      },
    }
  },

  getters: {},

  actions: {},
})

export default useUserStore
