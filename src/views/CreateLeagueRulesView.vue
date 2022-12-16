<template>
  <CreateLeagueRulesForm
    :league-format="competitionFormats.LEAGUE.value"
    :league-name="league.name"
    :form-is-valid="formIsValid"
    :is-loading-league="isLoadingLeague"
    :is-saving-league="isSavingLeague"
    :back-button-route="{ name: 'create-league-format', id: league.id }"
    @submit="saveLeague"
  >
    <CreateLeagueRulesFormRow id="rules-form-participants">
      <template #label>
        Quantidade de participantes
      </template>
      <AppCounterField
        v-model="league.numberOfTeams"
        labelled-by="rules-form-participants"
        :min="1"
      />
    </CreateLeagueRulesFormRow>
    <CreateLeagueRulesFormRow id="rules-form-away-games">
      <template #label>
        Campeonato em 2 turnos
      </template>
      <AppSwitch
        v-model="league.awayGames"
        show-labels
        labelled-by="rules-form-away-games"
      />
    </CreateLeagueRulesFormRow>
  </CreateLeagueRulesForm>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {  useRouter } from 'vue-router';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitionFormats';

import AppCounterField from '@/components/AppCounterField.vue';
import AppSwitch from '@/components/AppSwitch.vue';
import CreateLeagueRulesForm from '@/components/CreateLeagueRulesForm.vue';
import CreateLeagueRulesFormRow from '@/components/CreateLeagueRulesFormRow.vue';

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
    const { name, numberOfTeams, numberOfGameweeks } = await getLeagueById(league.value.id);

    league.value.name = name;
    league.value.numberOfTeams = numberOfTeams || 0;
    league.value.awayGames = (numberOfTeams && numberOfGameweeks)
      ? numberOfGameweeks === (numberOfTeams - 1) * 2
      : false;
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
      hashId: league.value.id,
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

<style lang="scss" scoped>
.league-rules-form {
  margin-top: 3rem;
  &__row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &:not(:last-of-type) {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid $color--light-gray-1;
    }
    @include for-tablet-portrait-up {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__label {
    color: $color--text-darken;
  }
}
</style>
