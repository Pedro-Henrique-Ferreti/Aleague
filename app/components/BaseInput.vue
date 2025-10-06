<template>
  <input
    v-model.trim="model"
    :type="type"
    :name="name"
    :id="id || defaultId"
    :readonly="!!readonly"
    :disabled="disabled"
  >
</template>

<script lang="ts">
export type BaseInputModel = string | number | null;

interface BaseInputProps {
  name?: string;
  id?: string;
  readonly?: boolean;
  disabled?: boolean;
  type?: InputTypeHTMLAttribute;
}
</script>

<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue';

const defaultId = useId();

withDefaults(defineProps<BaseInputProps>(), {
  type: 'text',
});

const model = defineModel<BaseInputModel>();
</script>