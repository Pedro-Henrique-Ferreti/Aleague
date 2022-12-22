<template>
  <AppAccordion
    id="competition-details--accordion"
    class="competition-details"
    title="Detalhes"
  >
    <CompetitionDetailsInfo class="competition-details__section" />
    <CompetitionDetailsEdit class="competition-details__section" />
    <CompetitionDetailsActions class="competition-details__section" />
  </AppAccordion>
</template>

<script lang="ts" setup>
import AppAccordion from './AppAccordion.vue';
import CompetitionDetailsInfo from './CompetitionDetailsInfo.vue';
import CompetitionDetailsEdit from './CompetitionDetailsEdit.vue';
import CompetitionDetailsActions from './CompetitionDetailsActions.vue';
</script>

<style lang="scss" scoped>
.competition-details {
  @include for-tablet-landscape-up {
    width: 50%;
  }
  &__section:not(:first-of-type) {
    margin-top: 1.5rem;
  }
}
</style>
