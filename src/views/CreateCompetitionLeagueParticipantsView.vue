<template>
  <CompetitionParticipantsForm
    :competition-id="league.id"
    :competition-format="competitionFormats.LEAGUE.value"
    :competition-name="league.name"
    :is-loading-competition="isLoadingLeague"
    :number-of-teams="league.numberOfTeams"
    :back-button-route="{ name: 'create-league-rules', params: { id: league.id } }"
    :save-participants-fn="saveLeagueParticipants"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import { competitionFormats } from '@/constants/competitions';
import api from '@/api';
import CompetitionParticipantsForm from '@/components/CompetitionParticipantsForm.vue';

const { openSnackbarNotification } = useNotificationStore();

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
});

const league = ref({
  id: props.id,
  name: '',
  numberOfTeams: 0,
});

// Get league data
const isLoadingLeague = ref(false);

getLeagueData();

async function getLeagueData() {
  isLoadingLeague.value = true;

  try {
    const { data } = await api.leagueService.getLeagueById(league.value.id);

    league.value.name = data.name;
    league.value.numberOfTeams = data.rules?.numberOfTeams || 0;
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingLeague.value = false;
  }
}

// Save data
async function saveLeagueParticipants(participantsIds: string[]) {
  await api.leagueService.addLeagueTeams(league.value.id, participantsIds);
}
</script>
