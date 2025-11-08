<template>
    <nav class="navbar">
        <div class="nav-container">
            <router-link to="/" class="nav-brand">
                <i class="pi pi-book" style="font-size: 1.5rem"></i>
                <span>{{ appTitle }}</span>
            </router-link>

            <div class="nav-links">
                <router-link to="/" class="nav-link">Home</router-link>

                <template v-if="isAuthenticated">
                    <router-link to="/posts" class="nav-link">My Posts</router-link>
                    <router-link to="/posts/create" class="nav-link">
                        <i class="pi pi-plus"></i> New Post
                    </router-link>
                    <div class="user-menu">
                        <span v-if="currentUser">Welcome, {{ currentUser.username }}</span>
                        <Button label="Logout" icon="pi pi-sign-out" text severity="secondary" @click="handleLogout" />
                    </div>
                </template>

                <template v-else>
                    <router-link to="/login" class="nav-link">Login</router-link>
                    <router-link to="/register" class="nav-link">Register</router-link>
                </template>
            </div>
        </div>
    </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Button from 'primevue/button'

export default {
    name: 'Navbar',
    components: {
        Button
    },
    setup() {
        const authStore = useAuthStore()
        const router = useRouter()

        const appTitle = import.meta.env.VITE_APP_TITLE || 'My Blog'

        const isAuthenticated = computed(() => authStore.isAuthenticated)
        const currentUser = computed(() => authStore.currentUser)

        const handleLogout = () => {
            authStore.logout()
            router.push('/')
        }

        return {
            appTitle,
            isAuthenticated,
            currentUser,
            handleLogout
        }
    }
}
</script>

<style scoped>
.navbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: background-color 0.3s;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.user-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
}
</style>