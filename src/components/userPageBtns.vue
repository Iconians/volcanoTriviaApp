<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { supabase } from '../../supabase'
import router from '@/router'

const signOut = async () => {
  let { error } = await supabase.auth.signOut()
  if (!error) {
    localStorage.removeItem('user')
    router.push('/')
  }
}
</script>

<template>
  <div class="flex flex-col mt-5 mb-5">
    <div class="flex justify-center">
      <router-link
        class="flex items-center justify-center bg-brown-500 rounded h-14 mb-5 w-32 hover:bg-red-600 text-xl"
        to="/"
        >Back to Start</router-link
      >
    </div>
    <div class="flex flex-wrap btns">
      <button class="bg-brown-500 rounded h-10 mt-5 w-32 hover:bg-red-600 text-xl" @click="signOut">
        Sign Out
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
