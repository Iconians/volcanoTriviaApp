<script setup lang="ts">
import startComponent from '@/components/startComponent.vue'
import signInForm from '@/components/signInForm.vue'
import createAcctForm from '@/components/createAcctForm.vue'
import { ref, onMounted } from 'vue'
import resetPasswordForm from '@/components/resetPasswordForm.vue'
import { supabase } from '../../supabase'
import loadingComponent from '@/components/loadingComponent.vue'
import forgotPasswordSplashComponent from '@/components/forgotPasswordSplashComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

const isCreatingAccount = ref(false)
const isSignedIn = ref(false)
const forgotPassword = ref(false)
const loading = ref(true)
const volcanoBackground = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const resetPasswordFilledOut = ref(false)

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

const submittedForgotPasswordForm = () => {
  resetPasswordFilledOut.value = true
}

const switchForms = () => {
  isCreatingAccount.value = !isCreatingAccount.value
  if (forgotPassword.value) {
    isCreatingAccount.value = false
    forgotPassword.value = false
  }
}

const toggleVolcanoBackgroundMusic = () => {
  if (!volcanoBackground.value) return

  if (isPlaying.value) {
    volcanoBackground.value.pause()
  } else {
    volcanoBackground.value.play()
  }

  isPlaying.value = !isPlaying.value
}

onMounted(async () => {
  await alreadySingedIn()
  isPlaying.value = false
})
</script>

<template>
  <section
    v-if="!loading"
    class="flowing-border section bg-volcanoGif height h-full w-full text-center bg-cover"
  >
    <div class="main-content">
      <sign-in-form
        v-if="!isCreatingAccount && !isSignedIn && !forgotPassword && !resetPasswordFilledOut"
        @signedIn="signIn"
      />
      <create-acct-form
        v-if="isCreatingAccount && !resetPasswordFilledOut"
        @accountCreated="handleAccountCreated"
      />
      <start-component
        v-if="isSignedIn && !resetPasswordFilledOut"
        @click="toggleVolcanoBackgroundMusic"
        :playing="isPlaying"
      />
      <reset-password-form
        v-if="forgotPassword && !isCreatingAccount && !isSignedIn && !resetPasswordFilledOut"
        @forgotPassword="forgotFunction"
        @submittedForgotPasswordForm="submittedForgotPasswordForm()"
      />
      <forgot-password-splash-component v-if="resetPasswordFilledOut" />
      <div>
        <button
          v-if="!isSignedIn && !resetPasswordFilledOut"
          @click="switchForms"
          class="text-white text-2xl"
        >
          {{ isCreatingAccount ? 'Sign In' : 'Create Account' }}
        </button>
        <br />
        <button
          v-if="forgotPassword && !resetPasswordFilledOut"
          class="text-white pt-5 text-2xl"
          @click="switchForms"
        >
          Sign In
        </button>
        <br />
        <button
          v-if="!isSignedIn && !forgotPassword && !resetPasswordFilledOut"
          @click="clientForgotPassword"
          class="text-white pt-5 text-2xl"
        >
          Forgot Password
        </button>
        <br />
        <FontAwesomeIcon
          v-if="!isPlaying && !isSignedIn"
          :icon="faVolumeHigh"
          class="text-white cursor-pointer"
          @click="toggleVolcanoBackgroundMusic"
        />
        <FontAwesomeIcon
          v-if="isPlaying && !isSignedIn"
          :icon="faVolumeXmark"
          class="text-white cursor-pointer"
          @click="toggleVolcanoBackgroundMusic"
        />
      </div>
    </div>
  </section>
  <loading-component v-if="loading" />
  <audio ref="volcanoBackground" src="/mount-yasur-tanna-island.wav" loop></audio>
</template>
