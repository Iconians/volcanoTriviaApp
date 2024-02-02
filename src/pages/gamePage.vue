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

async function postScore() {
  if (questionsArray.value.length === 0 || wrongAnswers.value === 3) {
    const user = localStorage.getItem('user')
    let userId
    if (user !== null) {
      userId = JSON.parse(user).id
    } else {
      console.error('No user found')
    }

    const { data: currentScore, error: fetchError } = await supabase
      .from('profile')
      .select('score')
      .eq('user_id', userId)

    if (fetchError) {
      console.error('Error fetching score: ', fetchError)
      return
    }

    const newScore = { correct: correctAnswers.value, incorrect: wrongAnswers.value }
    currentScore[0].score.push(newScore)

    const { data: updatedScore, error: updateError } = await supabase
      .from('profile')
      .update({ score: currentScore[0].score })
      .match({ user_id: userId })
    if (updateError) {
      console.error('Error posting score: ', updateError)
    }
  }
  if (correctAnswers.value >= 4) {
    const user = localStorage.getItem('user')
    let userId
    if (user !== null) {
      userId = JSON.parse(user).id
    } else {
      console.error('No user found')
    }

    const { data: currentScore, error: fetchError } = await supabase
      .from('profile')
      .select('display_name')
      .eq('user_id', userId)

    if (fetchError) {
      console.error('Error fetching score: ', fetchError)
      return
    }

    const displayName = currentScore[0].display_name

    const { data: highScore, error: highScoreError } = await supabase.from('high_score').select('*')

    if (highScoreError) {
      console.error('Error fetching high score: ', highScoreError)
      return
    }
    console.log(highScore)
    const { data: updatedHighScore, error: updateHighScoreError } = await supabase
      .from('high_score')
      .insert({ score: correctAnswers.value, user_name: displayName })

    if (updateHighScoreError) {
      console.error('Error posting high score: ', updateHighScoreError)
    }
  }
}

const checkAnswer = async (e: Event) => {
  e.preventDefault()
  const answer = (e.target as HTMLFormElement).answer.value
  const correctAnswer = answerArray.value.filter(
    (a) => a.question_foreign_key === questionsArray.value[0].id
  )

  if (correctAnswer.length > 0) {
    const getAnswer = correctAnswer[0].correct_answer

    if (answer === getAnswer) {
      correctAnswers.value++
    } else {
      wrongAnswers.value++
    }
  }

  if (wrongAnswers.value === 3) {
    console.log('Game Over')
    await postScore()
  }

  if (questionsArray.value.length > 0) {
    questionsArray.value.shift()
    answerArray.value.forEach((a) => {
      if (
        questionsArray.value.length > 0 &&
        a.question_foreign_key === questionsArray.value[0].id
      ) {
        a.answers.sort(() => Math.random() - 0.5)
      }
    })
  } else {
    console.log('No more questions')
  }
  await postScore()
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
    v-if="questionsArray.length > 0 && wrongAnswers < 3"
    class="mt-45 flex justify-center bg-stHelensWithtop text-white height h-full w-full bg-cover"
  >
    <div class="main-content">
      <div>
        <form class="flex flex-col justify-around text-center h-40" @submit.prevent="checkAnswer">
          <label class="font-bold text-black" for="question">{{
            questionsArray.length > 0 ? questionsArray[0].question : ''
          }}</label>
          <div>
            <div
              v-for="(answerObj, index) in answerArray.filter(
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
  <section
    v-else-if="wrongAnswers === 3"
    class="bg-lavaVolcano text-white height h-full w-full bg-cover flex justify-center flex-col align-middle"
  >
    <div class="gameOver">
      <h1 class="text-center text-3xl mb-7">Game Over</h1>
      <div class="text-center text-2xl mb-7">
        <p>would you be this close to an active volcano?</p>
      </div>
      <div class="text-2xl text-center">
        <p>Correct {{ correctAnswers }}</p>
        <p>Incorrect {{ wrongAnswers }}</p>
      </div>
      <div class="flex flex-col justify-center align-center">
        <router-link to="/totals" class="text-center text-2xl">High Scores</router-link>
        <router-link to="/" class="text-center text-2xl">Return Home</router-link>
      </div>
    </div>
  </section>
  <section
    v-else
    class="mt-45 flex justify-center flex-col align-middle bg-stHelensWithPlume text-white height h-full w-full bg-cover"
  >
    <div class="text-2xl text-center">
      <p>Correct {{ correctAnswers }}</p>
      <p>Incorrect {{ wrongAnswers }}</p>
    </div>
    <div class="flex flex-col justify-center align-center">
      <router-link to="/totals" class="text-center text-2xl">High Scores</router-link>
      <router-link to="/" class="text-center text-2xl">Return Home</router-link>
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
