<template>
  <AppCard title="Rivais">
    <div class="rivals">
      <div class="rivals__container">
        <swiper-container
          space-between="12"
          slides-per-view="auto"
        >
          <swiper-slide
            v-for="item in team.rivals"
            class="rivals__rival-team-slide"
            :key="item.id"
          >
            <ViewTeamRivalsItem
              :team="item"
              @remove="rivalToRemove = item"
            />
          </swiper-slide>
        </swiper-container>
      </div>
      <button
        v-tooltip="'Adicionar rival'"
        class="rivals__button-add"
        type="button"
        @click="addRivalModalIsOpen = true"
      >
        <IconPlus />
      </button>
    </div>
    <AppModal
      title="Adicionar rival"
      id="add-rival-modal"
      confirm-button-text="Adicionar"
      :show="addRivalModalIsOpen"
      :confirm-button-is-loading="isAddingRival"
      @close="addRivalModalIsOpen = false"
      @confirm="addRival"
    >
      <AppDropdown
        v-model="selectedRivalTeamId"
        id="add-rival-modal--dropdown"
        label="Equipe rival"
        rounded
        :options="rivalTeamOptions"
      />
    </AppModal>
    <AppModal
      title="Remover rival"
      id="remove-rival-modal"
      format="dialog"
      :show="!!rivalToRemove"
      :confirm-button-is-loading="isRemovingRival"
      @close="rivalToRemove = null"
      @confirm="removeRival"
    >
      <p>
        Você tem certeza que deseja remover o rival
        <b class="rivals__remove-rival-name">
          {{ rivalToRemove?.name }}?
        </b>
      </p>
    </AppModal>
  </AppCard>
</template>

<script lang="ts" setup>
import type { DropdownOption } from '@/types/Dropdown';
import type { ApiGetAllTeamsResponse, RivalTeam, TeamDetails } from '@/types/Team';
import { computed, ref, type PropType } from 'vue';
import { useToast } from '@/composables/toast';
import IconPlus from '@/assets/icons/IconPlus.svg';
import api from '@/api';
import AppCard from './AppCard.vue';
import AppModal from './AppModal.vue';
import AppDropdown from './AppDropdown.vue';
import ViewTeamRivalsItem from './ViewTeamRivalsItem.vue';

const toast = useToast();

const emit = defineEmits<{
  (e: 'update-rivals', value: RivalTeam[]): void;
}>();
const props = defineProps({
  team: {
    type: Object as PropType<TeamDetails>,
    required: true,
  },
});

// Teams
const teams = ref<ApiGetAllTeamsResponse>([]);
const isLoadingTeams = ref(true);
const errorMessage = ref('');

async function getTeams() {
  isLoadingTeams.value = true;
  errorMessage.value = '';

  try {
    const { data } = await api.teamService.getAllTeams();
    teams.value = data;
  } catch (error: any) {
    errorMessage.value = 'Algo deu errado e não foi possível listar suas equipes.';
  } finally {
    isLoadingTeams.value = false;
  }
}

getTeams();

// Add Rival modal
const addRivalModalIsOpen = ref(false);
const selectedRivalTeamId = ref('');

// Rival team options
const rivalTeamOptions = computed<DropdownOption[]>(() => (
  teams.value.filter((team) => (
    team.id !== props.team.id && !props.team.rivals.map(({ id }) => id).includes(team.id)
  )).map((team) => ({
    id: team.id,
    text: team.name,
    icon: team.emblem.url,
  }))
));

// Add rival
const isAddingRival = ref(false);

async function addRival() {
  if (!selectedRivalTeamId.value) return;

  isAddingRival.value = true;

  try {
    const { data: updatedRivals } = await api.teamService.addRivalToTeam({
      teamId: props.team.id,
      rivalTeamId: selectedRivalTeamId.value,
    });

    toast.success('Rival adicionado com sucesso!');

    emit('update-rivals', updatedRivals);
    addRivalModalIsOpen.value = false;
    selectedRivalTeamId.value = '';
  } catch (error: any) {
    toast.error('Não foi possível adicionar o rival. Por favor, tente novamente.');
  } finally {
    isAddingRival.value = false;
  }
}

// Remove rival
const rivalToRemove = ref<RivalTeam | null>(null);
const isRemovingRival = ref(false);

async function removeRival() {
  if (!rivalToRemove.value) return;

  isRemovingRival.value = true;

  try {
    const { data: updatedRivals } = await api.teamService.removeRivalFromTeam({
      teamId: props.team.id,
      rivalTeamId: rivalToRemove.value.id,
    });

    toast.success('Rival removido com sucesso.');

    emit('update-rivals', updatedRivals);
    rivalToRemove.value = null;
  } catch (error: any) {
    toast.error('Não foi possível remover o rival. Por favor, tente novamente.');
  } finally {
    isRemovingRival.value = false;
  }
}
</script>

<style lang="scss" scoped>
.rivals {
  display: grid;
  grid-template-columns: auto 1fr;
  &__container {
    overflow: hidden;
  }
  &__rival-team-slide {
    width: fit-content;
  }
  &__button-add {
    display: grid;
    place-items: center;
    width: 5rem;
    height: 5rem;
    color: $color--primary;
    background-color: $color--neutral-100;
    border-radius: $radius--medium;
    transition: color $transition--fastest;
    &:hover {
      color: $color--primary-800;
    }
  }
  &__remove-rival-name {
    color: $color--text-strong;
    font-weight: $font-weight--medium;
  }
}
</style>
