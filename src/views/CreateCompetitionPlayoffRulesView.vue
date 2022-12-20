<template>
  <CompetitionRulesForm
    :competition-format="competitionFormats.PLAYOFF.value"
    :competition-name="playoff.name"
    :is-loading-competition="isLoadingPlayoff"
    :is-saving-competition="isSavingPlayoff"
    :back-button-route="{ name: 'create-playoff-format', params: { id: playoff.id } }"
    @submit="savePlayoff"
  >
    <CompetitionRulesFormRow id="rules-form-rounds">
      <template #label>
        Quantidade de fases
      </template>
      <AppCounterField
        v-model="playoff.numberOfRounds"
        labelled-by="rules-form-rounds"
        :min="1"
        :max="6"
      />
    </CompetitionRulesFormRow>
    <CompetitionRulesFormRow id="rules-form-two-legs">
      <template #label>
        Confrontos de ida e volta
      </template>
      <AppSwitch
        v-model="playoff.hasTwoLegs"
        show-labels
        labelled-by="rules-form-two-legs"
      />
    </CompetitionRulesFormRow>
  </CompetitionRulesForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlayoffStore } from '@/stores/playoffStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitionFormats';

import AppCounterField from '@/components/AppCounterField.vue';
import AppSwitch from '@/components/AppSwitch.vue';
import CompetitionRulesForm from '@/components/CompetitionRulesForm.vue';
import CompetitionRulesFormRow from '@/components/CompetitionRulesFormRow.vue';

const router = useRouter();
const { getPlayoffById, updatePlayoffRules } = usePlayoffStore();
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
  numberOfRounds: 1,
  hasTwoLegs: false,
});

// Get playoff data
const isLoadingPlayoff = ref(false);

getPlayoffData();

async function getPlayoffData() {
  isLoadingPlayoff.value = true;

  try {
    const { name, numberOfLegs, numberOfRounds } = await getPlayoffById(playoff.value.id);

    playoff.value.name = name;
    playoff.value.hasTwoLegs = numberOfLegs === 2;
    playoff.value.numberOfRounds = numberOfRounds || 1;
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingPlayoff.value = false;
  }
}

// Submit form
const isSavingPlayoff = ref(false);

async function savePlayoff() {
  isSavingPlayoff.value = true;

  try {
    await updatePlayoffRules({
      hashId: playoff.value.id,
      numberOfRounds: playoff.value.numberOfRounds,
      numberOfLegs: (playoff.value.hasTwoLegs) ? 2 : 1,
    });

    router.push({
      name: 'create-playoff-participants',
      params: { id: playoff.value.id },
    });
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isSavingPlayoff.value = false;
  }
}
</script>
