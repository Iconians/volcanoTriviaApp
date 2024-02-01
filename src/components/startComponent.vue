<script setup lang="ts">
  import { RouterLink } from 'vue-router'
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
export default defineComponent({
  name: 'startComponent'
});
</script>

<template>
    <div class="text-wrapper text-white">
    <div>
      <h1 class="text-2xl">Volcano Quiz</h1>
      <p>Are you smart enough to be a volcanologist?</p>
    </div>
        <RouterLink class="text-xl text-center" to="/gamePage">start Game</RouterLink>
        <RouterLink class="text-xl text-center" to="/userPage">Profile</RouterLink>
        <RouterLink class="text-xl text-center" to="/totals">High Scores</RouterLink>
    </div>
</template>


