<template>
  <div class="match-abridged">
    <span class="match-abridged__competition">
      {{ leagueName }} <span class="match-abridged__hour">{{ matchHour }}</span>
    </span>
    <div class="match-abridged__result">
      <span class="text-left">{{ homeTeam }}</span>
      <div class="match-abridged__score">
        <span class="match-abridged__score-number">{{ homeTeamScore }}</span>
        <span class="match-abridged__score-number">{{ awayTeamScore }}</span>
      </div>
      <span class="match-abridged__team">{{ awayTeam }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  leagueName: {
    type: String,
    default: '',
  },
  matchHour: {
    type: String,
    default: '',
  },
  homeTeam: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  homeTeamScore: {
    type: Number,
    required: true,
  },
  awayTeamScore: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.match-abridged {
  &__competition {
    display: block;
    margin-bottom: 0.5rem;
    color: $color--text-lighten;
    font-size: 0.875rem;
    font-weight: $font-weight--semibold;
    text-align: left;
  }
  &__hour {
    display: inline-block;
    margin-left: 0.5rem;
    color: inherit;
  }
  &__result {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
  }
  &__score {
    display: flex;
    align-items: center;
    height: 1.5rem;
    margin: 0 1rem;
    background-color: $color--primary;
    border-radius: 0.125rem;
  }
  &__score-number {
    padding: 0 0.375rem;
    color: $color--white;
    font-size: 0.875rem;
    font-weight: $font-weight--semibold;
    line-height: 1;
    &:first-of-type {
      border-right: 1px solid $color--white;
    }
  }
}
</style>
