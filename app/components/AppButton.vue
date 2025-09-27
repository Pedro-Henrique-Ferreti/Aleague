<template>
  <BaseButton
    :class="['btn relative', isLoading ? 'cursor-default' : '', (label || $slots.default) ? '[--icon-size:1.25em]': '[--icon-size:1.5em]' ]"
    :to="to"
    :type="type"
    :disabled="disabled"
    @click="(event) => (isLoading ? event.preventDefault() : $emit('click'))"
  >
    <span
      v-if="isLoading"
      class="loading loading-spinner w-[1.375em] absolute"
    />
    <div
      class="flex justify-center items-center gap-[inherit] transition-opacity"
      :class="{ 'opacity-0': isLoading }"
    >
      <component
        v-if="iconLeft"
        class="w-(--icon-size) h-(--icon-size)"
        :is="iconLeft"
      />
      <slot>{{ label }}</slot>
      <component
        v-if="iconRight"
        class="w-(--icon-size) h-(--icon-size)"
        :is="iconRight"
      />
    </div>
  </BaseButton>
</template>

<script lang="ts" setup>
import type { BaseButtonProps } from './BaseButton.vue';

defineEmits(['click']);
defineProps<BaseButtonProps & {
  isLoading?: boolean;
  label?: string;
  iconLeft?: unknown;
  iconRight?: unknown;
}>();
</script>
