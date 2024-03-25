<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { defineEmits, ref } from 'vue'
import warningModal from '@/components/warningModal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

const emit = defineEmits(['click'])
const isModalOpen = ref(false)

const openModal = () => {
  console.log(isModalOpen.value)
  isModalOpen.value = true
  console.log(isModalOpen.value)
}

const closeModal = () => {
  console.log(isModalOpen.value)
  isModalOpen.value = false
  console.log(isModalOpen.value)
}

const listenForAudioClick = () => {
  emit('click')
}

const props = defineProps({
  playing: Boolean
})
const isPlaying = () => props.playing && props.playing === true
</script>

<template>
  <div class="text-wrapper text-white bg-black/50 p-12 rounded-3xl relative">
    <div>
      <h1 class="text-3xl">Volcano Quiz</h1>
      <p class="text-2xl font-thin">Are you smart enough to be a volcanologist?</p>
    </div>
    <warningModal :isModalOpen="isModalOpen" :closeModal="closeModal" />
    <RouterLink class="text-2xl text-center m-2" to="/gamePage">Normal Game</RouterLink>
    <RouterLink class="text-2xl text-center m-2" to="/godModeGamePage">Master Game</RouterLink>
    <RouterLink class="text-2xl text-center m-2" to="/userPage">Profile</RouterLink>
    <RouterLink class="text-2xl text-center m-2" to="/totals">High Scores</RouterLink>
    <FontAwesomeIcon
      v-if="!isPlaying()"
      :icon="faVolumeHigh"
      class="text-white cursor-pointer"
      @click="listenForAudioClick"
    />
    <FontAwesomeIcon
      v-if="isPlaying()"
      :icon="faVolumeXmark"
      class="text-white cursor-pointer"
      @click="listenForAudioClick"
    />
    <button @click="openModal" class="">WARNING</button>
  </div>
</template>
