<template>
  <progress
    class="progress h-[0.375rem]"
    max="100"
    :value="value"
    :class="{
      'progress-primary': color === ProgressColor.PRIMARY,
      'progress-secondary': color === ProgressColor.SECONDARY,
      'progress-accent': color === ProgressColor.ACCENT,
      'progress-neutral': color === ProgressColor.NEUTRAL,
      'progress-info': color === ProgressColor.INFO,
      'progress-success': color === ProgressColor.SUCCESS,
      'progress-warning': color === ProgressColor.WARNING,
      'progress-error': color === ProgressColor.ERROR,
    }"
  />
</template>

<script lang="ts" setup>
enum ProgressColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ACCENT = 'accent',
  NEUTRAL = 'neutral',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

interface Props {
  color?: `${ProgressColor}`;
  value?: number;
}

withDefaults(defineProps<Props>(), {
  color: ProgressColor.SECONDARY,
});
</script>
