<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../../supabase';
import { RouterLink } from 'vue-router'
import router from '@/router';

interface Score {
  correct: number;
  incorrect: number;
}

const AuthUser = localStorage.getItem('user');
const Authuser = AuthUser !== null ? JSON.parse(AuthUser) : null;

const userName = ref('');
const userScore = ref<Score[]>([]);

function safeParse(jsonString: string): any {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON string:', error);
    return null;
  }
}

const findUser = async () => {
  const user = await supabase.from('profile').select('display_name, score').eq('user_id', Authuser.id);
  if (user.data !== null) {
    userName.value = user.data[0].display_name;
    const parsedScores = user.data[0].score.map(safeParse).filter(Boolean);
    if (parsedScores !== null) {
      userScore.value = parsedScores;
    }
  }
}

const signOut = async () => {
  let {error} = await supabase.auth.signOut();
  if (!error) {
    localStorage.removeItem('user');
    router.push('/');
  }
}
findUser();

</script>

<template>
  <section class="section height h-full w-full text-center text-white"  >
    <div>{{ userName }}'s Profile</div>
    <div>
      <div>{{ userName }}'s Score History</div>
      <div v-for="score in userScore" :key="score.correct" class="flex ">
        <div>Correct: {{ score.correct }}</div>
        <div>Incorrect: {{ score.incorrect }}</div>
      </div>
    </div>
    <div>
      <router-link to="/">Back to start</router-link>
      <button @click="signOut">Sign Out</button>
    </div>
   </section>

</template>