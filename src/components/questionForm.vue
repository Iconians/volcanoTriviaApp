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

const emit = defineEmits<{ (event: 'submit', answer: string): void }>()

const checkAnswer = (event: Event) => {
  event.preventDefault()
  const answer = (event.target as HTMLFormElement).answer.value
  emit('submit', answer)
}
</script>

<template>
  <div>
    <form class="flex flex-col justify-around text-center h-40" @submit.prevent="checkAnswer">
      <label class="font-bold text-black" for="question">{{
        props.questionsArray.length > 0 ? props.questionsArray[0].question : ''
      }}</label>
      <div>
        <div
          v-for="(answerObj, index) in props.answerArray.filter(
            (a) => questionsArray.length > 0 && a.question_foreign_key === questionsArray[0].id
          )"
          :key="'answerObj-' + index"
        >
          <div
            v-for="(answer, subIndex) in answerObj.answers"
            :key="'answer-' + index + '-' + subIndex"
          >
            <input
              type="radio"
              name="answer"
              :id="'answer-' + index + '-' + subIndex"
              :value="answer"
            />
            <label class="font-bold text-black" :for="'answer-' + index + '-' + subIndex">{{
              answer
            }}</label>
          </div>
        </div>
      </div>
      <input class="bg-brown-500" type="submit" value="Submit Answer" />
    </form>
  </div>
</template>
