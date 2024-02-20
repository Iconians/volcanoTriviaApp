<script setup lang="ts">
const props = defineProps({
  correctAnswers: Number,
  wrongAnswers: Number
})
</script>

<template>
  <section
    class="mt-45 flex justify-center flex-col align-middle bg-stHelensWithPlume text-white height h-full w-full bg-cover"
  >
    <div class="text-2xl text-center">
      <p>Correct {{ props.correctAnswers }}</p>
      <p>Incorrect {{ props.wrongAnswers }}</p>
    </div>
    <div class="flex flex-col justify-center align-center">
      <router-link to="/totals" class="text-center text-2xl">High Scores</router-link>
      <router-link to="/" class="text-center text-2xl">Return Home</router-link>
    </div>
  </section>
</template>
