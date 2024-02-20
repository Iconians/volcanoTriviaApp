<script setup lang="ts">
import questionForm from '@/components/questionForm.vue'
import heartsContainer from '@/components/heartsContainer.vue'
import GameStatistics from './gameStatistics.vue'
import { defineProps, defineEmits } from 'vue'

type questionArray = {
  id: string
  created_at: string
  question: string
}

type answerArr = {
  id: string
  created_at: string
  answers: string[]
  correct_answer: string
  question_foreign_key: string
}

const props = defineProps({
  questionsArray: {
    type: Array as () => questionArray[],
    required: true
  },
  answerArray: {
    type: Array as () => answerArr[],
    required: true
  },
  wrongAnswers: {
    type: Number,
    required: true
  },
  correctAnswers: Number,
  checkAnswer: Function
})
const emit = defineEmits<{ (event: 'submit', answer: string): void }>()

const handleSubmit = (answer: string) => {
  emit('submit', answer)
}
</script>

<template>
  <section
    class="mt-12 flex justify-center bg-stHelensWithtop text-white height h-full w-full bg-cover section1"
  >
    <div class="main-content">
      <questionForm
        :questionsArray="props.questionsArray"
        :answerArray="props.answerArray"
        @submit="handleSubmit"
      />
      <heartsContainer :wrongAnswers="wrongAnswers" />
    </div>
    <GameStatistics :correctAnswers="correctAnswers" :wrongAnswers="wrongAnswers" />
  </section>
</template>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
}

@media (max-width: 600px) {
  .section1 {
    flex-direction: column-reverse;
    /* margin: 25px auto; */
  }
}
</style>
