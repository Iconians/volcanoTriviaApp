<script lang="ts">
import { defineComponent } from 'vue'
import { supabase } from '../../supabase.js'
import router from '@/router'
export default defineComponent({
  name: 'forgotPasswordForm',
  data() {
    return {
      formError: ''
    }
  },
  methods: {
    async forgotPassword(event: Event) {
      event.preventDefault()

      const form = event.target as HTMLFormElement
      const password = form.password.value

      try {
        const { data, error } = await supabase.auth.updateUser({
          password: password,
          data: { hello: 'world' }
        })

        if (error) {
          this.formError = error.message
        } else {
          console.log('Password reset successfully', data)
          localStorage.setItem('user', JSON.stringify(data.user))
          router.push('/')
        }
      } catch (error) {
        console.error('Error in forgotPasswordForm method: ', error)
      }
    }
  }
})
</script>

<template>
  <div class="text-wrapper text-white">
    <h1 class="text-2xl">Volcano Quiz</h1>
    <p>Please reset your Password</p>
    <div>
      <form @submit="forgotPassword" class="flex flex-col">
        <!-- <label class="text-xl" for="username">Email</label>
        <input class="rounded-sm text-black" type="email" id="username" name="email" /> -->
        <label class="mt-2 text-xl" for="password">Update Password</label>
        <input class="rounded text-black" type="password" id="password" name="password" />
        <input class="rounded text-xl mt-3 bg-brown-500" type="submit" value="submit" />
      </form>
      <div v-if="formError.length">{{ formError }}</div>
    </div>
  </div>
</template>
