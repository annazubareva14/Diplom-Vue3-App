<template>
  <Transition name="modal">
    <div v-show="isVisible" class="modal-mask">
      <div class="modal__container">
        <div class="modal">
          <div class="modal__close" @click="emit('close')" />
          <slot name="content" class="modal__content" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  isVisible: boolean
}>()

const emit = defineEmits(['close'])
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}
.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 30px 45px 30px 30px;
  min-width: 300px;
  max-width: 350px;
  min-height: 100px;
  background-color: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 0 12px 30px 0 rgba(0, 70, 120, 0.05);
  box-shadow: 0 12px 30px 0 rgba(0, 70, 120, 0.05);
  animation: toggle-modal 0.3s ease forwards;

  &__container {
    margin: auto;
    transition: all 0.3s ease;
  }

  &__content {
    padding-right: 30px;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 32px;
    height: 32px;
    transition: 0.3s;

    &:before,
    &:after {
      position: absolute;
      left: 15px;
      content: '';
      height: 33px;
      width: 3px;
      background-color: #fab91e;
      border-radius: 3px;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }

  @media (min-width: 704px) {
    max-width: 450px;
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal__container,
.modal-leave-to .modal__container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
