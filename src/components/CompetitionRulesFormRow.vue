<template>
  <div class="competition-rules-form__row">
    <label
      class="competition-rules-form__label"
      :id="id"
    >
      <slot name="label" />
    </label>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.competition-rules-form {
  margin-top: 3rem;
  &__row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
    &:last-of-type {
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
  &__label-subtitle {
    display: block;
    font-size: 0.875rem;
    font-weight: $font-weight--semibold;
    &:empty {
      display: none;
    }
  }
}
</style>
