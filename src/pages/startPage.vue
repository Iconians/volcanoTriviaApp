<script setup lang="ts">
import startComponent from '@/components/startComponent.vue'
import signInForm from '@/components/signInForm.vue'
import createAcctForm from '@/components/createAcctForm.vue'
import { ref } from 'vue'
const isCreatingAccount = ref(false);
const isSignedIn = ref(false);
const handleAccountCreated = (user: any) => {
  console.log('Account created: ', user)
  isCreatingAccount.value = false
  isSignedIn.value = true
}
const signIn = (user: any) => {
  console.log('Signed in: ', user)
  isSignedIn.value = true
}
// make a way to store users data
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