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
    // const correctAnswers = ref(0)
    // const isCorrect = ref(false)
    const isWrong = () => {
      wrongAnswers.value++
    }

  supabase.from('questions').select('*')
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
    const questionIds = newVal.map(question => question.id)
    supabase
      .from('answers')
      .select('*')
      .in('question_foreign_key', questionIds)
      .then(({ data, error }) => {
        if (error) console.log(error)
        else {
        const answers: answerArr[] = data
          
          if (answers.length > 0) {
            answerArray.value = answers;
          }
        }
        answerArray.value.forEach(answer => {
          console.log(answer.answers);
        });
        console.log(questionsArray.value[0]?.question);
      })
}
})

</script>

<template>
  <section class="section bg-stHelensWithtop text-white height h-full w-full bg-cover">
    <div>
    <form class="flex flex-col justify-around text-center h-40" action="">
      <label class="font-bold text-black" for="question">{{ questionsArray.length > 0 ? questionsArray[0].question : '' }}</label>
      <!-- <input type="radio" name="answer" v-for="(answer, index) in answerArray" :key="index" :id="'answer-' + index" :value="answer" /> -->

      <div >
        <div v-for="(answerObj, index) in answerArray.filter(a => a.question_foreign_key === questionsArray[0].id)" :key="'answerObj-' + index">
          <div v-for="(answer, subIndex) in answerObj.answers" :key="'answer-' + index + '-' + subIndex">
            <input type="radio" name="answer" :id="'answer-' + index + '-' + subIndex" :value="answer" />
            <label class="font-bold text-black" :for="'answer-' + index + '-' + subIndex">{{ answer }}</label>
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