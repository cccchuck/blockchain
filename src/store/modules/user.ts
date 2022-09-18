import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state() {
    return {
      address: '',
      chainID: 0,
    }
  },

  getters: {
    addr(state) {
      if (state.address) {
        return state.address.slice(-6).toUpperCase()
      } else {
        return state.address
      }
    },
  },

  actions: {
    login(_address: string) {
      localStorage.setItem('address', _address)
      this.address = _address
    },

    logout() {
      localStorage.removeItem('address')
      this.address = ''
    },
  },
})

export default useUserStore
