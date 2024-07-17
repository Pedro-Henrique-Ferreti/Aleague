<template>
  <AppCard title="Rivais">
    <div class="rivals">
      <button
        v-for="item in team.rivals"
        v-tooltip="item.name"
        class="rivals__rival-team"
        type="button"
        :key="item.id"
      >
        <img
          class="rivals__rival-team-emblem"
          :src="item.emblem.url"
          :alt="`${item.name}'s emblem'`"
        />
      </button>
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
  </AppCard>
</template>

<script lang="ts" setup>
import type { DropdownOption } from '@/types/Dropdown';
import type { ApiGetAllTeamsResponse, TeamDetails } from '@/types/Team';
import { computed, ref, type PropType } from 'vue';
import { useToast } from '@/composables/toast';
import IconPlus from '@/assets/icons/IconPlus.svg';
import api from '@/api';
import AppCard from './AppCard.vue';
import AppModal from './AppModal.vue';
import AppDropdown from './AppDropdown.vue';

const toast = useToast();

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
    await api.teamService.addRivalToTeam({
      teamId: props.team.id,
      rivalTeamId: selectedRivalTeamId.value,
    });

    toast.success('Rival adicionado com sucesso!');

    addRivalModalIsOpen.value = false;
    selectedRivalTeamId.value = '';
  } catch (error: any) {
    toast.error('Não foi possível adicionar o rival. Por favor, tente novamente.');
  } finally {
    isAddingRival.value = false;
  }
}
</script>

<style lang="scss" scoped>
.rivals {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  &__rival-team {
    display: grid;
    place-items: center;
    width: 5rem;
    height: 5rem;
    border: 1px solid $color--neutral-100;
    border-radius: $radius--medium;
  }
  &__rival-team-emblem {
    max-width: 4rem;
    max-height: 4rem;
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
}
</style>
