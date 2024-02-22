<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { supabase } from '../../supabase'
import router from '@/router'

const getUser = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.error('Error getting user:', error)
  }
  if (data.session !== null) {
    const userData = data.session.user
    return userData
  }
}

const signOut = async () => {
  let { error } = await supabase.auth.signOut()
  if (!error) {
    localStorage.removeItem('user')
    router.push('/')
  }
}

const deleteUser = async () => {
  const user = await getUser()
  if (user !== undefined) {
    const { data, error } = await supabase.auth.admin.deleteUser(user.id)
    if (error) {
      console.error('Error deleting user:', error)
    } else {
      localStorage.removeItem('user')
      console.log('User deleted:', data)
      router.push('/')
    }
  }
}
</script>

<template>
  <div class="flex flex-col mt-5 mb-5">
    <div class="flex justify-center">
      <router-link
        class="flex items-center justify-center bg-brown-500 rounded h-10 mb-5 w-32 hover:bg-red-600 text-xl"
        to="/"
        >Back to Start</router-link
      >
    </div>
    <div class="flex flex-wrap justify-between w-96 btns">
      <button class="bg-brown-500 rounded h-10 mt-5 w-32 hover:bg-red-600 text-xl" @click="signOut">
        Sign Out
      </button>
      <button
        class="bg-brown-500 rounded h-10 mt-5 w-40 hover:bg-red-600 text-xl"
        @click="deleteUser"
      >
        Delete Account
      </button>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 400px) {
  .btns {
    width: 320px;
    flex-direction: column;
    align-items: center;
  }
}
</style>
