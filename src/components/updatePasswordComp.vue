<script setup lang="ts">
import { supabase } from '../../supabase'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

const newPassword = ref('')
const formError = ref('')
const toast = useToast()

const updatePassword = async (e: Event) => {
  e.preventDefault()
  const update = await supabase.auth.updateUser({ password: newPassword.value })
  if (update.error) {
    newPassword.value = ''
    formError.value = update.error.message
    toast.error(update.error.message)
  } else {
    newPassword.value = ''
    formError.value = 'Password updated'
    toast.success('Password updated')
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
