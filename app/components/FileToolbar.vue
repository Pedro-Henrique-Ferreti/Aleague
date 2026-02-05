<template>
  <div class="flex justify-end gap-0.5">
    <AppButton
      class="btn-ghost px-0.5 bg-transparent"
      label="Duplicar"
      :icon-left="IconLayersSubtract"
      @click="tournamentStore.duplicateTournament(tournamentId)"
    />
    <AppButton
      class="btn-ghost px-0.5 bg-transparent"
      label="Editar"
      :icon-left="IconEdit"
      @click="tournamentModalIsOpen = true"
    />
    <AppButton
      class="btn-accent btn-soft ml-0.5"
      label="Salvar"
      :icon-left="IconDownload"
      @click="tournamentStore.exportTournament(tournamentId)"
    />
  </div>
  <TournamentFormModal
    v-if="tournamentStore.activeTournament"
    v-model:is-open="tournamentModalIsOpen"
    :key="tournamentId"
    :tournament="tournamentStore.activeTournament"
    :submit-fn="(form) => tournamentStore.updateTournament(tournamentId, form)"
  />
</template>

<script lang="ts" setup>
import { IconLayersSubtract, IconEdit, IconDownload } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const tournamentId = computed(() => tournamentStore.activeTournamentId!);

// Tournament modal
const tournamentModalIsOpen = ref(false);
</script>
