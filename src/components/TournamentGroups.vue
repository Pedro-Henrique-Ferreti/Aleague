<template>
  <section class="groups">
    <header class="groups__header">
      <h2 class="groups__title">
        Grupos
      </h2>
      <AppButton
        :icon-left="IconPlus"
        @click="showGroupForm = true"
      >
        Novo Grupo
      </AppButton>
    </header>
    <div class="groups__list">
      <AppAccordion
        v-for="group in tournamentGroups"
        :title="group.name"
        :key="group.id"
      >
        <div class="groups__card-grid">
          <TournamentPreviewCard
            v-for="tournament in group.tournaments"
            :key="tournament.id"
            :tournament="tournament"
          />
        </div>
      </AppAccordion>
    </div>
    <AppModal
      title="Novo grupo"
      confirm-button-text="Adicionar"
      :show="showGroupForm"
      :confirm-button-is-loading="isSaving"
      :confirm-button-is-disabled="!form.groupName || !form.tournaments.length"
      @close="showGroupForm = false"
      @confirm="submitForm"
    >
      <AppInput
        v-model="form.groupName"
        label="Nome do grupo"
      />
      <span class="groups__modal-label">
        Campeonatos
      </span>
      <div class="groups__modal-list">
        <AppToggle
          v-for="tournament in nonGroupedTournaments"
          :model-value="form.tournaments.includes(tournament.id)"
          :key="tournament.id"
          :value="tournament.id"
          :text="tournament.name"
          @update:model-value="onUpdateTournaments(tournament.id)"
        />
      </div>
    </AppModal>
  </section>
</template>

<script lang="ts">
interface TournamentGroup extends TournamentPreviewGroup {
  tournaments: TournamentPreview[];
}
</script>

<script lang="ts" setup>
import type { TournamentPreview, TournamentPreviewGroup } from '@/types/Tournament';
import { computed, ref, watch } from 'vue';
import { isBefore } from 'date-fns';
import { useToast } from '@/composables/toast';
import api from '@/api';
import IconPlus from '@/assets/icons/Plus.svg';
import AppButton from './AppButton.vue';
import AppModal from './AppModal.vue';
import AppInput from './AppInput.vue';
import AppToggle from './AppToggle.vue';
import TournamentPreviewCard from './TournamentPreviewCard.vue';
import AppAccordion from './AppAccordion.vue';

const toast = useToast();

const props = defineProps<{
  tournaments: TournamentPreview[];
  nonGroupedTournaments: TournamentPreview[];
}>();

// Tournament groups
const tournamentGroups = computed<TournamentGroup[]>(() => {
  const groups: TournamentGroup[] = [];

  props.tournaments.filter(({ group }) => !!group).forEach((tournament) => {
    const groupIndex = groups.findIndex((group) => group.id === tournament.group!.id);

    if (groupIndex === -1) {
      groups.push({ ...tournament.group!, tournaments: [tournament] });
    } else {
      groups[groupIndex].tournaments.push(tournament);
    }
  });

  return groups.sort((a, b) => {
    if (isBefore(new Date(a.createdAt), new Date(b.createdAt))) return 1;
    if (!isBefore(new Date(a.createdAt), new Date(b.createdAt))) return -1;
    return 0;
  });
});

// Group form
const form = ref({
  groupName: '',
  tournaments: [] as string[],
});
const showGroupForm = ref(false);

watch(() => showGroupForm.value, (value) => {
  if (!value) {
    form.value.groupName = '';
    form.value.tournaments = [];
  }
});

function onUpdateTournaments(tournamentId: string) {
  if (form.value.tournaments.includes(tournamentId)) {
    form.value.tournaments = form.value.tournaments.filter((id) => id !== tournamentId);
  } else {
    form.value.tournaments.push(tournamentId);
  }
}

// Submit form
const isSaving = ref(false);

async function submitForm() {
  isSaving.value = true;

  try {
    await api.tournamentService.createTournamentGroup({
      name: form.value.groupName,
      competitions: form.value.tournaments,
    });

    showGroupForm.value = false;
  } catch (error: any) {
    toast.error('Nao foi possivel criar o grupo. Por favor, tente novamente.');
  } finally {
    isSaving.value = false;
  }
}
</script>

<style lang="scss" scoped>
.groups {
  margin-top: 2.5rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;
  }
  &__title {
    color: $color--text-strong;
    font-size: 1.25rem;
    font-weight: $font-weight--medium;
  }
  &__list {
    display: grid;
    gap: 1rem;
  }
  &__modal-label {
    display: block;
    margin-top: 1rem;
    color: $color--text-strong;
    font-size: 0.875rem;
  }
  &__modal-list {
    display: grid;
    gap: 0.75rem;
    margin-top: 1rem;
  }
  &__card-grid {
    --columns: 1;
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 0.75rem;
    @include for-large-tablet-portrait-up {
      --columns: 2;
    }
    @media (min-width: 1400px) {
      --columns: 3;
    }
  }
}
</style>
