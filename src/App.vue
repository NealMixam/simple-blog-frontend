<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
}

.main-content {
  min-height: calc(100vh - 80px);
  padding: 2rem;
}

/* Убираем стандартные стили для кнопок */
button {
  border: none;
  background: none;
  cursor: pointer;
}

/* Убираем outline для всех элементов */
*:focus {
  outline: none;
}
</style>
<!-- <template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
}

.main-content {
  min-height: calc(100vh - 80px);
  padding: 2rem;
}
</style> -->