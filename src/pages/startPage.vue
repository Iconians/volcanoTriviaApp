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
import { supabase } from 'supabase'

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

const forgotFunction = () => {
  forgotPassword.value = false
  isSignedIn.value = true
  isCreatingAccount.value = false
}
alreadySingedIn()

const clientForgotPassword = async () => {
  forgotPassword.value = true
}
console.log(forgotPassword.value)
</script>
<!-- figure out how to redisplay the signInForm after the other other forms are displayed -->

<template>
  <section class="section bg-volcanoGif height h-full w-full text-center">
    <sign-in-form v-if="!isCreatingAccount && !isSignedIn && !forgotPassword" @signedIn="signIn" />
    <create-acct-form v-if="isCreatingAccount" @accountCreated="handleAccountCreated" />
    <start-component v-if="isSignedIn" />
    <forgot-password-form
      v-if="forgotPassword && !isCreatingAccount && !isSignedIn"
      @forgotPassword="forgotFunction"
    />
    <div>
      <button v-if="!isSignedIn" @click="isCreatingAccount = !isCreatingAccount" class="text-white">
        {{ isCreatingAccount ? 'Sign In' : 'Create Account' }}
      </button>
      <br />
      <button @click="clientForgotPassword" class="text-white pt-5">Forgot Password</button>
    </div>
  </section>
</template>
