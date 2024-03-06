<script setup lang="ts">
import { supabase } from '../../supabase.js'
import { ref } from 'vue'
import ScoresComp from '../components/scoresComp.vue'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

const scores = ref<{ user_name: string; score: number }[] | null>([])
const fetchScores = async () => {
  const { data: score, error: fetchError } = await supabase
    .from('high_score')
    .select('user_name, score')
    .order('score', { ascending: false })
    .limit(10)
  if (fetchError) {
    toast.error('Error fetching scores')
  }
  scores.value = score
}

fetchScores()
</script>

<template>
  <section
    class="highScoreSection section h-full w-full text-center bg-stHelensWithPlume bg-cover text-white"
  >
    <div class="pageWrapper flex flex-col justify-around h-full">
      <div class="">
        <h1 class="text-3xl">High Scores</h1>
      </div>
      <scores-comp :scores="scores" />
      <div>
        <router-link class="mr-8 text-2xl" to="/">Back to Home</router-link>
        <router-link class="text-2xl" to="/userPage">Profile</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.highScoreSection {
  position: relative;
}
.highScoreSection::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: black;
  opacity: 0.4;
  z-index: 1;
}
.pageWrapper {
  position: relative;
  z-index: 2;
}

.scroll::-webkit-scrollbar {
  width: 10px;
}

.scroll::-webkit-scrollbar-track {
  background: none;
}
</style>
