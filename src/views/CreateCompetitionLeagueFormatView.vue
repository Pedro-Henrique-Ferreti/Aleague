<template>
  <CompetitionFormatForm
    v-model:competition-name="league.name"
    v-model:competition-format="league.format"
    :is-loading-competition="isLoadingLeague"
    :is-saving-competition="isSavingLeague"
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
const { getLeagueById, updateLeague } = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
});

// League data
const league = ref({
  id: props.id,
  name: '',
  format: competitionFormats.LEAGUE.value,
});

// Get league data
const isLoadingLeague = ref(false);

getLeague();

async function getLeague() {
  isLoadingLeague.value = true;

  try {
    const { name } = await getLeagueById(league.value.id);

    league.value.name = name;
  } catch(error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingLeague.value = false;
  }
}

// Handle form submission
const isSavingLeague = ref(false);

async function handleSubmit() {
  isSavingLeague.value = true;

  try {
    await updateLeague({
      hashId: league.value.id,
      name: league.value.name,
    });

    router.push({
      name: 'create-league-rules',
      params: { id: league.value.id },
    });
  } catch(error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingLeague.value = false;
  }
}
</script>
