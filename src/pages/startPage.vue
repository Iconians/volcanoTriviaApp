<script setup lang="ts">
import startComponent from '@/components/startComponent.vue'
import homeForm from '@/components/homeForm.vue'
import { ref } from 'vue'
const isSignedIn = ref(true)
</script>

<template>
  <section class="section bg-volcanoGif height h-full w-full text-center"  >
    <home-form  v-if="!isSignedIn"/>
    <start-component v-if="isSignedIn" />
  </section>

</template>