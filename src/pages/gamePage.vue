<script setup lang="ts">
import { ref, watch } from 'vue'
import { supabase } from '../../supabase.js'
import MainQuestionSection from '@/components/mainQuesionSection.vue'
import lostScreen from '@/components/lostScreen.vue'
import WinScreen from '@/components/WinScreen.vue'

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

const findUser = () => {
  const user = localStorage.getItem('user')
  let userId
  if (user !== null) {
    userId = JSON.parse(user).id
    return userId
  } else {
    console.error('No user found')
  }
}

const findScore = async (userId: string | null) => {
  const { data: currentScore, error: fetchError } = await supabase
    .from('profile')
    .select('score')
    .eq('user_id', userId)
  if (fetchError) {
    console.error('Error fetching score: ', fetchError)
    return
  }
  return currentScore
}

const addScore = async (currentScore: any | undefined, userId: any) => {
  const newScore = { correct: correctAnswers.value, incorrect: wrongAnswers.value }
  currentScore[0].score.push(newScore)

  const { data, error: updateError } = await supabase
    .from('profile')
    .update({ score: currentScore[0].score })
    .match({ user_id: userId })
  console.log('currentScore', updateError, data)
  if (updateError) {
    console.error('Error posting score: ', updateError)
  }
}

const findDisplayName = async (userId: any) => {
  const { data: currentScore, error: fetchError } = await supabase
    .from('profile')
    .select('display_name')
    .eq('user_id', userId)

  if (fetchError) {
    console.error('Error fetching score: ', fetchError)
    return
  }
  return currentScore
}

const updateSupabase = async (displayName: any) => {
  const { error: highScoreError } = await supabase.from('high_score').select('*')

  if (highScoreError) {
    console.error('Error fetching high score: ', highScoreError)
    return
  }
  const { error: updateHighScoreError } = await supabase
    .from('high_score')
    .insert({ score: correctAnswers.value, user_name: displayName })

  if (updateHighScoreError) {
    console.error('Error posting high score: ', updateHighScoreError)
  }
}

async function postScore() {
  if (questionsArray.value.length === 0 || wrongAnswers.value === 3) {
    const userId = findUser()
    const currentScore = await findScore(userId)
    addScore(currentScore, userId)
  }
  if (correctAnswers.value >= 4) {
    const userId = findUser()
    const currentScore = await findDisplayName(userId)
    if (currentScore !== undefined) {
      const displayName = currentScore[0].display_name
      updateSupabase(displayName)
    }
  }
}

const findAnswer = (correctAnswer: answerArr[], answer: string) => {
  const getAnswer = correctAnswer[0].correct_answer
  if (answer.toString() === getAnswer) {
    correctAnswers.value++
  } else {
    wrongAnswers.value++
  }
}

const sortQuestions = () => {
  questionsArray.value.shift()
  answerArray.value.forEach((a) => {
    if (questionsArray.value.length > 0 && a.question_foreign_key === questionsArray.value[0].id) {
      a.answers.sort(() => Math.random() - 0.5)
    }
  })
}

const checkAnswer = async (answer: string) => {
  const correctAnswer = answerArray.value.filter(
    (a) => a.question_foreign_key === questionsArray.value[0].id
  )

  if (correctAnswer.length > 0) {
    findAnswer(correctAnswer, answer)
  }

  if (wrongAnswers.value === 3) {
    await postScore()
  }

  if (questionsArray.value.length > 0) {
    sortQuestions()
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
  <main-question-section
    v-if="questionsArray.length > 0 && wrongAnswers < 3"
    :questionsArray="questionsArray"
    :answerArray="answerArray"
    :wrongAnswers="wrongAnswers"
    :correctAnswers="correctAnswers"
    @submit="checkAnswer"
  />
  <lost-screen
    v-else-if="wrongAnswers === 3"
    :correctAnswer="correctAnswers"
    :wrongAnswers="wrongAnswers"
  />
  <win-screen v-else :correctAnswers="correctAnswers" :wrongAnswers="wrongAnswers" />
</template>
