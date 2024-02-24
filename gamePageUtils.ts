import { supabase } from './supabase'

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

export const findUser = async () => {
  const user = await supabase.auth.getSession()
  let userId
  if (user.data.session !== null) {
    userId = user.data.session.user.id
    return userId
  } else {
    console.error('No user found')
  }
}

export const findScore = async (userId: string | null) => {
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

export const addScore = async (currentScore: any | undefined, userId: any, correctAnswers: any, wrongAnswers: any) => {
  const newScore = { correct: correctAnswers, incorrect: wrongAnswers }
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

export const findDisplayName = async (userId: string | undefined) => {
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

export const updateSupabase = async (displayName: string, correctAnswers: any) => {
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

export const sortQuestions = (questionsArray: questionArray[] , answerArray: answerArr[] ) => {
  questionsArray.shift()
  answerArray.forEach((a) => {
    if (questionsArray.length > 0 && a.question_foreign_key === questionsArray[0].id) {
      a.answers.sort(() => Math.random() - 0.5)
    }
  })
}