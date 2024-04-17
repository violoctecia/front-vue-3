<script setup>
import { ref } from 'vue';

const props = defineProps({
  buttonText: {
    type: String,
    default: "Add to cart"
  }
});
</script>

<template>
  <button>
    {{ buttonText }}
  </button>
</template>

<style scoped>
button {
  font-size: 16px;
  background-color: black;
  color: white;
  padding: 10px 10px;
  font-weight: 500;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
button:disabled {
  background-color: rgb(91, 91, 91);
  cursor: not-allowed;
}
</style>
