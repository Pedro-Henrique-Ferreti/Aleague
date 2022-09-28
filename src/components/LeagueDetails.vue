<template>
  <AppAccordion
    id="league-details--accordion"
    class="league-details"
    title="Detalhes"
  >
    <LeagueDetailsInfo
      class="league-details__section"
      :teams-count="league.numberOfTeams"
      :progress="league.progress"
      :created-at="league.createdAt"
      :updated-at="league.updatedAt"
    />
    <LeagueDetailsEdit
      class="league-details__section"
      :league-name="league.name"
    />
    <LeagueDetailsActions class="league-details__section" />
  </AppAccordion>
</template>

<script lang="ts" setup>
import type { LeagueWithStandings } from '@/types/League';
import type { PropType } from 'vue';
import AppAccordion from './AppAccordion.vue';
import LeagueDetailsInfo from './LeagueDetailsInfo.vue';
import LeagueDetailsEdit from './LeagueDetailsEdit.vue';
import LeagueDetailsActions from './LeagueDetailsActions.vue';

defineProps({
  league: {
    type: Object as PropType<LeagueWithStandings>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.league-details {
  @include for-tablet-landscape-up {
    width: 50%;
  }
  &__section:not(:first-of-type) {
    margin-top: 1.5rem;
  }
}
</style>
