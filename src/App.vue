<script>
import Navbar from '@/components/Navbar.vue'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'App',
  components: {
    Navbar
  },
  async mounted() {
    const authStore = useAuthStore()
    await authStore.checkAuth()
  }
}
</script>

<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
}

.main-content {
  min-height: calc(100vh - 80px);
  padding: 2rem;
}

button {
  border: none;
  background: none;
  cursor: pointer;
}

*:focus {
  outline: none;
}
</style>