<script setup lang="ts">
import { supabase } from '../../supabase.js'
import { ref } from 'vue';

  const scores = ref<{ user_name: any; score: any; }[] | null>([])
  const fetchScores = async () => {
  const { data: score, error: fetchError } = await supabase
    .from('high_score')
    .select('user_name, score')
    .order('score', { ascending: false })
    .limit(10)
  if (fetchError) {
    console.error('Error fetching score: ', fetchError)
  }
  scores.value = score
}

fetchScores();
</script>

<template>
  <section class="highScoreSection h-full w-full text-center bg-stHelensWithPlume bg-cover text-white">
    <div class="pageWrapper flex flex-col justify-around h-full">
    <div class="">
      <h1>High Scores</h1>
    </div>
    <!-- finish designing this portion of the site -->
    <div class="overflow-y-auto h-52">
    <div class="flex m-5 justify-center" v-for="score in scores" :key="score.score">
      <div class="mr-3">{{score.user_name}}</div>
      <div>{{score.score}}</div>
    </div>
    </div>
    <div>
      <router-link class="mr-8" to="/">Back to Home</router-link>
      <router-link to="/userPage">Profile</router-link>
    </div>
  </div>
  </section>

</template>

<style scoped>
.highScoreSection {
  position: relative;
}
  .highScoreSection::before {
  content: "";
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

</style>