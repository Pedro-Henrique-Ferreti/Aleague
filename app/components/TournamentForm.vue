<template>
  <div class="container-sm flex justify-between mb-2">
    <div>
      <h1 class="text-3xl font-medium mb-0.5">Novo campeonato</h1>
      <p>Nome, formato e participantes</p>
    </div>
    <TournamentFormImportButton />
  </div>
  <form
    class="max-w-20 mx-auto"
    @submit.prevent="submitForm"
  >
    <AppInput
      v-model="form.name"
      label="Nome do campeonato"
      name="name"
    />
    <AppSelect
      v-model="form.format"
      label="Formato"
      :options="TOURNAMENT_FORMAT_OPTIONS"
    />
    <AppButton
      class="btn-secondary btn-block mt-2"
      label="Criar campeonato"
      type="submit"
      :disabled="submitIsDisabled"
    />
  </form>
</template>

<script lang="ts" setup>
const tournamentStore = useTournamentStore();

const newForm = (): TournamentForm => ({
  name: '',
  format: TournamentFormat.ALL_PLAY_ALL,
});

const form = ref<TournamentForm>(newForm());

const submitIsDisabled = computed(() => !form.value.name);

function submitForm() {
  const tournament = tournamentStore.createTournament(form.value);

  form.value = newForm();
  
  tournamentStore.activeTournamentId = tournament.id;
}
</script>
