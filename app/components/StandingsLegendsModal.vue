<template>
  <AppModal
    v-model:is-open="stageStore.legendsModalIsOpen"
    title="Editar legendas"
  />
</template>

<script lang="ts" setup>
const stageStore = useStageStore();
</script>
