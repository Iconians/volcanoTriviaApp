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

const checkAnswer = (answer: string) => {
  emit('submit', answer)
}
</script>

<template>
  <div>
    <div class="flex flex-col justify-between w-[500px] questionForm h-[500px]">
      <h2 class="font-bold text-white text-center text-3xl mb-10" for="question">
        {{ props.questionsArray.length > 0 ? props.questionsArray[0].question : '' }}
      </h2>
      <div class="m-auto">
        <div
          v-for="(answerObj, index) in props.answerArray.filter(
            (a) => questionsArray.length > 0 && a.question_foreign_key === questionsArray[0].id
          )"
          :key="'answerObj-' + index"
          class="flex"
        >
          <div
            v-for="(answer, subIndex) in answerObj.answers"
            :key="'answer-' + index + '-' + subIndex"
            class="m-5 cursor-pointer"
          >
            <button
              class="cursor-pointer questionInputs text-2xl bg-brown-500 rounded p-1 w-40 min-h-20"
              :name="'answer-' + index"
              :id="'answer-' + index + '-' + subIndex"
              @click="checkAnswer(answer)"
            >
              {{ answer }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.questionForm {
  position: relative;
  z-index: 2;
}

/* .questionInputs {
  background-color: brown;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  height: 50px;


} */

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
