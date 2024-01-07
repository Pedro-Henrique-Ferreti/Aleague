<template>
  <CompetitionRulesForm
    :competition-format="competitionFormats.LEAGUE.value"
    :competition-name="league.name"
    :form-is-valid="formIsValid"
    :is-loading-competition="isLoadingLeague"
    :is-saving-competition="isSavingLeague"
    :back-button-route="{ name: 'create-league-format', params: { id: league.id } }"
    @submit="saveLeague"
  >
    <CompetitionRulesFormRow id="rules-form-participants">
      <template #label>
        Quantidade de participantes
      </template>
      <AppCounterField
        v-model="league.numberOfTeams"
        labelled-by="rules-form-participants"
        :min="1"
      />
    </CompetitionRulesFormRow>
    <CompetitionRulesFormRow id="rules-form-away-games">
      <template #label>
        Campeonato em 2 turnos
      </template>
      <AppSwitch
        v-model="league.awayGames"
        show-labels
        labelled-by="rules-form-away-games"
      />
    </CompetitionRulesFormRow>
  </CompetitionRulesForm>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLeaguesStore } from '@/stores/leagues';
import { useNotificationStore } from '@/stores/notification';
import { competitionFormats } from '@/constants/competitions';

import AppCounterField from '@/components/AppCounterField.vue';
import AppSwitch from '@/components/AppSwitch.vue';
import CompetitionRulesForm from '@/components/CompetitionRulesForm.vue';
import CompetitionRulesFormRow from '@/components/CompetitionRulesFormRow.vue';

const router = useRouter();
const { getLeagueById, updateLeagueRules } = useLeaguesStore();
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
  numberOfTeams: 1,
  awayGames: false,
});

// Get league data
const isLoadingLeague = ref(true);

getLeagueData();

async function getLeagueData() {
  isLoadingLeague.value = true;

  try {
    const { name, rules } = await getLeagueById(league.value.id);

    league.value.name = name;

    if (rules) {
      league.value.numberOfTeams = rules.numberOfTeams;
      league.value.awayGames = rules.numberOfGameweeks === (rules.numberOfTeams - 1) * 2;
    }
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingLeague.value = false;
  }
}

// Submit form
const formIsValid = computed(() => {
  return league.value.numberOfTeams > 1;
});

const isSavingLeague = ref(false);

async function saveLeague() {
  isSavingLeague.value = true;

  try {
    await updateLeagueRules({
      id: league.value.id,
      numberOfTeams: league.value.numberOfTeams,
      awayGames: league.value.awayGames,
    });

    router.push({
      name: 'create-league-participants',
      params: { id: league.value.id },
    });
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isSavingLeague.value = false;
  }
}
</script>
