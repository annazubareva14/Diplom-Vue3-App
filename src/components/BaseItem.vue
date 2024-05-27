<template>
  <div class="item">
    <span class="item__text">
      {{ displayedTitle }}
    </span>
    <div class="item__buttons">
      <button class="item__button --add" @click="onAdd">
        <img src="@/assets/icons/plus.svg" width="20" height="20" />
      </button>
      <button class="item__button --edit" @click="$emit('edit')">
        <img src="@/assets/icons/pen.svg" width="20" height="20" />
      </button>
      <button class="item__button --delete" @click="$emit('delete')">
        <img src="@/assets/icons/trash.svg" width="20" height="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import type { TBaseItem } from '../types'
import useCounter from '../composables/useCounter'

const props = defineProps<Omit<TBaseItem, 'quantity'>>()

const emit = defineEmits(['increase', 'edit', 'delete'])
const { count, add } = useCounter(1)

const displayedTitle = computed(() => {
  return count.value <= 1 ? props.title : `${props.title} x ${count.value}`
})

function onAdd() {
  add()
  emit('increase', count.value)
}
</script>

<style lang="scss">
.item {
  width: 100%;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 20px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__button {
    background: transparent;
    border: none;
    padding: 0;
    height: 25px;
    width: 25px;
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>
