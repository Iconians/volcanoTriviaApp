<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

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
  }
})

const selectedInput = ref('')

const resetRadioBtns = () => {
  const radioBtns = document.querySelectorAll('input[type="radio"]')
  radioBtns.forEach(() => {
    const radioBtns = document.querySelectorAll(
      'input[type="radio"]'
    ) as NodeListOf<HTMLInputElement>
    radioBtns.forEach((btn) => {
      btn.checked = false
    })
  })
}

const emit = defineEmits<{ (event: 'submit', answer: string): void }>()

const checkAnswer = (event: Event) => {
  event.preventDefault()
  const answer = selectedInput
  emit('submit', answer.value)
  resetRadioBtns()
  selectedInput.value = ''
}

const getLetter = (index: number) => String.fromCharCode(97 + index)
</script>

<template>
  <div>
    <form class="flex flex-col justify-around w-[500px] questionForm" @submit.prevent="checkAnswer">
      <label class="font-bold text-white text-center text-3xl" for="question">{{
        props.questionsArray.length > 0 ? props.questionsArray[0].question : ''
      }}</label>
      <div class="m-auto">
        <div
          v-for="(answerObj, index) in props.answerArray.filter(
            (a) => questionsArray.length > 0 && a.question_foreign_key === questionsArray[0].id
          )"
          :key="'answerObj-' + index"
        >
          <div
            v-for="(answer, subIndex) in answerObj.answers"
            :key="'answer-' + index + '-' + subIndex"
            class="m-5"
          >
            <input
              type="radio"
              :name="'answer-' + index"
              :id="'answer-' + index + '-' + subIndex"
              :value="answer"
              v-model="selectedInput"
            />
            <label class="text-white text-2xl" :for="'answer-' + index + '-' + subIndex">
              ({{ getLetter(subIndex).toUpperCase() }}) {{ answer }}
            </label>
          </div>
        </div>
      </div>
      <input
        class="bg-brown-500 w-80 rounded-3xl m-auto h-10 formBtn text-2xl"
        type="submit"
        value="Submit Answer"
        :disabled="selectedInput === ''"
      />
    </form>
  </div>
</template>

<style scoped>
.questionForm {
  position: relative;
  z-index: 2;
}
@media (max-width: 600px) {
  .questionForm {
    width: 80%;
    margin: auto;
  }
}

@media (max-width: 400px) {
  .formBtn {
    width: 80%;
    margin: auto;
  }
}
</style>
