<template>
  <BaseButton
    class="btn relative"
    :class="[
      { 'cursor-default': isLoading },
      (label || $slots.default) ? '[--icon-size:1.25em]' : '[--icon-size:1.5em]',
    ]"
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
        :is="iconLeft"
        class="size-(--icon-size)"
      />
      <slot>{{ label }}</slot>
      <component
        v-if="iconRight"
        :is="iconRight"
        class="size-(--icon-size)"
      />
    </div>
  </BaseButton>
</template>

<script lang="ts" setup>
import type { Icon } from '@tabler/icons-vue';
import type { BaseButtonProps } from './BaseButton.vue';

defineProps<BaseButtonProps & {
  isLoading?: boolean;
  label?: string;
  iconLeft?: Icon;
  iconRight?: Icon;
}>();
defineEmits(['click']);
</script>
