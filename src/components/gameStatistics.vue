<script setup lang="ts">
import { defineProps, defineComponent } from 'vue'

const props = defineProps({
  correctAnswers: Number,
  wrongAnswers: Number
})

defineComponent({
  name: 'gameStatistics',
  data() {
    return {
      // formError: ''
    }
  }
})

console.log(props.correctAnswers, props.wrongAnswers)
</script>

<template>
  <div>
    <p>Correct {{ props.correctAnswers }}</p>
    <p>Incorrect {{ props.wrongAnswers }}</p>
  </div>
</template>
