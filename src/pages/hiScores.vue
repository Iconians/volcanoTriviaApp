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
  <section class="h-full w-full text-center bg-stHelensWithPlume bg-cover">
    <div class="flex flex-col justify-around h-full">
    <div class="">
      <h1>High scores</h1>
    </div>
    <!-- finish designing this portion of the site -->
    <div class="overflow-y-auto ">
    <div class="flex m-5 justify-center" v-for="score in scores" :key="score.score">
      <div>{{score.user_name}}</div>
      <div>{{score.score}}</div>
    </div>
    </div>
    <div>
      <router-link to="/">Back to Home</router-link>
      <router-link to="/userPage">Profile</router-link>
    </div>
  </div>
  </section>

</template>