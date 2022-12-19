<template>
  <CompetitionFormatForm
    v-model:league-name="playoff.name"
    v-model:league-format="playoff.format"
    :is-loading-league-data="isLoadingLeagueData"
    :is-saving-league="isSavingLeague"
    @submit="handleSubmit"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitionFormats';

import CompetitionFormatForm from '@/components/CompetitionFormatForm.vue';

const router = useRouter();
const { getPlayoffById, updatePlayoff } = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
});

// Playoff data
const playoff = ref({
  id: props.id,
  name: '',
  format: competitionFormats.PLAY_OFF.value,
});

// Get playoff data
const isLoadingLeagueData = ref(false);

getPlayoff();

async function getPlayoff() {
  isLoadingLeagueData.value = true;

  try {
    const { name } = await getPlayoffById(playoff.value.id);

    playoff.value.name = name;
  } catch(error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingLeagueData.value = false;
  }
}

// Handle form submission
const isSavingLeague = ref(false);

async function handleSubmit() {
  isSavingLeague.value = true;

  try {
    await updatePlayoff({
      hashId: playoff.value.id,
      name: playoff.value.name,
    });

    router.push({
      name: 'create-playoff-rules',
      params: { id: playoff.value.id },
    });
  } catch(error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingLeagueData.value = false;
  }
}
</script>