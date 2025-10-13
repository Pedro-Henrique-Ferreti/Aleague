<template>
  <div class="w-full">
    <input
      v-model="name"
      type="text"
      class="w-full text-lg text-center font-medium"
      :id="inputId"
    >
  </div>
</template>

<script lang="ts" setup>
const inputId = useId();

const name = defineModel<PlayoffRound['name']>('name', { required: true });
</script>
