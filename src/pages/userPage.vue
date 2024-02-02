<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../../supabase';
import { RouterLink } from 'vue-router'
import router from '@/router';

interface Score {
  correct: number;
  incorrect: number;
}

const newPassword = ref('');

const AuthUser = localStorage.getItem('user');
const Authuser = AuthUser !== null ? JSON.parse(AuthUser) : null;

const userName = ref('');
const userScore = ref<Score[]>([]);
const formError = ref('');

function safeParse(jsonString: string) {
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

findUser();

const signOut = async () => {
  let {error} = await supabase.auth.signOut();
  if (!error) {
    localStorage.removeItem('user');
    router.push('/');
  }
}

const updatePassword = async (e: Event) => {
  e.preventDefault();
  console.log(newPassword.value)
  const update = await supabase.auth.updateUser({ password: newPassword.value })
  console.log(update);
  if (update.error) {
    formError.value = update.error.message;
  }
  else {
    formError.value = 'Password updated';
  }
}

</script>

<template>
  <section class="section height h-full w-full text-center text-white bg-activeVolcano bg-cover"  >
    <div>{{ userName }}'s Profile</div>
    <div class="flex m-8 justify-around w-3/4">
    <div class="h-52 overflow-y-auto scroll">
      <div>Score History</div>
      <div v-for="score in userScore" :key="score.correct" class="flex">
        <div class="m-2">Correct: {{ score.correct }}</div>
        <div class="m-2">Incorrect: {{ score.incorrect }}</div>
      </div>
    </div>
    <div class="m-8">
      <div class="mb-5">Update Password</div>
      <form class="flex flex-col " @submit="updatePassword">
      <input v-model="newPassword" class="text-black rounded h-8" placeholder="Change Password" type="password"/>
      <input class="mt-5 bg-brown-500 rounded h-10" type="submit" value="change password">
    </form>
    <div class="mt-5" v-if="formError.length">{{ formError }}</div>
    </div>
  </div>

    <div class="flex flex-col mt-5 mb-5">
      <router-link class="flex items-center justify-center bg-brown-500 rounded h-10 mb-5 w-28" to="/">Back to start</router-link>
      <button class="bg-brown-500 rounded h-10 mt-5 w-28" @click="signOut">Sign Out</button>
    </div>
  </section>

</template>


<style scoped >
.scroll::-webkit-scrollbar {
    width: 10px;
}

.scroll::-webkit-scrollbar-track {
    background: none;
}
</style>