import { defineStore } from 'pinia'
import storage from '@/utils/storage'

export interface UserState {
  userId: string
  token: string
  username: string
  role: string
}

const useUserStore = defineStore('userStore', {
  state: (): Partial<UserState> => ({
    userId: '',
    token: '',
    username: '',
    role: ''
  }),
  actions: {
    setToken(token: string) {
      this.$state.token = token
    },
    setUserId(id: string) {
      this.$state.userId = id
    },
    setUsername(name: string) {
      this.$state.username = name
    },
    setRole(role: string) {
      this.$state.role = role
    }
  }
})

// create
const instance = useUserStore()

instance.$subscribe((mutation, state) => {
  storage.setItem(instance.$id, state)
})

// init
instance
