import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  const userPosts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchAllPosts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/posts')
      posts.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch posts'
    } finally {
      loading.value = false
    }
  }

  const fetchUserPosts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/post')
      userPosts.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch your posts'
    } finally {
      loading.value = false
    }
  }

  const createPost = async (postData) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/post', postData)
      userPosts.value.unshift(response.data.data)
      return { success: true, data: response.data.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create post'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updatePost = async (id, postData) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.put(`/post/${id}`, postData)
      const index = userPosts.value.findIndex((post) => post.id === id)
      if (index !== -1) {
        userPosts.value[index] = response.data.data
      }
      return { success: true, data: response.data.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update post'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const deletePost = async (id) => {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/post/${id}`)
      userPosts.value = userPosts.value.filter((post) => post.id !== id)
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete post'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    posts,
    userPosts,
    loading,
    error,
    fetchAllPosts,
    fetchUserPosts,
    createPost,
    updatePost,
    deletePost,
  }
})
