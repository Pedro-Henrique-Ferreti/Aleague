<template>
  <button
    :id="id || defaultId"
    class="tab gap-0.25"
    type="button"
    role="tab"
    :class="{ 'tab-active': isActive }"
    :aria-selected="isActive"
    @click="$emit('click')"
  >
    <component
      v-if="iconLeft"
      :is="iconLeft"
      class="size-[1.25em]"
    />
    {{ label }}
    <component
      v-if="iconRight"
      :is="iconRight"
      class="size-[1.25em]"
    />
  </button>
</template>

<script setup lang="ts">
import type { Icon } from '@tabler/icons-vue';

defineProps<{
  id?: string;
  isActive?: boolean;
  label?: string;
  iconLeft?: Icon;
  iconRight?: Icon;
}>();

defineEmits(['click']);

const defaultId = useId();
</script>
