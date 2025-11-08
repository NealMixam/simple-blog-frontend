import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  const setAuth = (userData, authToken) => {
    user.value = userData
    token.value = authToken
    localStorage.setItem('token', authToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  }

  const clearAuth = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }

  const checkAuth = async () => {
    if (!token.value) return false

    try {
      const response = await api.get('/auth/me')
      user.value = response.data.data.user
      return true
    } catch (error) {
      console.error('Auth check failed:', error)
      clearAuth()
      return false
    }
  }

  const login = async (credentials) => {
    try {
      console.log('Sending login request to backend...', credentials)
      const response = await api.post('/auth/login', credentials)
      console.log('Backend response:', response.data)

      const { user: userData, token: authToken } = response.data.data

      setAuth(userData, authToken)
      return { success: true }
    } catch (error) {
      console.error('Login API error:', error)
      console.error('Error response:', error.response)

      let message = 'Login failed'

      if (error.response) {
        message = error.response.data?.message || `Server error: ${error.response.status}`
      } else if (error.request) {
        message = 'No response from server. Check if backend is running.'
      } else {
        message = error.message
      }

      return {
        success: false,
        message,
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      const { user: newUser, token: authToken } = response.data.data

      setAuth(newUser, authToken)
      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      }
    }
  }

  const logout = () => {
    clearAuth()
  }

  if (token.value) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  return {
    user,
    token,
    isAuthenticated,
    currentUser,
    login,
    register,
    logout,
    checkAuth,
    clearAuth,
  }
})
