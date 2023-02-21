<template>
  <div class="competition-matches-controls">
    <AppButton
      color="outline"
      aria-label="Apagar resultados"
      title="Apagar resultados"
      icon-left="trash-can-outline"
    />
    <SaveButton
      :is-loading="isSavingGames"
      @click="$emit('save-games')"
    />
  </div>
</template>

<script lang="ts" setup>
import SaveButton from './SaveButton.vue';

defineEmits(['save-games']);
defineProps({
  isSavingGames: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.competition-matches-controls {
  display: flex;
  gap: 1rem;
}
</style>
