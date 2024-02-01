<script setup lang="ts">
import startComponent from '@/components/startComponent.vue'
import signInForm from '@/components/signInForm.vue'
import createAcctForm from '@/components/createAcctForm.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const isCreatingAccount = ref(false);
const isSignedIn = ref(false);

const alreadySingedIn = () => {
  const user = localStorage.getItem('user')
  if (user) {
    isSignedIn.value = true
    store.dispatch('setUser', JSON.parse(user))
  }
}
const handleAccountCreated = (user: any) => {
  isCreatingAccount.value = false
  isSignedIn.value = true
  store.dispatch('setUser', user)
  const setStorage = localStorage.setItem('user', JSON.stringify(user))
  console.log(setStorage)
}
const signIn = (user: any) => {
  isSignedIn.value = true
  store.dispatch('setUser', user)
  const setStorage = localStorage.setItem('user', JSON.stringify(user))
  console.log(setStorage)
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