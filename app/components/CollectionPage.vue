<template>
  <div>
    {{ collectionStore.activeCollection?.name }}
  </div>
</template>

<script setup lang="ts">
const collectionStore = useCollectionStore();
</script>
