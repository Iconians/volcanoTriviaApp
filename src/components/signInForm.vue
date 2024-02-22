<script lang="ts">
import { defineComponent } from 'vue'
import { supabase } from '../../supabase.js'
export default defineComponent({
  name: 'signInForm',
  data() {
    return {
      formError: ''
    }
  },
  methods: {
    async signIn(event: Event) {
      event.preventDefault()

      const form = event.target as HTMLFormElement
      const email = form.email.value
      const password = form.password.value

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          this.formError = error.message
        } else {
          this.$emit('signedIn', data.user)
        }
      } catch (error) {
        console.error('Error in signIn method: ', error)
      }
    }
  }
})
</script>

<template>
  <div class="text-wrapper text-white bg-black/50">
    <h1 class="text-3xl">Volcano Quiz</h1>
    <p class="text-2xl">Sign in to see if you are smart enough to be a Volcanologist?</p>
    <div>
      <form @submit="signIn" class="flex flex-col">
        <label class="text-2xl" for="username">Email</label>
        <input class="rounded text-black p-1" type="email" id="username" name="email" />
        <label class="mt-2 text-2xl" for="password">Password</label>
        <input class="rounded text-black p-1" type="password" id="password" name="password" />
        <input class="rounded text-2xl mt-3 bg-brown-500 p-1" type="submit" value="submit" />
      </form>
      <div v-if="formError.length">{{ formError }}</div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 600px) {
  .text-wrapper {
    width: 80%;
    margin-bottom: 20px;
  }
}
</style>
