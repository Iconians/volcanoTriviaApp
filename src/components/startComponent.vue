<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'startComponent'
})
</script>

<template>
  <div class="text-wrapper text-white bg-black/50 p-12 rounded-3xl">
    <div>
      <h1 class="text-3xl">Volcano Quiz</h1>
      <p class="text-2xl">Are you smart enough to be a volcanologist?</p>
    </div>
    <RouterLink class="text-2xl text-center" to="/gamePage">Start Game</RouterLink>
    <RouterLink class="text-2xl text-center" to="/userPage">Profile</RouterLink>
    <RouterLink class="text-2xl text-center" to="/totals">High Scores</RouterLink>
  </div>
</template>
