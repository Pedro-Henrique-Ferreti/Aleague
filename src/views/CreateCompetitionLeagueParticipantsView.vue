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
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitions';
import CompetitionParticipantsForm from '@/components/CompetitionParticipantsForm.vue';

const { getLeagueById, addLeagueTeams } = useLeaguesStore();
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
    const { name, rules } = await getLeagueById(league.value.id);

    league.value.name = name;
    league.value.numberOfTeams = rules?.numberOfTeams || 0;
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
  await addLeagueTeams(league.value.id, participantsIds);
}
</script>
