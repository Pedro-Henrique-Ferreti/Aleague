<template>
  <AppModal
    id="team-list-modal"
    format="drawer"
    :title="teamList?.name || ''"
    :show="!!teamList"
    @close="$emit('close')"
  >
    <template #header-icon>
      <CountryFlag :country="teamList?.teams[0].country" />
    </template>
    <p>As seguintes equipes serão adicionadas a sua conta:</p>
    <ul class="team-list">
      <li
        v-for="(team, index) in teamList?.teams"
        class="team-list__item"
        :key="index"
        :data-disabled="team.exists"
      >
        <div class="team-list__item-emblem">
          <img
            class="team-list__item-emblem-image"
            :src="team.emblem_url"
            :alt="`${team.name}'s emblem`"
          />
        </div>
        <span>{{ team.name }}</span>
      </li>
    </ul>
    <template #footer-confirm>
      <AppButton
        :is-loading="isLoading"
        :disabled="submitButtonIsDisabled"
        @click="applyTeamList"
      >
        Adicionar equipes
      </AppButton>
    </template>
  </AppModal>
</template>

<script lang="ts" setup>
import type { TeamList } from '@/types/Team';
import { computed, ref, type PropType } from 'vue';
import { useToast } from '@/composables/toast';
import api from '@/api';
import AppModal from './AppModal.vue';
import AppButton from './AppButton.vue';
import CountryFlag from './CountryFlag.vue';

const toast = useToast();

const emit = defineEmits(['list-applied', 'close']);
const props = defineProps({
  teamList: {
    type: Object as PropType<TeamList | null>,
    default: null,
  },
});

const submitButtonIsDisabled = computed(() => (
  !props.teamList || props.teamList.teams.every((team) => team.exists)
));

// Apply team list
const isLoading = ref(false);

async function applyTeamList() {
  if (!props.teamList) return;

  isLoading.value = true;

  try {
    await api.teamService.applyTeamList(props.teamList?.id);

    toast.success('Equipes adicionadas com sucesso!');

    emit('list-applied');
    emit('close');
  } catch (error: any) {
    toast.error('Não foi possivel adicionar as equipes. Por favor, tente novamente.');
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.team-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 2rem;
  margin-top: 1rem;
  &__item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    &[data-disabled="true"] {
      color: $color--text-400;
      text-decoration: line-through;
    }
    span {
      flex: 1;
    }
  }
  &__item-emblem {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.25rem;
    background-color: $color--neutral-200;
    border-radius: $radius--medium;
  }
  &__item-emblem-image {
    width: 2rem;
    height: 2rem;
  }
}
</style>
