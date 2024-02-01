<script lang="ts">
import { defineComponent } from 'vue';
import { supabase } from '../../supabase.js'
export default defineComponent({
  name: 'signInForm',
  data() {
    return {
      formError: ''
    }
  },
  methods: {
    async signIn(event: any) {
      event.preventDefault()

      const email = event.target.email.value
      const password = event.target.password.value

      try {
        const { data, error } = await (supabase.auth as any).signInWithPassword({
          email,
          password,
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
});
</script>

<template>
  <div class="text-wrapper text-white" >
    <h1 class="text-2xl">Volcano Quiz</h1>
    <p>Please sign in to see if you are smart enough to be a Volcanologist?</p>
    <div>
      <form @submit="signIn" class="flex flex-col ">
        <label class="text-xl" for="username">Email</label>
        <input class="rounded-sm text-black" type="email" id="username" name="email" />
        <label class="mt-2 text-xl" for="password">password</label>
        <input class="rounded text-black" type="password" id="password" name="password" />
        <input class="rounded text-xl mt-3 bg-brown-500" type="submit" value="submit" />
      </form>
      <div v-if="formError.length">{{ formError }}</div>
    </div>
  </div>
</template>