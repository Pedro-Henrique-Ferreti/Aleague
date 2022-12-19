<template>
  <header class="competition-form-header">
    <img
      class="competition-form-header__icon"
      alt="Competition icon"
      :src="competitionIcon"
    />
    <div class="competition-form-header__column">
      <span class="competition-form-header__title">{{ competitionName }}</span>
      <div class="competition-form-header__details">
        <span class="competition-form-header__detail">{{ competitionFormatName }}</span>
        <span
          v-if="teamsCount > 0"
          v-text="`${teamsCount} participantes`"
          class="competition-form-header__detail"
        />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
defineProps({
  competitionName: {
    type: String,
    required: true,
  },
  competitionIcon: {
    type: String,
    default: '',
  },
  competitionFormatName: {
    type: String,
    default: '',
  },
  teamsCount: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
.competition-form-header {
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
    .competition-form-header__details {
      display: block;
    }
    .competition-form-header__detail::before {
      display: none;
    }
  }
  @include for-desktop-down {
    .competition-form-header__detail:first-of-type::before {
      display: none;
    }
  }
  @include for-desktop-up {
    align-items: center;
    .competition-form-header__column {
      display: flex;
    }
    .competition-form-header__detail::before {
      margin: 0 0.75rem;
    }
  }
}
</style>
