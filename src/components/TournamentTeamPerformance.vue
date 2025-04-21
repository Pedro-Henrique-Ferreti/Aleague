<template>
  <Dropdown
    v-model:shown="menuIsOpen"
    v-bind="$attrs"
    theme="team-performance"
    auto-hide
    :triggers="['click']"
  >
    <slot />
    <template #popper>
      <div class="team-menu">
        <div class="team-menu__header">
          <img
            class="team-menu__logo"
            alt=""
            :src="team.emblemUrl"
          />
          <span class="team-menu__name">{{ team.name }}</span>
        </div>
        <TransitionFade>
          <IconSpinner
            v-if="isLoadingPerformance || isLoadingTournamentOptions"
            size="24"
          />
          <div
            v-else-if="teamPerformance.length"
            class="team-menu__content"
          >
            <AppTabPanel
              v-if="stageTabItems.length > 1"
              v-model="form.stageId"
              size="small"
              justify="center"
              :items="stageTabItems"
            />
            <TournamentTeamPerformanceStage
              v-if="stagePerformance"
              :stage-performance="stagePerformance"
              :team="team"
            />
          </div>
        </TransitionFade>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import type { DropdownOption } from '@/types/Dropdown';
import type { TabPanelTab } from '@/types/TabPanel';
import type { MatchTeam } from '@/types/Match';
import type { TeamStagePerformance } from '@/types/Tournament';
import {
  computed, ref, watch, watchEffect,
} from 'vue';
import { useRoute } from 'vue-router';
import { Dropdown } from 'floating-vue';
import { useTournamentStore } from '@/stores/tournament';
import api from '@/api';
import IconSpinner from './IconSpinner.vue';
import AppTabPanel from './AppTabPanel.vue';
import TransitionFade from './TransitionFade.vue';
import TournamentTeamPerformanceStage from './TournamentTeamPerformanceStage.vue';

const route = useRoute();
const tournamentStore = useTournamentStore();

const props = defineProps<{
  team: MatchTeam;
}>();

const form = ref({
  tournamentId: null as string | null,
  stageId: null as string | null,
});

// Team performance
const teamPerformance = ref<TeamStagePerformance[]>([]);
const stagePerformance = computed(() => teamPerformance.value.find((i) => (
  i.stage.id === form.value.stageId
)));

const isLoadingPerformance = ref(false);

watchEffect(async () => {
  if (!form.value.tournamentId) return;

  teamPerformance.value = [];
  isLoadingPerformance.value = true;

  try {
    const { data } = await api.tournamentService.getTournamentTeamPerformance({
      tournamentId: form.value.tournamentId,
      teamId: props.team.id,
    });
    teamPerformance.value = data;
  } finally {
    isLoadingPerformance.value = false;
  }
});

// Tournament options
const tournamentOptions = ref<DropdownOption[]>([]);
const isLoadingTournamentOptions = ref(false);

async function getTournamentOptions() {
  isLoadingTournamentOptions.value = true;

  try {
    if (!tournamentStore.tournaments.length) {
      await tournamentStore.getTournaments();
    }

    const group = tournamentStore.tournaments.find((tournament) => (
      tournament.id === route.params.id
    ))?.group;

    if (group) {
      tournamentOptions.value = tournamentStore.tournaments.flatMap((tournament) => (
        tournament.group?.id === group.id
          ? [{ id: tournament.id, text: tournament.name }]
          : []
      ));
    }
  } finally {
    isLoadingTournamentOptions.value = false;
    form.value.tournamentId = route.params.id as string;
  }
}

// Menu
const menuIsOpen = ref(false);

watch(() => menuIsOpen.value, (value) => {
  if (value) getTournamentOptions();
});

// Tab panel
const stageTabItems = computed(() => teamPerformance.value.map(({ stage }): TabPanelTab => ({
  id: stage.id,
  name: stage.name || '',
})));

watch(() => stageTabItems.value, () => {
  form.value.stageId = stageTabItems.value[0]?.id;
});
</script>

<style lang="scss" scoped>
.team-menu {
  width: 100%;
  padding: 0.75rem;
  &__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  &__name {
    color: $color--text-strong;
    font-weight: $font-weight--medium;
  }
  &__logo {
    width: 2rem;
  }
  &__content {
    display: grid;
    gap: 1rem;
  }
}
</style>
