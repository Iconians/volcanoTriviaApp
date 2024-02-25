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
  <div>
    <div class="text-2xl">Score History</div>
    <div class="h-52 overflow-y-auto scroll">
      <div v-for="score in props.userScore" :key="score.correct" class="flex">
        <div v-if="props.userScore.length" class="m-2 text-xl">Correct: {{ score.correct }}</div>
        <div v-if="props.userScore.length" class="m-2 text-xl">
          Incorrect: {{ score.incorrect }}
        </div>
      </div>
      <div v-if="!props.userScore.length" class="m-2 text-xl w-32">
        no score to show go play a few rounds to see results
      </div>
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
