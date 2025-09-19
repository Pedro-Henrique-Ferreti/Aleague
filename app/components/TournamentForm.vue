<template>
  <div class="container-sm flex justify-between mb-2">
    <div>
      <h1 class="text-3xl font-medium mb-0.5">Novo campeonato</h1>
      <p>Nome, formato e participantes</p>
    </div>
    <AppButton
      class="btn-primary"
      label="Importar"
      :icon-left="IconFileArrowLeft"
    />
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
    <AppButton
      class="btn-secondary btn-block mt-2"
      label="Criar campeonato"
      type="submit"
      :disabled="submitIsDisabled"
    />
  </form>
</template>

<script lang="ts" setup>
import { IconFileArrowLeft } from '@tabler/icons-vue';
import type { Tournament } from '~/types/Tournament';
import type { TournamentForm } from '~/types/TournamentStore';

const tournamentStore = useTournamentStore();

const emit = defineEmits<{
  (e: 'created', value: Tournament): void;
}>();

const newForm = (): TournamentForm => ({
  name: '',
});

const form = ref<TournamentForm>(newForm());

const submitIsDisabled = computed(() => !form.value.name);

function submitForm() {
  const tournament = tournamentStore.createTournament(form.value);

  form.value = newForm();
  
  emit('created', tournament);
}
</script>
