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
  checkAnswer: Function,
  answerClass: String
})
const emit = defineEmits<{ (event: 'submit', answer: string): void }>()

const handleSubmit = (answer: string) => {
  emit('submit', answer)
}
</script>

<template>
  <section
    class="flex justify-center bg-stHelensWithtop text-white height h-full w-full bg-cover section1 section"
    :class="props.answerClass"
  >
    <div class="main-content">
      <GameStatistics class="game" :correctAnswers="correctAnswers" />
      <questionForm
        :questionsArray="props.questionsArray"
        :answerArray="props.answerArray"
        @submit="handleSubmit"
      />

      <heartsContainer :wrongAnswers="wrongAnswers" />
    </div>
  </section>
</template>

<style scoped>
.section1 {
  position: relative;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
}

.main-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.game {
  margin: 25px 0;
  background-color: rgba(165, 42, 42, 0.8);
  font-size: 50px;
  padding: 25px 80px;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .section1 {
    flex-direction: column-reverse;
  }
}

.correct {
  animation: correct 0.5s linear infinite;
}

.incorrect {
  animation: incorrect 0.5s linear infinite;
}

@keyframes correct {
  0%,
  100% {
    border-image-source: linear-gradient(0deg, green, yellow);
  }
  25% {
    border-image-source: linear-gradient(90deg, green, yellow);
  }
  50% {
    border-image-source: linear-gradient(180deg, green, yellow);
  }
  75% {
    border-image-source: linear-gradient(270deg, green, yellow);
  }
}

@keyframes incorrect {
  0%,
  100% {
    border-image-source: linear-gradient(0deg, red, black);
  }
  25% {
    border-image-source: linear-gradient(90deg, red, black);
  }
  50% {
    border-image-source: linear-gradient(180deg, red, black);
  }
  75% {
    border-image-source: linear-gradient(270deg, red, black);
  }
}
</style>
