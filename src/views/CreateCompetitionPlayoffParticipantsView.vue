<template>
  <CompetitionParticipantsForm
    :competition-id="playoff.id"
    :competition-format="competitionFormats.PLAYOFF.value"
    :competition-name="playoff.name"
    :is-loading-competition="isLoadingPlayoff"
    :number-of-teams="playoff.numberOfTeams"
    :back-button-route="{ name: 'create-playoff-rules', params: { id: playoff.id } }"
    :save-data-function="savePlayoffParticipants"
  />
</template>

<script lang="ts" setup>
import type { LeagueParticipant } from '@/types/League';
import { ref } from 'vue';
import { usePlayoffStore } from '@/stores/playoffStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitionFormats';
import CompetitionParticipantsForm from '@/components/CompetitionParticipantsForm.vue';

const { getPlayoffById } = usePlayoffStore();
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
  numberOfTeams: 0,
});

// Get playoff data
const isLoadingPlayoff = ref(false);

getPlayoffData();

async function getPlayoffData() {
  isLoadingPlayoff.value = true;

  try {
    const { name, numberOfTeams } = await getPlayoffById(playoff.value.id);

    playoff.value.name = name;
    playoff.value.numberOfTeams = numberOfTeams || 0;
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingPlayoff.value = false;
  }
}

// Save data

function savePlayoffParticipants(participants: LeagueParticipant[]) {
  console.log(participants);

  return new Promise<void>((res) => setTimeout(res, 2000));
}
</script>
