<script lang="ts">
import { defineComponent } from 'vue'
import { supabase } from '../../supabase.js'
export default defineComponent({
  name: 'resetPasswordForm',
  data() {
    return {
      formError: ''
    }
  },
  methods: {
    async resetPassword(event: Event) {
      event.preventDefault()

      const form = event.target as HTMLFormElement
      const email = form.email.value

      try {
        let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'http://localhost:5173/forgotPasswordPage'
        })
        console.log(data, error)

        if (error) {
          this.formError = error.message
        } else {
          // this.$emit('signedIn', data)
          console.log('Password reset email sent successfully')
        }
      } catch (error) {
        console.error('Error in resetPasswordForm method: ', error)
      }
    }
  }
})
</script>

<template>
  <div class="text-wrapper text-white">
    <h1 class="text-2xl">Volcano Quiz</h1>
    <p>Please enter your Email to reset your Password</p>
    <div>
      <form @submit="resetPassword" class="flex flex-col">
        <label class="text-xl" for="username">Email</label>
        <input class="rounded-sm text-black" type="email" id="username" name="email" />
        <!-- <label class="mt-2 text-xl" for="password">password</label>
        <input class="rounded text-black" type="password" id="password" name="password" /> -->
        <input class="rounded text-xl mt-3 bg-brown-500" type="submit" value="submit" />
      </form>
      <div v-if="formError.length">{{ formError }}</div>
    </div>
  </div>
</template>
