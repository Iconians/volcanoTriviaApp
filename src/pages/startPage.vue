<script setup lang="ts">
import startComponent from '@/components/startComponent.vue'
import signInForm from '@/components/signInForm.vue'
import createAcctForm from '@/components/createAcctForm.vue'
import { ref, onMounted } from 'vue'
import resetPasswordForm from '@/components/resetPasswordForm.vue'
import { supabase } from '../../supabase'
import { useRouter } from 'vue-router'

const isCreatingAccount = ref(false)
const isSignedIn = ref(false)
const forgotPassword = ref(false)

const alreadySingedIn = async () => {
  const user = await supabase.auth.getSession()
  if (user.data.session !== null) {
    isSignedIn.value = true
    console.log('user', user)
  } else {
    isSignedIn.value = false
    console.log('no user')
  }
}
const handleAccountCreated = () => {
  isCreatingAccount.value = false
  isSignedIn.value = true
}
const signIn = () => {
  isSignedIn.value = true
  isCreatingAccount.value = false
  forgotPassword.value = false
}

const forgotFunction = () => {
  forgotPassword.value = false
  isSignedIn.value = true
  isCreatingAccount.value = false
}
// alreadySingedIn()

const clientForgotPassword = async () => {
  forgotPassword.value = true
  isSignedIn.value = false
  isCreatingAccount.value = false
}

const switchForms = () => {
  isCreatingAccount.value = !isCreatingAccount.value
  if (forgotPassword.value) {
    isCreatingAccount.value = false
    forgotPassword.value = false
  }
}

const router = useRouter()

onMounted(() => {
  router.beforeEach(async (to, from, next) => {
    await alreadySingedIn()
    next()
  })
})

// onMounted(() => {
//   supabase.auth.onAuthStateChange(async (event, session) => {
//     await alreadySingedIn()
//   })
// })
</script>

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
      <button v-if="!isSignedIn" @click="switchForms" class="text-white text-2xl">
        {{ isCreatingAccount ? 'Sign In' : 'Create Account' }}
      </button>
      <br />
      <button v-if="forgotPassword" class="text-white pt-5 text-2xl" @click="switchForms">
        Sign In
      </button>
      <br />
      <button
        v-if="!isSignedIn && !forgotPassword"
        @click="clientForgotPassword"
        class="text-white pt-5 text-2xl"
      >
        Forgot Password
      </button>
    </div>
  </section>
</template>
