<template>
  <AppFieldset :label="label">
    <label
      class="input w-full"
      :for="id"
    >
      <BaseInput
        v-model="model"
        :id="id"
      />
    </label>
  </AppFieldset>
</template>

<script lang="ts" setup>
import type { BaseInputModel } from './BaseInput.vue';

defineProps<{
  label: string;
}>();

const id = useId();

const model = defineModel<BaseInputModel>();
</script>
