<template>
  <button class="base-button" role="button" @click="emit('click')">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  text: string
}>();

const emit = defineEmits(['click'])
</script>

<style lang="scss">
.base-button {
  position: relative;
  width: 100%;
  max-width: 400px;
  min-height: 50px;
  padding: 20px 30px;
  border-radius: 10px;
  border: 0 none;
  outline: 0;
  background-color: #1e87be;
  color: #fff;
  font-weight: 700;
  font-size: 24px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #004678;
  }
}
</style>
