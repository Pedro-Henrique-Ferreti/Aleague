<template>
  <div class="no-content">
    <img
      class="no-content__image"
      src="/images/business-analysis.svg"
      alt="Business Analysis"
      draggable="false"
    />
    <span class="no-content__title">
      {{ title }}
    </span>
    <div class="no-content__body">
      <slot />
    </div>
    <div class="no-content__action-wrapper">
      <slot name="action">
        <AppButton
          class="no-content__action-button"
          color="primary"
          @click="$emit('action-button-click')"
        >
          {{ actionButtonText }}
        </AppButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['action-button-click']);
defineProps({
  title: {
    type: String,
    required: true,
  },
  actionButtonText: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.no-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 30rem;
  margin: 0 auto;
  text-align: center;
  &__image {
    width: auto;
    height: 15.5rem;
  }
  &__title {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: $color--text-darken;
    font-size: 1.5rem;
    font-weight: $font-weight--semibold;
  }
  &__action-wrapper {
    margin-top: 1.5rem;
  }
  .no-content__action-button {
    min-width: 18.75rem;
  }
}
</style>
