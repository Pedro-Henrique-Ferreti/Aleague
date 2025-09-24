<template>
  <AppFieldset :label="label">
    <div class="join">
      <button
        class="btn btn-soft join-item"
        type="button"
        aria-label="Remover"
        :disabled="inputValue <= min"
        @click="inputValue -= step"
      >
        <IconMinus class="w-1" />
      </button>
      <div>
        <BaseInput
          v-model="inputValue"
          class="join-item [&_input]:text-center [&_input]:cursor-default"
          readonly
          :name="name"
        />
      </div>
      <button
        class="btn btn-soft join-item"
        type="button"
        aria-label="Adicionar"
        :disabled="inputValue >= max"
        @click="inputValue += step"
      >
        <IconPlus class="w-1" />
      </button>
    </div>
  </AppFieldset>
</template>

<script lang="ts" setup>
import { IconMinus, IconPlus } from '@tabler/icons-vue';

const props = withDefaults(defineProps<{
  label: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
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
