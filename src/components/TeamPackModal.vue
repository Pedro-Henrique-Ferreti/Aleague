<template>
  <AppModal
    title="Pacotes de equipe"
    size="large"
    :show="show"
    @close="$emit('close')"
  >
    <div class="team-packs">
      <PacksList :show-loading-indicator="isLoading" />
    </div>
  </AppModal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useTeamsStore } from '@/stores/teamsStore';
import AppModal from './AppModal.vue';
import PacksList from './TeamPackModalPacksList.vue';
import { useNotificationStore } from '@/stores/notificationStore';

defineEmits(['close']);

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const { getTeamPacks } = useTeamsStore();
const { openSnackbarNotification } = useNotificationStore();

watch(() => props.show, () => {
  if (props.show) {
    loadTeamPacks();
  }
});

const isLoading = ref(true);

async function loadTeamPacks() {
  isLoading.value = true;

  try {
    await getTeamPacks();
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: 'Falha ao carregar os pacotes de equipe.',
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.team-packs {
  min-height: 20rem;
}
</style>
