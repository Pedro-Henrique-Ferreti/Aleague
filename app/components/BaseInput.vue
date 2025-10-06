<template>
  <input
    :value="model"
    :type="type"
    :name="name"
    :id="id || defaultId"
    :readonly="!!readonly"
    :disabled="disabled"
    @input="onInput"
    @change="onChange"
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
  modelValue?: BaseInputModel;
  modelModifiers?: { lazy?: boolean; trim?: boolean };
}
</script>

<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue';

const defaultId = useId();

const emit = defineEmits<{
  'update:modelValue': [value: BaseInputModel];
}>();
const props = withDefaults(defineProps<BaseInputProps>(), {
  type: 'text',
});

const model = computed({
  get: () => props.modelValue,
  set: (value: BaseInputModel) => {
    emit('update:modelValue', (
      props.modelModifiers?.trim && value && typeof value === 'string' ? value?.trim() : value
    ));
  },
});

function onInput(event: Event) {
  if (props.modelModifiers?.lazy) return;
  model.value = (event.target as HTMLInputElement).value;
}

function onChange(event: Event) {
  if (!props.modelModifiers?.lazy) return;
  model.value = (event.target as HTMLInputElement).value;
}
</script>