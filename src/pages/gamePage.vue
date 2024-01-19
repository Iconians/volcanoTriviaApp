<script setup lang="ts">
import { ref, watch } from 'vue'
import { supabase } from '../../supabase.js'

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

const questionsArray = ref<questionArray[]>([])
const answerArray = ref<answerArr[]>([])
const wrongAnswers = ref(0)
const correctAnswers = ref(0)
// const isCorrect = ref(false)
const checkAnswer = (e: Event) => {
  e.preventDefault()
  const answer = (e.target as HTMLFormElement).answer.value
  const correctAnswer = answerArray.value.filter(
    (a) => a.question_foreign_key === questionsArray.value[0].id
  )[0].correct_answer
  if (answer === correctAnswer) {
    correctAnswers.value++
  } else {
    wrongAnswers.value++
  }
  questionsArray.value.shift()
  answerArray.value.forEach((a) => {
    if (a.question_foreign_key === questionsArray.value[0].id) {
      a.answers.sort(() => Math.random() - 0.5)
    }
  })
}

supabase
  .from('questions')
  .select('*')
  .then(({ data: questions, error }) => {
    if (error) console.log(error)
    else {
      let num = 5
      while (num > 0) {
        const randomQuestion = Math.floor(Math.random() * questions.length)
        questionsArray.value = [...questionsArray.value, questions[randomQuestion]]
        num--
      }
    }
  })

watch(questionsArray, (newVal) => {
  if (newVal.length > 0) {
    const questionIds = newVal.map((question) => question.id)
    supabase
      .from('answers')
      .select('*')
      .in('question_foreign_key', questionIds)
      .then(({ data, error }) => {
        if (error) console.log(error)
        else {
          const answers: answerArr[] = data

          if (answers.length > 0) {
            answerArray.value = answers
          }
        }
      })
    answerArray.value.forEach((a) => {
      if (a.question_foreign_key === questionsArray.value[0].id) {
        a.answers.sort(() => Math.random() - 0.5)
      }
    })
  }
})
</script>

<template>
  <section
    class="mt-45 flex justify-center bg-stHelensWithtop text-white height h-full w-full bg-cover"
  >
    <div class="main-content">
      <div>
        <form class="flex flex-col justify-around text-center h-40" @submit.prevent="checkAnswer">
          >
          <label class="font-bold text-black" for="question">{{
            questionsArray.length > 0 ? questionsArray[0].question : ''
          }}</label>
          <div>
            <div
              v-for="(answerObj, index) in answerArray.filter(
                (a) => a.question_foreign_key === questionsArray[0].id
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
      <div class="flex">
        <div v-if="wrongAnswers === 0" class="heart"></div>
        <div v-if="wrongAnswers <= 1" class="heart"></div>
        <div v-if="wrongAnswers <= 2" class="heart"></div>
      </div>
    </div>
    <div>
      <p>Correct {{ correctAnswers }}</p>
      <p>Incorrect {{ wrongAnswers }}</p>
    </div>
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
.heart {
  position: relative;
  width: 100px;
  height: 90px;
}

.heart::before,
.heart::after {
  content: '';
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
