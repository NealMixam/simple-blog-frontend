<template>
    <div class="login-page">
        <Card class="login-card">
            <template #title>Login</template>

            <template #content>
                <div class="p-fluid">
                    <div class="p-field">
                        <label for="email">Email</label>
                        <InputText id="email" v-model="form.email" />
                    </div>

                    <div class="p-field">
                        <label for="password">Password</label>
                        <Password id="password" v-model="form.password" toggleMask />
                    </div>
                </div>
            </template>

            <template #footer>
                <!-- ВАЖНО: type="button" -->
                <Button label="Login" type="button" :loading="loading" @click="handleLoginAction"
                    class="p-button-primary" />
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const form = ref({
    email: '',
    password: ''
})
const loading = ref(false)

const handleLoginAction = async () => {
    console.log('=== LOGIN START ===')
    loading.value = true

    try {
        const result = await authStore.login(form.value)
        console.log('Login result:', result)

        if (result.success) {
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Login successful!',
                life: 3000
            })
            setTimeout(() => router.push('/posts'), 1500)
        } else {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: result.message || 'Invalid email or password',
                life: 4000
            })
        }
    } catch (err) {
        console.error('Login error:', err)
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Server error occurred',
            life: 4000
        })
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 80px);
}

.login-card {
    width: 400px;
}
</style>
