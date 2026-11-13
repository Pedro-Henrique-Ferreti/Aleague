<template>
  <label
    class="radio-card card card-border"
    :for="id"
    :class="{ 'cursor-pointer': !disabled }"
    :data-selected="model === value || null"
  >
    <div class="card-body p-1 flex-row justify-between items-center gap-1">
      <component
        v-if="icon"
        :is="icon"
        class="size-2.5 shrink-0"
      />
      <div class="flex-1">
        <div class="font-semibold text-base">{{ label }}</div>
        <p
          v-if="description"
          class="text-sm text-base-content/70 font-medium mt-0.25"
        >{{ description }}</p>
      </div>
      <input
        v-model="model"
        :id="id"
        type="radio"
        class="radio size-1.25"
        :name="name"
        :value="value"
        :disabled="disabled"
      >
    </div>
  </label>
</template>

<script lang="ts" setup generic="T extends string | number | null">
import type { Icon } from '@tabler/icons-vue';

defineProps<{
  name: string;
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: Icon | string;
}>();

const id = useId();

const model = defineModel<T>();
</script>

<style scoped>
@reference '@/assets/css/main.css';

.radio-card {
  @apply rounded-lg transition-colors duration-200 ease-in-out;
  &:not([data-selected]) {
    @apply hover:shadow-sm hover:border-base-300;
  }
  &[data-selected] {
    @apply ring-2 ring-neutral border-transparent;
  }
}
</style>
