<template>
  <input
    v-model.lazy="inputValue"
    class="playoff-card-input"
    type="number"
    placeholder="-"
  />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { ScoreInput } from '@/types/Playoff';
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: ScoreInput) => emit('update:modelValue', value),
});
</script>

<style lang="scss" scoped>
.playoff-card-input {
  @include focus-ring;
  width: 100%;
  height: 50%;
  padding: 0.25rem;
  background-color: transparent;
  border: 0;
  border-radius: inherit;
  font-weight: $font-weight--semibold;
  text-align: center;
  &:focus {
    border: 1px solid $color--primary;
    box-shadow: 0 0 0 0.2rem get-hexadecimal-transparency($color--primary, 25);
    &::placeholder {
      opacity: 0;
    }
  }
}
</style>
