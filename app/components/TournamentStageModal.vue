<template>
  <AppModal
    ref="modalRef"
    title="Adicionar fase"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <template #trigger="{ open }">
      <AppButton
        class="btn-primary btn-soft"
        label="Adicionar fase"
        :icon-left="IconPlus"
        @click="open"
      />
    </template>
    <AppInput
      v-model="form.name"
      label="Nome"
      name="name"
      input-class="w-full"
    />
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Formato</legend>
      <div class="flex gap-1">
        <AppRadio
          v-model="form.type"
          name="type"
          label="Grupos"
          :value="TournamentStageType.GROUPS"
        />
        <AppRadio
          v-model="form.type"
          name="type"
          label="Eliminatórias"
          :value="TournamentStageType.PLAYOFFS"
        />
      </div>
    </fieldset>
  </AppModal>
</template>

<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const props = defineProps<{
  tournament: Tournament;
}>();

const modalRef = useTemplateRef('modalRef');

const newForm = (): TournamentStageForm => ({
  name: null,
  type: TournamentStageType.GROUPS,
});

const form = ref(newForm());

function submitForm() {
  tournamentStore.addStage(props.tournament.id, form.value);

  modalRef.value?.close();
}

function onOpenModal() {
  form.value = newForm();
}
</script>
