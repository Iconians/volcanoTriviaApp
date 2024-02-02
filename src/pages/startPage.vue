<script setup lang="ts">
import startComponent from '@/components/startComponent.vue'
import signInForm from '@/components/signInForm.vue'
import createAcctForm from '@/components/createAcctForm.vue'
import { ref } from 'vue'

interface User {
  email: string
  displayName: string
}

const isCreatingAccount = ref(false);
const isSignedIn = ref(false);

const alreadySingedIn = () => {
  const user = localStorage.getItem('user')
  if (user) {
    isSignedIn.value = true
  }
  isSignedIn.value = false
}
const handleAccountCreated = (user: User) => {
  isCreatingAccount.value = false
  isSignedIn.value = true
  localStorage.setItem('user', JSON.stringify(user))
}
const signIn = (user: any) => {
  isSignedIn.value = true
  localStorage.setItem('user', JSON.stringify(user))
}
alreadySingedIn()

</script>

<template>
  <section class="section bg-volcanoGif height h-full w-full text-center"  >
    <sign-in-form v-if="!isCreatingAccount && !isSignedIn" @signedIn="signIn" />
    <create-acct-form v-if="isCreatingAccount" @accountCreated="handleAccountCreated"/>
    <start-component v-if="isSignedIn" />
    <div>
      <button v-if="!isSignedIn" @click="isCreatingAccount = !isCreatingAccount" class="text-white">
        {{ isCreatingAccount ? 'Sign In' : 'Create Account' }}
      </button>
    </div>
  </section>

</template>