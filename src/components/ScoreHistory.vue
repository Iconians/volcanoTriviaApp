<script setup lang="ts">
import { defineProps } from 'vue'

interface Score {
  correct: number
  incorrect: number
}

const props = defineProps({
  userScore: {
    type: Array as () => Score[],
    required: true
  }
})
</script>

<template>
  <div class="h-52 overflow-y-auto scroll">
    <div>Score History</div>
    <div v-for="score in props.userScore" :key="score.correct" class="flex">
      <div class="m-2">Correct: {{ score.correct }}</div>
      <div class="m-2">Incorrect: {{ score.incorrect }}</div>
    </div>
  </div>
</template>

<style scoped>
.scroll::-webkit-scrollbar {
  width: 10px;
}

.scroll::-webkit-scrollbar-track {
  background: none;
}
</style>
