<script setup lang="ts">
import startComponent from '@/components/startComponent.vue'
import signInForm from '@/components/signInForm.vue'
import createAcctForm from '@/components/createAcctForm.vue'
import { ref, onMounted } from 'vue'
import resetPasswordForm from '@/components/resetPasswordForm.vue'
import { supabase } from '../../supabase'
import loadingComponent from '@/components/loadingComponent.vue'
import { useToast } from 'vue-toast-notification'

const isCreatingAccount = ref(false)
const isSignedIn = ref(false)
const forgotPassword = ref(false)
const loading = ref(true)
const volcanoBackground = ref<HTMLAudioElement | null>(null)

const toast = useToast()

const alreadySingedIn = async () => {
  const user = await supabase.auth.getUser()
  if (user.data.user !== null) {
    isSignedIn.value = true
    loading.value = false
  } else {
    isSignedIn.value = false
    loading.value = false
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

// onMounted(async () => {
//   await alreadySingedIn()
//   if (volcanoBackground.value && isSignedIn.value === true) {
//     volcanoBackground.value.play()
//   }
// })
onMounted(async () => {
  await alreadySingedIn()

  if (!loading.value) {
    toast.open({
      message: 'Click here to allow sound',
      type: 'info',
      onClick: () => {
        if (volcanoBackground.value) {
          volcanoBackground.value.play()
        }
      }
    })
  }
})
</script>

<template>
  <section
    v-if="!loading"
    class="flowing-border section bg-volcanoGif height h-full w-full text-center bg-cover"
  >
    <div class="main-content">
      <sign-in-form
        v-if="!isCreatingAccount && !isSignedIn && !forgotPassword"
        @signedIn="signIn"
      />
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
    </div>
  </section>
  <loading-component v-if="loading" />
  <audio ref="volcanoBackground" src="/mount-yasur-tanna-island.wav" autoplay loop></audio>
</template>

<!-- <style scoped>
.main-content {
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 20px;
  border-radius: 5px;
  /* background: white; */
}
</style> -->
