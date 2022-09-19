<template>
  <header class="league-form-header">
    <img
      src="/images/leagues/league-format-icon.svg"
      alt="League icon"
      class="league-form-header__icon"
    />
    <div class="league-form-header__column">
      <span class="league-form-header__title">{{ leagueName }}</span>
      <div class="league-form-header__details">
        <span class="league-form-header__detail">Pontos corridos</span>
        <span
          v-if="teamsCount > 0"
          v-text="`${teamsCount} participantes`"
          class="league-form-header__detail"
        />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
defineProps({
  leagueName: {
    type: String,
    required: true,
  },
  teamsCount: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
.league-form-header {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  &__icon {
    width: 3rem;
    height: 3rem;
  }
  &__title {
    font-size: 1.125rem;
    font-weight: $font-weight--semibold;
  }
  &__details {
    display: flex;
  }
  &__detail {
    display: flex;
    color: $color--text-lighten;
    font-weight: $font-weight--semibold;
    &::before {
      content: '';
      display: block;
      width: 1px;
      height: 1.5rem;
      margin: 0 0.5rem;
      background-color: $color--light-gray-1;
    }
  }
  @include for-large-smartphone-down {
    .league-form-header__details {
      display: block;
    }
    .league-form-header__detail::before {
      display: none;
    }
  }
  @include for-desktop-down {
    .league-form-header__detail:first-of-type::before {
      display: none;
    }
  }
  @include for-desktop-up {
    align-items: center;
    .league-form-header__column {
      display: flex;
    }
    .league-form-header__detail::before {
      margin: 0 0.75rem;
    }
  }
}
</style>
