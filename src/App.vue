<template>
  <button @click="increment">
    {{ counter }}
  </button>
</template>

<script setup>
import { ref } from 'vue';

const counter = ref(0);

function increment() {
  counter.value++;
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
