<template>
  <div class="empty-state">
    <img
      class="empty-state__image"
      alt="Empty List"
      draggable="false"
      :src="imageSrc"
    />
    <span class="empty-state__title">
      {{ title }}
    </span>
    <div class="empty-state__content">
      <slot />
    </div>
    <div
      v-if="showControls"
      class="empty-state__controls"
    >
      <slot name="controls">
        <AppButton
          class="empty-state__button"
          color="primary"
          :to="buttonPath"
          @click="$emit('button-click')"
        >
          {{ buttonText }}
        </AppButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import AppButton from './AppButton.vue';

defineEmits(['button-click']);
defineProps({
  title: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: '',
  },
  buttonPath: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: '',
  },
  showControls: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.empty-state {
  --max-width: 28rem;
  --img-width: 17rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: var(--max-width);
  margin: 0 auto;
  text-align: center;
  &__image {
    width: var(--img-width);
    opacity: 0.9;
  }
  &__title {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: $color--text-darken;
    font-size: 1.5rem;
    font-weight: $font-weight--semibold;
  }
  &__controls {
    margin-top: 2rem;
  }
  .empty-state__button {
    min-width: 14rem;
  }
}
</style>
