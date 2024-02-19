<script setup lang="ts">
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
  }
})

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

const data = {
  selectedInput: ''
}

const emit = defineEmits<{ (event: 'submit', answer: string): void }>()

const checkAnswer = (event: Event) => {
  event.preventDefault()
  const answer = data.selectedInput
  emit('submit', answer)
  resetRadioBtns()
  data.selectedInput = ''
}

const getLetter = (index: number) => String.fromCharCode(97 + index)
</script>

<template>
  <div>
    <form class="flex flex-col justify-around w-[500px]" @submit.prevent="checkAnswer">
      <label class="font-bold text-black text-center" for="question">{{
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
              v-model="data.selectedInput"
            />
            <label class="font-bold text-black" :for="'answer-' + index + '-' + subIndex">
              ({{ getLetter(subIndex).toUpperCase() }}) {{ answer }}
            </label>
          </div>
        </div>
      </div>
      <input
        class="bg-brown-500 w-80 rounded-3xl m-auto h-10"
        type="submit"
        value="Submit Answer"
      />
    </form>
  </div>
</template>
