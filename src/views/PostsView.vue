<template>
    <div class="posts-view">
        <div class="posts-header">
            <h1>My Posts</h1>
            <Button label="Create New Post" icon="pi pi-plus" @click="goToCreatePost" />
        </div>

        <ProgressSpinner v-if="loading && userPosts.length === 0" />

        <div v-else-if="userPosts.length === 0" class="empty-state">
            <i class="pi pi-inbox" style="font-size: 4rem; color: #9ca3af;"></i>
            <h3>No posts yet</h3>
            <p>Start sharing your thoughts with the world</p>
            <Button label="Create Your First Post" icon="pi pi-plus" @click="goToCreatePost" />
        </div>

        <div v-else class="posts-grid">
            <Card v-for="post in userPosts" :key="post.id" class="post-card">
                <template #title>{{ post.title }}</template>
                <template #subtitle>
                    <div class="post-meta">
                        <span>Created: {{ formatDate(post.created_at) }}</span>
                        <span v-if="post.updated_at !== post.created_at">
                            • Updated: {{ formatDate(post.updated_at) }}
                        </span>
                    </div>
                </template>
                <template #content>
                    <p class="post-content">{{ post.content }}</p>
                </template>
                <template #footer>
                    <div class="post-actions">
                        <Button label="Edit" icon="pi pi-pencil" text @click="editPost(post.id)" />
                        <Button label="Delete" icon="pi pi-trash" text severity="danger" @click="confirmDelete(post)" />
                    </div>
                </template>
            </Card>
        </div>

        <ConfirmDialog />
        <Toast />
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router' // Добавляем импорт
import { usePostsStore } from '@/stores/posts'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'

export default {
    name: 'PostsView',
    components: {
        Card,
        Button,
        ProgressSpinner,
        ConfirmDialog,
        Toast
    },
    setup() {
        const router = useRouter() // Создаем экземпляр
        const postsStore = usePostsStore()
        const confirm = useConfirm()
        const toast = useToast()

        const loading = ref(false)

        onMounted(async () => {
            loading.value = true
            await postsStore.fetchUserPosts()
            loading.value = false
        })

        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        }

        const editPost = (postId) => {
            router.push(`/posts/${postId}/edit`)
        }

        const goToCreatePost = () => {
            router.push('/posts/create')
        }

        const confirmDelete = (post) => {
            confirm.require({
                message: `Are you sure you want to delete "${post.title}"?`,
                header: 'Confirm Deletion',
                icon: 'pi pi-exclamation-triangle',
                accept: () => deletePost(post.id)
            })
        }

        const deletePost = async (postId) => {
            const result = await postsStore.deletePost(postId)
            if (result.success) {
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Post deleted successfully',
                    life: 3000
                })
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: result.message,
                    life: 5000
                })
            }
        }

        return {
            userPosts: postsStore.userPosts,
            loading,
            formatDate,
            editPost,
            goToCreatePost,
            confirmDelete
        }
    }
}
</script>