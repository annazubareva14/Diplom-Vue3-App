import { ref } from 'vue'

export default function useCounter(initialValue?: number) {
  const count = ref(initialValue || 0)

  function add() {
    count.value++
  }

  return { count, add }
}