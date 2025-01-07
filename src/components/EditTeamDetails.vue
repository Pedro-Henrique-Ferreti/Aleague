<template>
  <div class="team-details | app-base-card">
    <div class="team-details__item">
      <b>Criado em</b>
      <span>{{ formatDate(team.createdAt, 'd MMMM yyyy') }}</span>
    </div>
    <div class="team-details__item">
      <b>Última atualização em</b>
      <span>{{ formatDate(team.updatedAt, 'd MMMM yyyy') }}</span>
    </div>
    <AppButton
      block
      color="danger"
      :icon-left="IconDelete"
      :is-loading="isDeletingTeam"
      @click="showDeleteModal = true"
    >
      Excluir equipe
    </AppButton>
  </div>
  <AppDeleteModal
    title="Excluir equipe"
    :show="showDeleteModal"
    @close="showDeleteModal = false"
    @confirm="deleteTeam"
  >
    <p>Tem certeza que deseja excluir essa equipe? Essa ação não poderá ser desfeita.</p>
  </AppDeleteModal>
</template>

<script lang="ts" setup>
import type { TeamDetails } from '@/types/Team';
import { ref, type PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '@/composables/toast';
import { formatDate } from '@/utils';
import api from '@/api';
import IconDelete from '@/assets/icons/Delete.svg';
import AppButton from './AppButton.vue';
import AppDeleteModal from './AppDeleteModal.vue';

const router = useRouter();
const toast = useToast();

const props = defineProps({
  team: {
    type: Object as PropType<TeamDetails>,
    required: true,
  },
});

// Delete modal
const showDeleteModal = ref(false);

// Delete team
const isDeletingTeam = ref(false);

async function deleteTeam() {
  isDeletingTeam.value = true;
  showDeleteModal.value = false;

  try {
    await api.teamService.deleteTeam(props.team.id);

    toast.success('Equipe excluída com sucesso.');

    router.push({ name: 'teams' });
  } catch (error: any) {
    toast.error('Algo deu errado e não foi possível excluir a equipe.');
  } finally {
    isDeletingTeam.value = false;
  }
}
</script>

<style lang="scss" scoped>
.team-details {
  &__item {
    display: grid;
    grid: 0.25rem;
    margin-bottom: 1rem;
    &:last-of-type {
      margin-bottom: 2rem;
    }
    b {
      color: $color--text-strong;
      font-weight: $font-weight--medium;
    }
  }
}
</style>
