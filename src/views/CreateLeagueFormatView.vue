<template>
  <CreateLeagueFormatForm
    v-model:league-name="league.name"
    v-model:league-format="league.format"
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

import CreateLeagueFormatForm from '@/components/CreateLeagueFormatForm.vue';

const router = useRouter();
const leaguesStore = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

// League data
const league = ref({
  name: '',
  format: competitionFormats.LEAGUE.value,
});

// Handle form submission
const isSavingLeague = ref(false);

async function handleSubmit() {
  isSavingLeague.value = true;

  try {
    switch (league.value.format) {
      case competitionFormats.LEAGUE.value:
        await createLeague();
        break;
      case competitionFormats.PLAY_OFF.value:
      default:
        await createPlayoff();
    }
  } catch(error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isSavingLeague.value = false;
  }
}

async function createLeague() {
  const leagueId = await leaguesStore.createLeague({
    name: league.value.name,
  });

  router.push({
    name: 'create-league-rules',
    params: { id: leagueId },
  });
}

async function createPlayoff() {
  const leagueId = await leaguesStore.createPlayoff({
    name: league.value.name,
  });

  router.push({
    name: 'create-playoff-rules',
    params: { id: leagueId },
  });
}
</script>
