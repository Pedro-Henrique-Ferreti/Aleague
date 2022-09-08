<template>
  <AppModal
    :title="modalTitle"
    :show="show"
    @close="$emit('close')"
  >
    <LoadingIndicator v-if="isLoadingTeamDetails" />
  </AppModal>
</template>

<script lang="ts" setup>
import type { Team } from '@/types/Team';
import { computed, ref, watch } from 'vue';
import { useTeamsStore } from '@/stores/teamsStore';
import { useNotificationStore } from '@/stores/notificationStore';
import AppModal from './AppModal.vue';
import LoadingIndicator from './LoadingIndicator.vue';

const { openSnackbarNotification } = useNotificationStore();
const { getTeamById } = useTeamsStore();

defineEmits(['close']);
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  teamName: {
    type: String,
    default: '',
  },
  teamId: {
    type: String,
    default: '',
  },
});

const modalTitle = computed(() => {
  return props.teamName
    ? `Equipes - ${props.teamName}`
    : 'Equipes';
});

// Mounted lifecycle hook
watch(() => props.show, handleOnMounted);

function handleOnMounted() {
  if (props.show) {
    team.value = null;
    getTeamDetails();
  }
}

// Team details
const team = ref<Team | null>(null);
const isLoadingTeamDetails = ref(false);

async function getTeamDetails() {
  isLoadingTeamDetails.value = true;

  try {
    team.value = await getTeamById(props.teamId);
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingTeamDetails.value = false;
  }
}
</script>

<style lang="scss" scoped>

</style>
