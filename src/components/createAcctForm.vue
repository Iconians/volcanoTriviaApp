<script lang="ts">
import { defineComponent } from 'vue'
import { supabase } from '../../supabase.js'
export default defineComponent({
  name: 'createAcctForm',
  emits: ['accountCreated'],
  setup(_, { emit }) {
    const createAccount = async (event: Event) => {
      event.preventDefault()
      
      const form = event.target as HTMLFormElement;
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
  <div class="text-wrapper text-white">
    <h1 class="text-2xl">Volcano Quiz</h1>
    <p>Please create an account to see if you are smart enough to be a volcanologist?</p>
    <div>
      <form @submit="createAccount" class="flex flex-col">
        <label class="text-xl" for="username">username</label>
        <input class="rounded-sm text-black" type="text" id="username" name="userName" />
        <label class="text-x" for="email">email</label>
        <input class="rounded-sm text-black" type="email" id="email" name="email" />
        <label class="mt-2 text-xl" for="password">password</label>
        <input class="rounded text-black" type="password" id="password" name="password" />
        <input class="rounded text-xl mt-3 bg-brown-500" type="submit" value="submit" />
      </form>
    </div>
  </div>
</template>
