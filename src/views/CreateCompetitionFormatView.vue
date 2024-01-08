<template>
  <CompetitionFormatForm
    v-model:competition-name="league.name"
    v-model:competition-format="league.format"
    :is-saving-competition="isSavingLeague"
    @submit="handleSubmit"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlayoffStore } from '@/stores/playoff';
import { useNotificationStore } from '@/stores/notification';
import { competitionFormats } from '@/constants/competitions';
import api from '@/api';
import CompetitionFormatForm from '@/components/CompetitionFormatForm.vue';

const router = useRouter();
const playoffStore = usePlayoffStore();
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
      case competitionFormats.PLAYOFF.value:
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
  const { data }  = await api.leagueService.createLeague({
    name: league.value.name,
  });

  router.push({
    name: 'create-league-rules',
    params: { id: data.id },
  });
}

async function createPlayoff() {
  const playoffId = await playoffStore.createPlayoff({
    name: league.value.name,
  });

  router.push({
    name: 'create-playoff-rules',
    params: { id: playoffId },
  });
}
</script>
