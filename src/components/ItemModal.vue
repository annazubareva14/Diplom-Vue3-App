<template>
  <base-modal :is-visible="isVisible" @close="emit('close')">
    <template #content>
      <input class="item-modal__input" type="text" v-model="newValue" />
      <base-button :text="buttonText" @click="emit('save', value)" />
    </template>
  </base-modal>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'

import { ref, defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  isVisible: boolean
  title: string
  isEditing: boolean
}>()

const emit = defineEmits(['close', 'save'])

const value = ref('')

const newValue = computed({
  get() {
    return props.title
  },

  set(newValue) {
    value.value = newValue
  }
})

const buttonText = computed(() => {
  return props.isEditing ? 'EDIT' : 'ADD'
})
</script>

<style lang="scss">
.item-modal {
  &__input {
    border: 1px solid gray;
    border-radius: 10px;
    background: transparent;
    width: 100%;
    padding: 5px 8px;
    font-size: 20px;
    height: 50px;
    margin-bottom: 20px;
  }
}
</style>
