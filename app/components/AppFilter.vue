<template>
  <div class="flex flex-wrap gap-0.5">
    <input
      v-for="option in options"
      v-model="selectedOptions"
      :key="String(option.value)"
      class="btn btn-xs rounded-md"
      type="checkbox"
      :name="inputName"
      :value="option.value"
      :aria-label="option.label"
    >
    <button
      v-if="showResetButton"
      class="btn btn-square btn-xs rounded-md"
      type="button"
      aria-label="Limpar filtros"
      @click="selectedOptions = []"
    >
      ✕
    </button>
  </div>
</template>

<script lang="ts" setup generic="T">
interface AppFilterOption {
  value: T;
  label: string;
}

interface AppFilterProps {
  options: AppFilterOption[];
  inputName: HTMLInputElement['name'];
  showResetButton?: boolean;
}

withDefaults(defineProps<AppFilterProps>(), {
  showResetButton: true,
});

const selectedOptions = defineModel<T[]>();
</script>
