<script setup lang="ts">
import startComponent from '@/components/startComponent.vue'
import signInForm from '@/components/signInForm.vue'
import createAcctForm from '@/components/createAcctForm.vue'
import { ref } from 'vue'
import ResetPasswordForm from '@/components/resetPasswordForm.vue'

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
  isCreatingAccount.value = false
  forgotPassword.value = false
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

const switchForms = () => {
  isCreatingAccount.value = !isCreatingAccount.value
  if (forgotPassword.value) {
    forgotPassword.value = false
  }
}
</script>
<!-- -->

<template>
  <section class="section bg-volcanoGif height h-full w-full text-center">
    <sign-in-form v-if="!isCreatingAccount && !isSignedIn && !forgotPassword" @signedIn="signIn" />
    <create-acct-form v-if="isCreatingAccount" @accountCreated="handleAccountCreated" />
    <start-component v-if="isSignedIn" />
    <reset-password-form
      v-if="forgotPassword && !isCreatingAccount && !isSignedIn"
      @forgotPassword="forgotFunction"
    />
    <div>
      <button v-if="!isSignedIn" @click="switchForms" class="text-white">
        {{ isCreatingAccount ? 'Sign In' : 'Create Account' }}
      </button>
      <br />
      <button v-if="forgotPassword" class="text-white pt-5" @click="switchForms">Sign In</button>
      <br />
      <button
        v-if="!isSignedIn && !forgotPassword"
        @click="clientForgotPassword"
        class="text-white pt-5"
      >
        Forgot Password
      </button>
    </div>
  </section>
</template>
