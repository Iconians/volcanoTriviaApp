<script setup lang="ts">
import { ref } from 'vue'
    const currentQuestion = ref("1st Question")
    const wrongAnswers = ref(0)
    // const correctAnswers = ref(0)
    // const isCorrect = ref(false)
    const isWrong = () => {
      wrongAnswers.value++
    }
</script>

<template>
  <section class="section bg-stHelensWithtop text-white height h-full w-full bg-cover">
    <div>
    <form class="flex flex-col justify-around text-center h-40" action="">
      <label class="font-bold text-black" for="question">{{ currentQuestion }}</label>
      <input type="input" id="question" name="question" />
      <input class="bg-brown-500" type="submit" value="Submit Answer" />
    </form>
  </div>
  <div class="flex">
  <div v-if="wrongAnswers === 0" class="heart"></div>
  <div v-if="wrongAnswers <= 1" class="heart"></div>
  <div v-if="wrongAnswers <= 2" class="heart"></div>
</div>
  </section>
</template>

<style scoped>
.heart {
  position: relative;
  width: 100px;
  height: 90px;
}

.heart::before, .heart::after {
  content: "";
  position: absolute;
  top: 40px;
  width: 52px;
  height: 80px;
  border-radius: 50px 50px 0 0;
  background: red;
}

.heart::before {
  left: 50px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.heart::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}
</style>