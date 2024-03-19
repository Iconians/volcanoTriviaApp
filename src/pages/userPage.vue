<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../../supabase'
import updatePasswordComp from '@/components/updatePasswordComp.vue'
import ScoreHistory from '@/components/ScoreHistory.vue'
import UserPageBtns from '@/components/userPageBtns.vue'
import { useToast } from 'vue-toast-notification'

interface Score {
  correct: number
  incorrect: number
}

const userName = ref('')
const userScore = ref<Score[]>([])
const backgroundMusic = ref<HTMLAudioElement | null>(null)
const toast = useToast()

const playBackgroundMusic = () => {
  if (backgroundMusic.value) {
    backgroundMusic.value.play()
  }
}

function safeParse(jsonString: string) {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Failed to parse JSON string:', error)
    toast.error('Failed to parse user data')
    return null
  }
}

const findUser = async () => {
  const { data } = await supabase.auth.getSession()
  const userData = data.session?.user
  const user = await supabase
    .from('profile')
    .select('display_name, score')
    .eq('user_id', userData?.id)
  if (user.data !== null) {
    userName.value = user.data[0].display_name
    const parsedScores = user.data[0].score.map(safeParse).filter(Boolean)
    if (parsedScores !== null) {
      userScore.value = parsedScores.slice().reverse()
    }
  }
}

const updateUsername = (newUserName: string) => {
  userName.value = newUserName
}

findUser()
playBackgroundMusic()
</script>

<template>
  <section class="section height h-full w-full text-center text-white bg-activeVolcano bg-cover">
    <div class="text-3xl">{{ userName }}'s Profile</div>
    <div class="flex flex-wrap m-8 justify-around w-3/4">
      <score-history :userScore="userScore" />
      <update-password-comp @updateUsername="updateUsername" />
    </div>
    <user-page-btns />
  </section>
  <audio ref="backgroundMusic" src="/lava-loop-3.wav" autoplay loop></audio>
</template>

<style scoped>
@media (max-width: 400px) {
  .section {
    height: unset;
  }
}
</style>
