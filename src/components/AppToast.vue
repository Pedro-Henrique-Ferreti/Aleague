<template>
  <div
    class="app-toast"
    ref="toast"
    :data-type="type"
    :data-variant="variant"
  >
    <component
      class="app-toast__icon"
      :is="icon"
      :data-translate="applyTranslate"
    />
    <div class="app-toast__body">
      <div
        v-if="title"
        v-text="title"
        class="app-toast__title"
      />
      <div>{{ message }}</div>
    </div>
    <button
      v-if="closable"
      type="button"
      class="app-toast__close-button"
      aria-label="Close message"
      @click="$emit('close-toast')"
    >
      <IconClose class="app-toast__close-button-icon" />
    </button>
  </div>
</template>

<script lang="ts">
enum Variants {
  flat = 'flat',
  elevated = 'elevated',
}
</script>

<script lang="ts" setup>
import {
  type PropType, type Ref, ref, computed, onMounted,
} from 'vue';
import { TYPE } from 'vue-toastification';
import IconClose from '@/assets/icons/IconClose.svg';
import IconInfoFilled from '@/assets/icons/IconInfoFilled.svg';
import IconWarningTriangle from '@/assets/icons/IconWarningTriangle.svg';
import IconWarning from '@/assets/icons/IconWarning.svg';
import IconSuccess from '@/assets/icons/IconSuccess.svg';

defineEmits(['close-toast']);
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String as PropType<string | Ref<string>>,
    default: '',
  },
  type: {
    type: String as PropType<TYPE>,
    default: TYPE.INFO,
  },
  variant: {
    type: String as PropType<keyof typeof Variants>,
    default: Variants.flat,
  },
  closable: {
    type: Boolean,
    default: false,
  },
});

const icon = computed(() => {
  switch (props.type) {
    case TYPE.SUCCESS:
      return IconSuccess;
    case TYPE.WARNING:
      return IconWarning;
    case TYPE.ERROR:
      return IconWarningTriangle;
    case TYPE.INFO:
    default:
      return IconInfoFilled;
  }
});

const toast = ref<HTMLDivElement | null>(null);
const applyTranslate = ref(false);

onMounted(() => {
  if (!toast.value) return;

  applyTranslate.value = toast.value.offsetHeight > 59;
});
</script>

<style lang="scss" scoped>
.app-toast {
  &[data-type="info"] {
    --icon-color: #{$color--blue};
    background-color: $color--blue-100;
    border-color: $color--blue-200;
  }
  &[data-type="success"] {
    --icon-color: #{$color--success-600};
    background-color: $color--success-100;
    border-color: $color--success-200;
  }
  &[data-type="warning"] {
    --icon-color: #{$color--yellow};
    background-color: $color--yellow-100;
    border-color: $color--yellow-200;
  }
  &[data-type="error"] {
    --icon-color: #{$color--danger-600};
    background-color: $color--danger-100;
    border-color: $color--danger-200;
  }
  display: flex;
  border: 1px solid;
  border-radius: 0.625rem;
  padding: 1rem 0.75rem;
  color: $color--text-strong;
  font-family: $font-family--primary;
  &[data-variant="elevated"] {
    @include for-tablet-portrait-up {
      min-width: 32rem;
    }
  }
  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--icon-color);
    &[data-translate="true"] {
      transform: translateY(0.25rem);
    }
  }
  &__body {
    flex: 1;
    padding: 0 0.75rem;
  }
  &__title {
    font-weight: $font-weight--semibold;
  }
  &__close-button {
    width: 1.5rem;
    height: 1.5rem;
  }
  &__close-button-icon {
    width: 0.75rem;
    height: 0.75rem;
    color: $color--text;
  }
}
</style>
