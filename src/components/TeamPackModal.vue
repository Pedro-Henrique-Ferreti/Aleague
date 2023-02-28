<template>
  <AppModal
    use-max-height
    id="team-pack-modal"
    title="Pacotes de equipe"
    size="large"
    :show="show"
    :render-footer="!!selectedTeamPack"
    @close="$emit('close')"
  >
    <AppTransition name="fade">
      <LoadingIndicator
        v-if="isLoadingTeamPackDetails"
        class="team-pack-modal__loading-indicator"
      />
      <PackDetails
        v-else-if="selectedTeamPack"
        :name="selectedTeamPack.name"
        :teams="selectedTeamPack.teams"
      />
      <PacksList
        v-else
        :show-loading-indicator="isLoadingTeamPacks"
        @get-team-pack-details="getTeamPackDetails"
      />
    </AppTransition>
    <template #footer>
      <div class="team-pack-modal__footer">
        <AppButton
          color="outline"
          @click="selectedTeamPack = null"
        >
          Voltar
        </AppButton>
        <AppButton
          :is-loading="isApplyingTeamPack"
          @click="handleApplyTeamPack"
        >
          Aplicar pacote
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>

<script lang="ts" setup>
import type { TeamPack } from '@/types/TeamPack';
import { ref, watch } from 'vue';
import { useTeamsStore } from '@/stores/teamsStore';
import { useNotificationStore } from '@/stores/notificationStore';

import AppModal from './AppModal.vue';
import AppTransition from './AppTransition.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import PacksList from './TeamPackModalPacksList.vue';
import PackDetails from './TeamPackModalPackDetails.vue';

const emit = defineEmits(['close']);
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const { getTeamPacks, getTeamPackById, applyTeamPack, getTeams } = useTeamsStore();
const { openSnackbarNotification } = useNotificationStore();

// Mounted lifecycle hook
watch(() => props.show, onMounted);

function onMounted() {
  if (props.show) {
    loadTeamPacks();
    selectedTeamPack.value = null;
  }
}

// Load team packs
const isLoadingTeamPacks = ref(false);

async function loadTeamPacks() {
  isLoadingTeamPacks.value = true;

  try {
    await getTeamPacks();
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: 'Falha ao carregar os pacotes de equipe.',
    });
  } finally {
    isLoadingTeamPacks.value = false;
  }
}

// Team pack details
const isLoadingTeamPackDetails = ref(false);
const selectedTeamPack = ref<TeamPack | null>(null);

async function getTeamPackDetails(id: string) {
  isLoadingTeamPackDetails.value = true;

  try {
    selectedTeamPack.value = await getTeamPackById(id);
  } catch (error) {
    openSnackbarNotification({
      type: 'error',
      message: 'Falha ao carregar os detalhes do pacotes de equipe.',
    });
  } finally {
    isLoadingTeamPackDetails.value = false;
  }
}

// Apply team pack
const isApplyingTeamPack = ref(false);

async function handleApplyTeamPack() {
  if (!selectedTeamPack.value) return;

  isApplyingTeamPack.value = true;

  try {
    await applyTeamPack(selectedTeamPack.value.id);

    openSnackbarNotification({
      message: 'Pacote applicado com sucesso!',
    });

    getTeams();

    emit('close');
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isApplyingTeamPack.value = false;
  }
}
</script>

<style lang="scss" scoped>
.team-pack-modal {
  &__loading-indicator {
   flex: 1;
  }
  &__footer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: flex-end;
    gap: 1rem;
    width: 100%;
    @include for-tablet-portrait-up {
      grid-template-columns: repeat(2, 11rem);
      gap: 1.5rem;
    }
  }
}
</style>
