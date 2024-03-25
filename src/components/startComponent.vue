<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { defineEmits, ref } from 'vue'
import warningModal from '@/components/warningModal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

const emit = defineEmits(['click'])
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
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
    <RouterLink class="text-2xl text-center m-2 onHover" to="/gamePage">Normal Game</RouterLink>
    <RouterLink class="text-2xl text-center m-2 onHover" to="/godModeGamePage"
      >Master Game</RouterLink
    >
    <RouterLink class="text-2xl text-center m-2 onHover" to="/userPage">Profile</RouterLink>
    <RouterLink class="text-2xl text-center m-2 onHover" to="/totals">High Scores</RouterLink>
    <FontAwesomeIcon
      v-if="!isPlaying()"
      :icon="faVolumeHigh"
      class="text-white cursor-pointer onHover"
      @click="listenForAudioClick"
    />
    <FontAwesomeIcon
      v-if="isPlaying()"
      :icon="faVolumeXmark"
      class="text-white cursor-pointer onHover"
      @click="listenForAudioClick"
    />
    <button @click="openModal" class="mt-[20px] color-change">WARNING</button>
  </div>
</template>

<style scoped>
.text-wrapper {
  height: 350px;
}

.onHover:hover {
  animation: colorChange 2s infinite;
}

.color-change {
  animation: colorChange 1s infinite;
}

@keyframes colorChange {
  0% {
    color: red;
  }
  50% {
    color: yellow;
  }
  100% {
    color: red;
  }
}
</style>
