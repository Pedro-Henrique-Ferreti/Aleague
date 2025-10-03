<template>
  <label
    class="input w-full"
    :for="id"
  >
    <input
      v-model.trim="model"
      type="text"
      class="grow"
      :name="name"
      :id="id"
      :readonly="!!readonly"
      :disabled="disabled"
    >
  </label>
</template>

<script lang="ts">
export type BaseInputModel = string | number | null;
</script>

<script lang="ts" setup>
const id = useId();

defineProps<{
  name: string;
  readonly?: boolean;
  disabled?: boolean;
}>();

const model = defineModel<BaseInputModel>();
</script>