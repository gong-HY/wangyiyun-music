import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const cookie = ref('')
  cookie.value = document.cookie
  watch(
    cookie,
    newCookie => {
      document.cookie = newCookie
    },
    { immediate: true }
  )
  const isLogin = computed(() => cookie.value !== '')
  return { isLogin, cookie }
})
