<template>
  <AppFieldset :label="label">
    <div class="join">
      <button
        class="btn btn-soft join-item"
        type="button"
        aria-label="Remover"
        :disabled="disabled || inputValue <= min"
        @click="inputValue -= step"
      >
        <IconMinus class="w-1" />
      </button>
      <div>
        <label
          class="join-item input w-full"
          :for="id"
        >
          <BaseInput
            v-model="inputValue"
            class="text-center cursor-default grow"
            readonly
            :id="id"
            :disabled="disabled"
          />
        </label>
      </div>
      <button
        class="btn btn-soft join-item"
        type="button"
        aria-label="Adicionar"
        :disabled="disabled || inputValue >= max"
        @click="inputValue += step"
      >
        <IconPlus class="w-1" />
      </button>
    </div>
  </AppFieldset>
</template>

<script lang="ts" setup>
import { IconMinus, IconPlus } from '@tabler/icons-vue';

const id = useId();

const props = withDefaults(defineProps<{
  label: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}>(), {
  step: 1,
  min: 0,
  max: Number.MAX_SAFE_INTEGER,
});

const model = defineModel<number>({ default: 0 });

const inputValue = computed({
  get: () => model.value, 
  set(value: number) {
    if (value < props.min || (value > props.max)) return;

    model.value = value;
  },
});
</script>
