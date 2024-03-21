<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { defineEmits } from 'vue'
// import { emit } from 'process'

const emit = defineEmits(['click'])

const listenForAudioClick = () => {
  emit('click')
}
</script>

<template>
  <div class="text-wrapper text-white bg-black/50 p-12 rounded-3xl">
    <div>
      <h1 class="text-3xl">Volcano Quiz</h1>
      <p class="text-2xl">Are you smart enough to be a volcanologist?</p>
    </div>
    <RouterLink class="text-2xl text-center m-2" to="/gamePage">Start Game</RouterLink>
    <RouterLink class="text-2xl text-center m-2" to="/userPage">Profile</RouterLink>
    <RouterLink class="text-2xl text-center m-2" to="/totals">High Scores</RouterLink>
    <button class="mt-4" @click="listenForAudioClick">click for sound</button>
  </div>
</template>
