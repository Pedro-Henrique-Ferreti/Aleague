<template>
  <CompetitionParticipantsForm
    :competition-id="league.id"
    :competition-format="competitionFormats.LEAGUE.value"
    :competition-name="league.name"
    :is-loading-competition="isLoadingLeague"
    :number-of-teams="league.numberOfTeams"
    :back-button-route="{ name: 'create-league-rules', params: { id: league.id } }"
    :save-data-function="saveLeagueParticipants"
  />
</template>

<script lang="ts" setup>
import type { LeagueParticipant } from '@/types/League';
import { ref } from 'vue';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitionFormats';
import CompetitionParticipantsForm from '@/components/CompetitionParticipantsForm.vue';

const { getLeagueById } = useLeaguesStore();
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
    const { name, numberOfTeams } = await getLeagueById(league.value.id);

    league.value.name = name;
    league.value.numberOfTeams = numberOfTeams || 0;
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
function saveLeagueParticipants(participants: LeagueParticipant[]) {
  console.log(participants);

  return new Promise<void>((res) => setTimeout(res, 2000));
}
</script>
