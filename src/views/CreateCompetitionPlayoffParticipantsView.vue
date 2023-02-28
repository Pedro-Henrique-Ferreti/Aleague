<template>
  <CompetitionParticipantsForm
    :competition-id="playoff.id"
    :competition-format="competitionFormats.PLAYOFF.value"
    :competition-name="playoff.name"
    :is-loading-competition="isLoadingPlayoff"
    :number-of-teams="playoff.numberOfTeams"
    :back-button-route="{ name: 'create-playoff-rules', params: { id: playoff.id } }"
    :save-participants-fn="savePlayoffParticipants"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { usePlayoffStore } from '@/stores/playoffStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitionFormats';
import CompetitionParticipantsForm from '@/components/CompetitionParticipantsForm.vue';

const { getPlayoffById, addPlayoffTeams } = usePlayoffStore();
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
async function savePlayoffParticipants(participantsIds: string[]) {
  await addPlayoffTeams(playoff.value.id, participantsIds);
}
</script>
