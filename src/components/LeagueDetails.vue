<template>
  <AppAccordion
    id="league-details--accordion"
    class="league-details"
    title="Detalhes"
  >
    <LeagueDetailsInfo class="league-details__section" />
    <LeagueDetailsEdit class="league-details__section" />
    <LeagueDetailsActions class="league-details__section" />
  </AppAccordion>
</template>

<script lang="ts" setup>
import AppAccordion from './AppAccordion.vue';
import LeagueDetailsInfo from './LeagueDetailsInfo.vue';
import LeagueDetailsEdit from './LeagueDetailsEdit.vue';
import LeagueDetailsActions from './LeagueDetailsActions.vue';
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
