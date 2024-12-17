<template>
  <div
    class="tab-panel | app-base-card"
    :class="$attrs.class"
  >
    <label
      v-for="tab in items"
      :key="tab.id"
      :for="tab.elementId || tab.id"
    >
      <input
        v-model="inputValue"
        :id="tab.elementId || tab.id"
        class="tab-panel__input"
        type="radio"
        :name="tab.name"
        :value="tab.id"
        @keypress.enter="($event.target as HTMLInputElement).click()"
      />
      <span
        class="tab-panel__tab"
        :data-active="inputValue === tab.id"
      >
        {{ tab.name }}
      </span>
    </label>
  </div>
  <TransitionFade>
    <slot :active-tab-id="inputValue" />
  </TransitionFade>
</template>

<script lang="ts" setup>
import type { TabPanelTab } from '@/types/TabPanel';
import { computed, ref, type PropType } from 'vue';
import TransitionFade from './TransitionFade.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String as PropType<string | null>,
    default: null,
  },
  items: {
    type: Array as PropType<TabPanelTab[]>,
    required: true,
  },
});

const activeTabId = ref(props.items[0].id);

const inputValue = computed({
  get() {
    return (props.modelValue !== null) ? props.modelValue : activeTabId.value;
  },
  set(value) {
    activeTabId.value = value;
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss" scoped>
.tab-panel {
  --base-card--padding: 0.75rem;
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
  gap: 0.25rem;
  border-radius: 0.75rem;
  &__tab {
    display: flex;
    align-items: center;
    height: 2.5rem;
    padding: 0 0.75rem;
    border-radius: 0.375rem;
    font-weight: $font-weight--medium;
    cursor: pointer;
    &[data-active="true"] {
      background-color: $color--neutral-50;
      color: $color--primary-800;
    }
    transition:
      background-color $transition--fast,
      color $transition--1;
    &:hover:not([data-active="true"]) {
      background-color: $color--neutral-50;
    }
  }
  &__input {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    &:focus-visible {
      + .tab-panel__tab {
        outline: 2px solid $color--black;
      }
    }
  }
}
</style>
