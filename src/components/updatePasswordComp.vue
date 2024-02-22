<script setup lang="ts">
import { supabase } from '../../supabase'
import { ref } from 'vue'

const newPassword = ref('')
const formError = ref('')

const updatePassword = async (e: Event) => {
  e.preventDefault()
  console.log(newPassword.value)
  const update = await supabase.auth.updateUser({ password: newPassword.value })
  console.log(update)
  if (update.error) {
    formError.value = update.error.message
  } else {
    formError.value = 'Password updated'
  }
}
</script>

<template>
  <div class="m-8">
    <div class="mb-5 text-2xl">Update Password</div>
    <form class="flex flex-col" @submit="updatePassword">
      <input
        v-model="newPassword"
        class="text-black rounded h-8"
        placeholder="Change Password"
        type="password"
      />
      <input
        class="mt-5 bg-brown-500 rounded h-10 hover:bg-red-600 text-xl"
        type="submit"
        value="Change Password"
      />
    </form>
    <div class="mt-5" v-if="formError.length">{{ formError }}</div>
  </div>
</template>
