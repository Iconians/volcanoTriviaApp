<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  isModalOpen: Boolean,
  closeModal: Function
})

const emit = defineEmits(['click'])

const onClick = () => {
  props.closeModal?.()
  emit('click')
}

console.log(props.isModalOpen)
</script>

<template>
  <section class="parent">
    <div :class="{ isModalOpen: props.isModalOpen, modal: true }">
      <div class="modal-content">
        <h4>Warning</h4>
        <FontAwesomeIcon :icon="faTimes" @click="onClick" />
      </div>
      <div>
        <p>Play the Master Game at your own risk</p>
        <p>
          there are 100 questions to answer so if you think you can prove your as smart as a
          Volcanologist give it a shot
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.parent .isModalOpen {
  display: block;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  /* background-color: #fefefe; */
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>
