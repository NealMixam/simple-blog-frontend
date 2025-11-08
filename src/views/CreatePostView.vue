<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

export default {
    name: 'CreatePostView',
    components: {
        Card,
        InputText,
        Textarea,
        Button,
        Toast
    },
    setup() {
        const router = useRouter()
        const postsStore = usePostsStore()
        const toast = useToast()

        const loading = ref(false)
        const form = reactive({
            title: '',
            content: ''
        })
        const errors = reactive({})

        const validateForm = () => {
            const newErrors = {}

            if (!form.title.trim()) {
                newErrors.title = 'Title is required'
            } else if (form.title.length < 3) {
                newErrors.title = 'Title must be at least 3 characters'
            }

            if (!form.content.trim()) {
                newErrors.content = 'Content is required'
            } else if (form.content.length < 10) {
                newErrors.content = 'Content must be at least 10 characters'
            }

            Object.assign(errors, newErrors)
            return Object.keys(newErrors).length === 0
        }

        const handleSubmit = async () => {
            if (!validateForm()) return

            loading.value = true
            const result = await postsStore.createPost(form)
            loading.value = false

            if (result.success) {
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Post created successfully!',
                    life: 3000
                })
                router.push('/posts')
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
            form,
            errors,
            loading,
            handleSubmit
        }
    }
}
</script>

<template>
    <div class="create-post">
        <Card>
            <template #title>Create New Post</template>
            <template #content>
                <form @submit.prevent="handleSubmit" class="post-form">
                    <div class="field">
                        <label for="title">Title</label>
                        <InputText id="title" v-model="form.title" placeholder="Enter post title"
                            :class="{ 'p-invalid': errors.title }" />
                        <small class="p-error" v-if="errors.title">{{ errors.title }}</small>
                    </div>

                    <div class="field">
                        <label for="content">Content</label>
                        <Textarea id="content" v-model="form.content" placeholder="Write your post content..." rows="10"
                            autoResize :class="{ 'p-invalid': errors.content }" />
                        <small class="p-error" v-if="errors.content">{{ errors.content }}</small>
                    </div>

                    <div class="form-actions">
                        <Button label="Cancel" icon="pi pi-times" text @click="$router.back()" />
                        <Button type="submit" label="Create Post" icon="pi pi-check" :loading="loading" />
                    </div>
                </form>
            </template>
        </Card>

        <Toast />
    </div>
</template>

<style scoped>
.create-post {
    max-width: 800px;
    margin: 0 auto;
}

.post-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.field label {
    font-weight: 600;
    color: #374151;
}

.form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
}
</style>