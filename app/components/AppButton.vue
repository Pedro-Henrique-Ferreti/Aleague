<template>
  <BaseButton
    :class="['btn relative', isLoading ? 'cursor-default' : '' ]"
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
        class="w-[1.25em] h-[1.25em]"
        :is="iconLeft"
      />
      <slot>{{ label }}</slot>
      <component
        v-if="iconRight"
        class="w-[1.25em] h-[1.25em]"
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
