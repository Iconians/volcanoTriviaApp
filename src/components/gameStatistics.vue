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
</script>

<template>
  <div class="h-fit mt-5 statistics">
    <p>Correct {{ props.correctAnswers }}</p>
    <p>Incorrect {{ props.wrongAnswers }}</p>
  </div>
</template>

<style scoped>
@media (max-width: 600px) {
  .statistics {
    margin: 25px auto;
    color: black;
  }
}
</style>
