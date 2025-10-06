<template>
  <input
    v-model.trim="model"
    type="text"
    :name="name"
    :id="id || defaultId"
    :readonly="!!readonly"
    :disabled="disabled"
  >
</template>

<script lang="ts">
export type BaseInputModel = string | number | null;
</script>

<script lang="ts" setup>
const defaultId = useId();

defineProps<{
  name?: string;
  id?: string;
  readonly?: boolean;
  disabled?: boolean;
}>();

const model = defineModel<BaseInputModel>();
</script>