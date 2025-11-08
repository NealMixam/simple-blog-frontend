<template>
    <div class="auth-container">
        <Card class="auth-card">
            <template #title>Create Your Account</template>
            <template #content>
                <form @submit.prevent="handleRegister" class="auth-form">
                    <div class="field">
                        <label for="username">Username</label>
                        <InputText id="username" v-model="form.username" placeholder="Choose a username"
                            :class="{ 'p-invalid': errors.username }" />
                        <small class="p-error" v-if="errors.username">{{ errors.username }}</small>
                    </div>

                    <div class="field">
                        <label for="email">Email</label>
                        <InputText id="email" v-model="form.email" type="email" placeholder="Enter your email"
                            :class="{ 'p-invalid': errors.email }" />
                        <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
                    </div>

                    <div class="field">
                        <label for="password">Password</label>
                        <Password id="password" v-model="form.password" placeholder="Create a password" toggleMask
                            :class="{ 'p-invalid': errors.password }" />
                        <small class="p-error" v-if="errors.password">{{ errors.password }}</small>
                    </div>

                    <div class="field">
                        <label for="confirmPassword">Confirm Password</label>
                        <Password id="confirmPassword" v-model="form.confirmPassword"
                            placeholder="Confirm your password" :feedback="false" toggleMask
                            :class="{ 'p-invalid': errors.confirmPassword }" />
                        <small class="p-error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</small>
                    </div>

                    <Button type="submit" label="Register" icon="pi pi-user-plus" :loading="loading"
                        class="auth-button" />
                </form>

                <Divider />

                <div class="auth-footer">
                    <p>Already have an account?
                        <router-link to="/login" class="auth-link">Login here</router-link>
                    </p>
                </div>
            </template>
        </Card>

        <Toast />
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Toast from 'primevue/toast'

export default {
    name: 'RegisterView',
    components: {
        Card,
        InputText,
        Password,
        Button,
        Divider,
        Toast
    },
    setup() {
        const router = useRouter()
        const authStore = useAuthStore()
        const toast = useToast()

        const loading = ref(false)
        const form = reactive({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        const errors = reactive({})

        const validateForm = () => {
            const newErrors = {}

            if (!form.username) {
                newErrors.username = 'Username is required'
            } else if (form.username.length < 3) {
                newErrors.username = 'Username must be at least 3 characters'
            }

            if (!form.email) {
                newErrors.email = 'Email is required'
            } else if (!/\S+@\S+\.\S+/.test(form.email)) {
                newErrors.email = 'Email is invalid'
            }

            if (!form.password) {
                newErrors.password = 'Password is required'
            } else if (form.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters'
            }

            if (!form.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password'
            } else if (form.password !== form.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match'
            }

            Object.assign(errors, newErrors)
            return Object.keys(newErrors).length === 0
        }

        const handleRegister = async () => {
            if (!validateForm()) return

            loading.value = true
            const result = await authStore.register({
                username: form.username,
                email: form.email,
                password: form.password
            })
            loading.value = false

            if (result.success) {
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Account created successfully!',
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
            handleRegister
        }
    }
}
</script>

<style scoped>
.auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 2rem;
}

.auth-card {
    width: 100%;
    max-width: 400px;
}

.auth-form {
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

.auth-button {
    width: 100%;
    margin-top: 1rem;
}

.auth-footer {
    text-align: center;
    color: #6b7280;
}

.auth-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 600;
}

.auth-link:hover {
    text-decoration: underline;
}
</style>