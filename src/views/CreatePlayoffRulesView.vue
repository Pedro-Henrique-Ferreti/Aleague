<template>
  <CreateLeagueRulesForm
    :league-format="competitionFormats.PLAY_OFF.value"
    :league-name="playoff.name"
    :is-loading-league="isLoadingPlayoff"
    :back-button-route="{ name: 'create-playoff-format', id: playoff.id }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitionFormats';

import CreateLeagueRulesForm from '@/components/CreateLeagueRulesForm.vue';

const { getPlayoffById } = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
});

const playoff = ref({
  id: props.id,
  name: '',
});

// Get playoff data
const isLoadingPlayoff = ref(false);

getPlayoffData();

async function getPlayoffData() {
  isLoadingPlayoff.value = true;

  try {
    const { name } = await getPlayoffById(playoff.value.id);

    playoff.value.name = name;
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingPlayoff.value = false;
  }
}
</script>
