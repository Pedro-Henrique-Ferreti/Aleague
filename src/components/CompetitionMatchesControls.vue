<template>
  <div class="competition-matches-controls">
    <AppButton
      color="outline"
      aria-label="Apagar resultados"
      title="Apagar resultados"
      icon-left="trash-can-outline"
      @click="showResetResultsModal = true"
    />
    <SaveButton
      :is-loading="isSavingGames"
      @click="$emit('save-games')"
    />
    <ModalResetResults
      :show="showResetResultsModal"
      @close="closeResetResultsModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SaveButton from './SaveButton.vue';
import ModalResetResults from './CompetitionModalResetResults.vue';

defineEmits(['save-games']);
defineProps({
  isSavingGames: {
    type: Boolean,
    default: false,
  },
});

const showResetResultsModal = ref(false);

function closeResetResultsModal() {
  showResetResultsModal.value = false;
}
</script>

<style lang="scss" scoped>
.competition-matches-controls {
  display: flex;
  gap: 1rem;
}
</style>
