<script lang="ts">
import { defineComponent } from 'vue'
import { supabase } from '../../supabase.js'
export default defineComponent({
  name: 'createAcctForm',
  emits: ['accountCreated'],
  setup(_, { emit }) {
    const createAccount = async (event: Event) => {
      event.preventDefault()

      const form = event.target as HTMLFormElement
      const email = form.email.value
      const password = form.password.value
      const displayName = form.userName.value

      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        console.error('Error creating account: ', error)
      } else {
        console.log('Account created: ', data?.user)
      }
      if (data?.user) {
        const { error: insertError } = await supabase
          .from('profile')
          .insert([{ user_id: data.user.id, display_name: displayName, score: [] }])

        if (insertError) {
          console.error('Error inserting display name: ', insertError)
        } else {
          console.log('Display name inserted: ', displayName)
        }
      } else {
        console.error('No user found')
      }
      emit('accountCreated', data?.user)
    }
    return { createAccount }
  }
})
</script>

<template>
  <div class="text-wrapper text-white mb-5 bg-black/50">
    <h1 class="text-3xl mb-10">Volcano Quiz</h1>
    <p class="text-2xl mb-5">
      Create an account to see if you are smart enough to be a volcanologist?
    </p>
    <div>
      <form @submit="createAccount" class="flex flex-col mb-5">
        <label class="text-2xl" for="username">Username</label>
        <input class="rounded text-black p-1" type="text" id="username" name="userName" />
        <label class="text-2xl" for="email">Email</label>
        <input class="rounded text-black p-1" type="email" id="email" name="email" />
        <label class="mt-2 text-2xl" for="password">Password</label>
        <input class="rounded text-black p-1" type="password" id="password" name="password" />
        <input class="rounded text-2xl mt-3 mb-10 bg-brown-500 p-1" type="submit" value="submit" />
      </form>
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
