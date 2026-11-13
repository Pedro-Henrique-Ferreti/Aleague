<template>
  <button
    :id="id || defaultId"
    class="tab"
    type="button"
    role="tab"
    :class="{ 'tab-active': isActive }"
    :aria-selected="isActive"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  id?: string;
  isActive?: boolean;
  label: string;
}>();

defineEmits(['click']);

const defaultId = useId();
</script>
