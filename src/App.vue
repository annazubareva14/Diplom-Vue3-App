<template>
  <div>
    <div class="main">
      <div class="main__left">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        <img alt="Itmo logo" class="logo" src="@/assets/itmo.png" width="125" height="125" />
      </div>

      <div class="main__right">
        <BaseButton class="main__button" text="ADD" @click="openItemModal" />

        <BaseItem
          v-for="(item, index) in itemsList"
          :key="item.id"
          :title="item.title"
          @edit="openItemModal(index)"
          @delete="deleteItem(item.id)"
          @increase="(value) => onIncrease(value, index)"
        />
      </div>
    </div>

    <item-modal
      :title="typeof currentItemIndex === 'number' ? itemsList[currentItemIndex]?.title : ''"
      :is-visible="isModalVisible"
      :is-editing="typeof currentItemIndex === 'number'"
      @close="closeModal"
      @save="saveItem"
    />
  </div>
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker'
import { ref, onMounted } from 'vue'
import type { TBaseItem } from './types'

import BaseItem from './components/BaseItem.vue'
import BaseButton from './components/BaseButton.vue'
import ItemModal from './components/ItemModal.vue'

const itemsList = ref<TBaseItem[]>([])
const isModalVisible = ref<boolean>(false)
const currentItemIndex = ref<number | undefined>(undefined)

const generateItemsList = (num: number) => {
  for (let i = 0; i <= num; i++) {
    itemsList.value.push({
      title: faker.commerce.product(),
      quantity: 1,
      id: faker.string.uuid()
    })
  }
}

onMounted(() => {
  generateItemsList(7)
})

const onIncrease = (value: number, index: number) => {
  itemsList.value[index].quantity = value
}

const openItemModal = (index?: number) => {
  if (typeof index === 'number') {
    currentItemIndex.value = index
  }

  isModalVisible.value = true
}

const saveItem = (title: string) => {
  if (typeof currentItemIndex.value === 'number') {
    itemsList.value[currentItemIndex.value].title = title
  } else {
    itemsList.value.push({
      title,
      quantity: 1,
      id: faker.string.uuid()
    })
  }

  currentItemIndex.value = undefined
  isModalVisible.value = false
}
const closeModal = () => {
  isModalVisible.value = false
  currentItemIndex.value = undefined
}

const deleteItem = (id?: TBaseItem['id']) => {
  if (!id) {
    return
  }

  itemsList.value = itemsList.value.filter((item) => item.id !== id)
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;

  &__left {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__right {
    background-color: #34495e;
    padding: 20px;
    min-width: 400px;
    border-radius: 30px;
  }

  &__button {
    margin-bottom: 20px;
  }
}

.logo {
  display: block;
  width: 100%;
}
</style>
