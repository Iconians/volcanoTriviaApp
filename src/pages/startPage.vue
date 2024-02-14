<!-- Forgotten Password Email
Sends the user a log in link via email. Once logged in you should direct the user to a new password form. And use "Update User" below to save the new password.

PASSWORD RECOVERY
let { data, error } = await supabase.auth.resetPasswordForEmail(email) -->

<script setup lang="ts">
import startComponent from '@/components/startComponent.vue'
import signInForm from '@/components/signInForm.vue'
import createAcctForm from '@/components/createAcctForm.vue'
import forgotPasswordForm from '@/components/forgotPasswordForm.vue'
import { ref } from 'vue'

interface User {
  email: string
  displayName: string
}

const isCreatingAccount = ref(false)
const isSignedIn = ref(false)
const forgotPassword = ref(false)

const alreadySingedIn = () => {
  const user = localStorage.getItem('user')
  if (user !== null) {
    isSignedIn.value = true
  } else {
    isSignedIn.value = false
  }
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
  <section class="section bg-volcanoGif height h-full w-full text-center">
    <sign-in-form v-if="!isCreatingAccount && !isSignedIn" @signedIn="signIn" />
    <create-acct-form v-if="isCreatingAccount" @accountCreated="handleAccountCreated" />
    <start-component v-if="isSignedIn" />
    <forgot-password-form v-if="forgotPassword" />
    <div>
      <button v-if="!isSignedIn" @click="isCreatingAccount = !isCreatingAccount" class="text-white">
        {{ isCreatingAccount ? 'Sign In' : 'Create Account' }}
      </button>
    </div>
  </section>
</template>
