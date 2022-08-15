<template>
  <Teleport to="body">
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-show="show"
        class="overlay"
      >
        <BaseModal
          class="app-modal"
          :class="modalClasses"
          :title="title"
          @close="$emit('close', $event)"
        >
          <slot />
        </BaseModal>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">
const validSizes = {
  medium: 'medium',
  large: 'large',
};
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseModal from './common/BaseModal.vue';

defineEmits(['close']);

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: validSizes.medium,
  },
});

const modalClasses = computed(() => ({
  'app-modal--medium': props.size === validSizes.medium,
  'app-modal--large': props.size === validSizes.large,
}));
</script>

<style lang="scss" scoped>
.overlay {
  display: grid;
  place-items: start center;
  padding: max(11.7vh, 4rem) $spacing--screen-vertical-padding;
  background-color: $color--text-darken-50;
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-index--modal-overlay;
}
.app-modal {
  max-height: calc(100vh - (max(11.7vh, 4rem) * 2));
  &--medium {
    max-width: 45rem; // 720px
  }
  &--large {
    max-width: 62rem; // 992px
  }
  :deep(.modal__body) {
    overflow: auto;
  }
}
</style>
