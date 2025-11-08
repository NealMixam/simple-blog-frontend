<template>
    <div class="home">
        <div class="hero-section">
            <h1>Welcome to {{ appTitle }}</h1>
            <p class="hero-subtitle">Share your thoughts and ideas with the world</p>

            <div class="hero-actions" v-if="!isAuthenticated">
                <Button label="Get Started" icon="pi pi-user-plus" @click="$router.push('/register')" size="large" />
                <Button label="Login" icon="pi pi-sign-in" text @click="$router.push('/login')" size="large" />
            </div>

            <div class="hero-actions" v-else>
                <Button label="Create Post" icon="pi pi-plus" @click="$router.push('/posts/create')" size="large" />
                <Button label="View Posts" icon="pi pi-book" text @click="$router.push('/posts')" size="large" />
            </div>
        </div>

        <div class="recent-posts" v-if="posts.length > 0">
            <h2>Recent Posts</h2>
            <div class="posts-grid">
                <Card v-for="post in posts.slice(0, 6)" :key="post.id" class="post-card">
                    <template #title>{{ post.title }}</template>
                    <template #subtitle>By {{ post.username }}</template>
                    <template #content>
                        <p class="post-content">{{ truncateContent(post.content) }}</p>
                    </template>
                    <template #footer>
                        <small class="post-date">
                            {{ formatDate(post.created_at) }}
                        </small>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { useAuthStore } from '@/stores/auth' // Добавляем импорт
import Card from 'primevue/card'
import Button from 'primevue/button'

export default {
    name: 'HomeView',
    components: {
        Card,
        Button
    },
    setup() {
        const postsStore = usePostsStore()
        const authStore = useAuthStore() // Создаем экземпляр
        const appTitle = import.meta.env.VITE_APP_TITLE || 'My Blog'

        onMounted(async () => {
            await postsStore.fetchAllPosts()
        })

        const truncateContent = (content) => {
            return content.length > 150 ? content.substring(0, 150) + '...' : content
        }

        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString()
        }

        return {
            appTitle,
            posts: computed(() => postsStore.posts),
            isAuthenticated: computed(() => authStore.isAuthenticated), // Используем экземпляр
            truncateContent,
            formatDate
        }
    }
}
</script>

<style scoped>
.home {
    max-width: 1200px;
    margin: 0 auto;
}

.hero-section {
    text-align: center;
    padding: 4rem 0;
    background: white;
    border-radius: 12px;
    margin-bottom: 3rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hero-section h1 {
    font-size: 3rem;
    color: #2c3e50;
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin-bottom: 2rem;
}

.hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.recent-posts {
    margin-top: 3rem;
}

.recent-posts h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #2c3e50;
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
}

.post-card {
    transition: transform 0.3s, box-shadow 0.3s;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.post-content {
    color: #5a6c7d;
    line-height: 1.6;
}

.post-date {
    color: #95a5a6;
}
</style>