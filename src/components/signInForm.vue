<script lang="ts">
import { defineComponent } from 'vue'
import { supabase } from '../../supabase.js'
import { useToast } from 'vue-toast-notification'
import { ref } from 'vue'
export default defineComponent({
  name: 'signInForm',
  setup(_, { emit }) {
    const toast = useToast()
    const formError = ref('')
    const form = ref({
      password: '',
      email: ''
    })
    async function signIn(e: Event) {
      e.preventDefault()
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.value.email,
          password: form.value.password
        })

        if (error) {
          form.value.password = ''
          formError.value = error.message
          toast.error('Error signing in')
        } else {
          emit('signedIn', data.user)
          toast.success('Signed in successfully')
          localStorage.setItem('user', JSON.stringify(data.user))
        }
      } catch (error) {
        toast.error('Error in signIn method')
      }
    }
    return { formError, form, signIn }
  }
})
</script>

<template>
  <div class="text-wrapper text-white bg-black/50 p-12 rounded-3xl">
    <h1 class="text-3xl">Volcano Quiz</h1>
    <p class="text-2xl">Sign in to see if you are smart enough to be a Volcanologist?</p>
    <div>
      <form @submit="signIn" class="flex flex-col mt-5">
        <label class="text-2xl" for="username">Email</label>
        <input
          class="rounded text-black p-1"
          type="email"
          id="username"
          name="email"
          v-model="form.email"
        />
        <label class="mt-2 text-2xl" for="password mt-5">Password</label>
        <input
          class="rounded text-black p-1"
          type="password"
          id="password"
          name="password"
          v-model="form.password"
        />
        <input
          class="rounded text-2xl mt-5 bg-brown-500 p-1 cursor-pointer mb-5"
          type="submit"
          value="submit"
        />
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
