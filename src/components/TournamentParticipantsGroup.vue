<template>
  <div class="group">
    <AppChip
      class="group__chip"
      color="blue"
      text="Equipes"
    />
    <button
      v-for="item in slots"
      class="group__empty-slot-button"
      type="button"
      :key="item"
    >
      <IconPlus />
      <span>Adicionar</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import IconPlus from '@/assets/icons/Plus.svg';
import AppChip from './AppChip.vue';

const emit = defineEmits(['update:selectedTeams']);
const props = defineProps({
  selectedTeams: {
    type: Array as PropType<string[]>,
    required: true,
  },
  slots: {
    type: Number,
    required: true,
  },
});

const selectedTeamsValue = computed({
  get: () => props.selectedTeams,
  set: (value) => emit('update:selectedTeams', value),
});
console.log(selectedTeamsValue);
</script>

<style lang="scss" scoped>
.group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19.25rem, 1fr));
  gap: 0.5rem;
  padding: 0.5rem 0.625rem;
  padding-top: 1.25rem;
  border: 1px solid $color--neutral-300;
  border-radius: $radius--large;
  position: relative;
  &__chip {
    position: absolute;
    top: -0.875rem;
    left: 50%;
    transform: translateX(-50%);
  }
  &__empty-slot-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    height: 2.375rem;
    background-color: $color--neutral-100;
    border: 1px dashed $color--neutral-300;
    border-radius: $radius--medium;
    font-size: 0.875rem;
    transition: border-color $transition--fastest;
    &:hover {
      border-color: $color--text-400;
    }
    svg {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
}
</style>
