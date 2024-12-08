<template>
  <label
    class="team-menu-item"
    :for="elementId"
    :data-disabled="item.disabled"
  >
    <input
      v-model="inputValue"
      class="team-menu-item__input"
      type="radio"
      :value="item.id"
      :id="elementId"
      :disabled="item.disabled"
    />
    <img
      class="team-menu-item__image"
      :src="item.emblem.url"
      :alt="`${item.name}'s emblem`"
    />
    <span class="team-menu-item__name">
      {{ item.name }}
    </span>
    <AppChip
      v-if="item.disabled"
      size="small"
      color="blue"
      :rounded="false"
    >
      {{ item.labelText }}
    </AppChip>
    <IconRadioControl
      v-else
      :checked="item.id === inputValue"
    />
  </label>
</template>

<script lang="ts" setup>
import type { SelectTeamMenuOption } from '@/types/SelectTeamMenu';
import { computed, type PropType } from 'vue';
import IconRadioControl from './IconRadioControl.vue';
import AppChip from './AppChip.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  item: {
    type: Object as PropType<SelectTeamMenuOption>,
    required: true,
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set(value) {
    emit('update:modelValue', value);
  },
});
const elementId = computed(() => `select-team-list-item--${props.item.id}`);
</script>

<style lang="scss" scoped>
.team-menu-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.5rem;
  &[data-disabled="true"] {
    .team-menu-item__name {
      color: $color--text-400;
      text-decoration: line-through;
    }
  }
  &:not([data-disabled="true"]) {
    cursor: pointer;
    transition: color $transition--fastest linear;
    &:hover {
      color: $color--text-strong;
    }
  }
  &__input {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
  }
  &__image {
    max-width: 1.5rem;
    max-height: 1.5rem;
  }
}
</style>
