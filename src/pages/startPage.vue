<script setup lang="ts">
import startComponent from '@/components/startComponent.vue'
import signInForm from '@/components/signInForm.vue'
import createAcctForm from '@/components/createAcctForm.vue'
import { ref } from 'vue'
const isSignedIn = ref(false)
const createAcct = ref(false)
</script>

<template>
  <section class="section bg-volcanoGif height h-full w-full text-center"  >
    <create-acct-form v-if="createAcct" />
    <sign-in-form  v-if="!isSignedIn"/>
    <start-component v-if="isSignedIn" />
  </section>

</template>