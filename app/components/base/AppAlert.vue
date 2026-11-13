<template>
  <div
    class="alert text-xs font-semibold"
    role="alert"
    :class="{
      'alert-info': type === 'info',
      'alert-success': type === 'success',
      'alert-warning': type === 'warning',
      'alert-error': type === 'error',
      'alert-soft': soft,
    }"
  >
    <div class="shrink-0">
      <slot name="icon">
        <component
          :is="alertIcon"
          :class="{ 'text-primary': !type }"
        />
      </slot>
    </div>
    <slot>
      <p>{{ message }}</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { type Icon, IconAlertTriangle, IconInfoCircle } from '@tabler/icons-vue';

interface AppAlertProps {
  icon?: Icon;
  message?: string;
  soft?: boolean;
  type?: 'success' | 'error' | 'warning' | 'info';
}

const props = defineProps<AppAlertProps>();

const ALERT_ICONS: Partial<Record<NonNullable<AppAlertProps['type']>, Icon>> = {
  warning: IconAlertTriangle,
};

const alertIcon = computed(() => props.icon ?? (props.type ? ALERT_ICONS[props.type] : IconInfoCircle));
</script>
