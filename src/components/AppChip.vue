<template>
  <div
    class="chip"
    :data-type="type"
  >
    <BaseIcon
      class="chip__icon"
      :icon="chipIcon"
    />
    <span class="chip__text">
      {{ text }}
    </span>
  </div>
</template>

<script lang="ts">
enum Types {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}
</script>

<script lang="ts" setup>
import { computed, type PropType } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<keyof typeof Types>,
    default: Types.info,
  },
  text: {
    type: String,
    default: '',
  },
});

const chipIcon = computed(() => {
  switch (props.type) {
    case Types.success:
      return 'check-circle';
    case Types.error:
      return 'error-circle';
    case Types.warning:
    case Types.info:
    default:
      return 'info';
  }
});
</script>

<style lang="scss" scoped>
.chip {
  display: flex;
  width: fit-content;
  gap: 0.5rem;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 3rem;
  color: $color--text-darken;
  font-size: 0.8125rem;
  font-weight: $font-weight--semibold;
  &__icon {
    width: 1rem;
    height: 1rem;
    fill: var(--icon-color);
  }
  &[data-type="info"] {
  --bg-color: #{$color--tertiary-100};
  --border-color: #{$color--tertiary-200};
  --icon-color: #{$color--tertiary};
  }
  &[data-type="success"] {
  --bg-color: #{$color--success-100};
  --border-color: #{$color--success-200};
  --icon-color: #{$color--success-500};
  }
  &[data-type="warning"] {
  --bg-color: #{$color--warning-100};
  --border-color: #{$color--warning-200};
  --icon-color: #{$color--warning-500};
  }
  &[data-type="error"] {
  --bg-color: #{$color--danger-100};
  --border-color: #{$color--danger-200};
  --icon-color: #{$color--danger};
  }
}
</style>
