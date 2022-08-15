<template>
  <Teleport to="body">
    <transition
      name="modal__overlay-fade"
      mode="out-in"
    >
      <div
        v-show="show"
        class="overlay"
        @click.self="$emit('close')"
      >
        <transition
          name="modal__fade"
          mode="out-in"
        >
          <BaseModal
            v-show="show"
            class="app-modal"
            :class="modalClasses"
            :title="title"
            @close="$emit('close', $event)"
          >
            <slot />
          </BaseModal>
        </transition>
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
import { computed, watch } from 'vue';
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

watch(() => props.show, (show) => {
  if (show) {
    document.body.classList.add('hide-overflow-y');
  } else {
    document.body.classList.remove('hide-overflow-y');
  }
});
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
  @include for-tablet-portrait-down {
    padding: 0;
  }
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
  @include for-tablet-portrait-down {
    height: 100vh;
    max-height: unset;
    border: 0;
    border-radius: 0;
  }
}
</style>
