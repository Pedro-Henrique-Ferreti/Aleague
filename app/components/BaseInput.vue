<template>
  <input
    ref="inputRef"
    v-bind="mask ? undefined : { value: model }"
    :type="mask ? 'text' : type"
    :name="name"
    :id="id || defaultId"
    :readonly="!!readonly"
    :disabled="disabled"
    @input="mask ? undefined : onInput($event)"
    @change="mask? undefined : onChangeLazy(($event.target as HTMLInputElement).value)"
    @blur="mask ? onChangeLazy(imaskInstance?.unmaskedValue || '') : undefined"
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
  modelModifiers?: { lazy?: boolean; trim?: boolean; number?: boolean };
  mask?: string | RegExp | (() => void);
  maskOptions?: Record<string, unknown>;
}
</script>

<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue';
import IMask, { HTMLInputMaskElement, type InputMask } from 'imask';

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
    if (props.modelModifiers?.trim && value && typeof value === 'string') {
      emit('update:modelValue', value?.trim());
    } else if (props.modelModifiers?.number && value !== null) {
      emit('update:modelValue', +value);
    } else {
      emit('update:modelValue', value);
    }
  },
});

function onInput(event: Event) {
  if (props.modelModifiers?.lazy) return;
  model.value = (event.target as HTMLInputElement).value;
}

function onChangeLazy(value: BaseInputModel) {
  if (props.modelModifiers?.lazy) {
    model.value = value;
  }
}

// IMask setup
const inputRef = useTemplateRef<HTMLInputMaskElement>('inputRef');

const imaskInstance = ref<InputMask<{ mask: string }> | null>(null);

function setupIMask() {
  if (!props.mask || !inputRef.value) return;

  imaskInstance.value = IMask(inputRef.value, {
    mask: props.mask as string,
    ...props.maskOptions,
  });

  imaskInstance.value.value = String(props.modelValue || '');

  if (!props.modelModifiers?.lazy) {
    imaskInstance.value.on('accept', () => {
      model.value = imaskInstance.value?.unmaskedValue || null;
    });
  }
}

onMounted(setupIMask);

// Update IMask value when prop modelValue changes
function resetImaskValue() {
  if (imaskInstance.value) {
    imaskInstance.value.unmaskedValue = String(props.modelValue ?? '');
  }
}

watch(() => props.modelValue, resetImaskValue);

// Update IMask options when mask changes
watch(() => props.mask, () => {
  if (!imaskInstance.value) return;

  imaskInstance.value.updateOptions({ mask: props.mask as string });

  resetImaskValue();
});
</script>