<template>
  <CompetitionFormatForm
    v-model:competition-name="playoff.name"
    v-model:competition-format="playoff.format"
    :is-loading-competition="isLoadingPlayoff"
    :is-saving-competition="isSavingPlayoff"
    @submit="handleSubmit"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '@/stores/notification';
import { competitionFormats } from '@/constants/competitions';
import api from '@/api';
import CompetitionFormatForm from '@/components/CompetitionFormatForm.vue';

const router = useRouter();
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
  format: competitionFormats.PLAYOFF.value,
});

// Get playoff data
const isLoadingPlayoff = ref(false);

getPlayoff();

async function getPlayoff() {
  isLoadingPlayoff.value = true;

  try {
    const { data } = await api.playoffService.getPlayoffById(playoff.value.id);

    playoff.value.name = data.name;
  } catch(error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingPlayoff.value = false;
  }
}

// Handle form submission
const isSavingPlayoff = ref(false);

async function handleSubmit() {
  isSavingPlayoff.value = true;

  try {
    await api.playoffService.updatePlayoff({
      id: playoff.value.id,
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
    isSavingPlayoff.value = false;
  }
}
</script>