<template>
  <section class="groups">
    <header
      v-if="nonGroupedTournaments.length > 0"
      class="groups__header"
    >
      <h2 class="groups__title">
        Grupos
      </h2>
      <AppButton
        :icon-left="IconPlus"
        @click="shouldCreateGroup = true"
      >
        Novo Grupo
      </AppButton>
    </header>
    <div class="groups__list">
      <AppAccordion
        v-for="(group, index) in tournamentGroups"
        :title="group.name"
        :key="group.id"
        :initial-open="index === tournamentGroups.length - 1"
      >
        <div class="groups__card-header">
          <AppTextButton
            color="dark"
            :icon-left="IconCopy"
            @click="groupToCopy = group"
          >
            Copiar
          </AppTextButton>
          <AppTextButton
            color="dark"
            :icon-left="IconPencil"
            @click="groupToEdit = group"
          >
            Editar
          </AppTextButton>
          <AppTextButton
            color="dark"
            :icon-left="IconGraphLine"
          >
            Ver estatísticas
          </AppTextButton>
        </div>
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
      confirm-button-text="Salvar"
      :title="modalTitle"
      :show="modalIsOpen"
      :confirm-button-is-loading="isSaving"
      :confirm-button-is-disabled="modalSubmitIsDisabled"
      @close="closeModal"
      @confirm="submitForm"
    >
      <AppInput
        v-model="form.groupName"
        label="Nome do grupo"
      />
      <template v-if="!groupToCopy">
        <span class="groups__modal-label">
          Campeonatos
        </span>
        <div class="groups__modal-list">
          <AppToggle
            v-for="tournament in groupToEdit?.tournaments || nonGroupedTournaments"
            :model-value="form.tournaments.includes(tournament.id)"
            :key="tournament.id"
            :value="tournament.id"
            :text="tournament.name"
            @update:model-value="onUpdateTournaments(tournament.id)"
          />
        </div>
      </template>
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
import IconPencil from '@/assets/icons/Pencil.svg';
import IconCopy from '@/assets/icons/Copy.svg';
import IconGraphLine from '@/assets/icons/GraphLine.svg';
import AppButton from './AppButton.vue';
import AppModal from './AppModal.vue';
import AppInput from './AppInput.vue';
import AppToggle from './AppToggle.vue';
import AppAccordion from './AppAccordion.vue';
import AppTextButton from './AppTextButton.vue';
import TournamentPreviewCard from './TournamentPreviewCard.vue';

const toast = useToast();

defineProps<{
  nonGroupedTournaments: TournamentPreview[];
}>();
const tournaments = defineModel<TournamentPreview[]>('tournaments', { required: true });

// Tournament groups
const tournamentGroups = computed<TournamentGroup[]>(() => {
  const groups: TournamentGroup[] = [];

  tournaments.value.filter(({ group }) => !!group).forEach((tournament) => {
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

const groupToEdit = ref<TournamentGroup | null>(null);
const groupToCopy = ref<TournamentGroup | null>(null);

watch(() => groupToEdit.value, (group) => {
  if (group) {
    form.value.groupName = group.name;
    form.value.tournaments = group.tournaments.map(({ id }) => id);
  }
});

function onUpdateTournaments(tournamentId: string) {
  if (form.value.tournaments.includes(tournamentId)) {
    form.value.tournaments = form.value.tournaments.filter((id) => id !== tournamentId);
  } else {
    form.value.tournaments.push(tournamentId);
  }
}

// Modal
const shouldCreateGroup = ref(false);
const modalIsOpen = computed(() => (
  !!groupToEdit.value || !!groupToCopy.value || shouldCreateGroup.value
));

const modalTitle = computed(() => {
  if (groupToCopy.value) return 'Copiar grupo';
  return groupToEdit.value ? 'Editar grupo' : 'Novo grupo';
});

const modalSubmitIsDisabled = computed(() => (
  !form.value.groupName || (shouldCreateGroup.value && !form.value.tournaments.length)
));

watch(() => modalIsOpen.value, (value) => {
  if (!value) {
    form.value.groupName = '';
    form.value.tournaments = [];
    groupToEdit.value = null;
  }
});

function closeModal() {
  groupToEdit.value = null;
  groupToCopy.value = null;
  shouldCreateGroup.value = false;
}

// Submit form
const isSaving = ref(false);

async function submitForm() {
  isSaving.value = true;

  try {
    if (groupToCopy.value) {
      await api.tournamentService.copyTournamentGroup({
        id: groupToCopy.value.id,
        name: form.value.groupName,
      });
    } else if (groupToEdit.value) {
      await api.tournamentService.updateTournamentGroup({
        id: groupToEdit.value!.id,
        name: form.value.groupName,
        competitions: form.value.tournaments,
      });
    } else {
      await api.tournamentService.createTournamentGroup({
        name: form.value.groupName,
        competitions: form.value.tournaments,
      });
    }

    const { data } = await api.tournamentService.getAllTournaments();

    closeModal();
    tournaments.value = data;
  } catch (error: any) {
    toast.error('Não foi possível salvar. Por favor, tente novamente.');
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
  &__card-header {
    display: flex;
    justify-content: flex-end;
    gap: 1.25rem;
    margin-bottom: 1rem;
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
