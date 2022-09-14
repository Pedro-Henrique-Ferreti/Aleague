<template>
  <div class="tab-panel">
    <div class="tab-panel__tab-grid">
      <button
        v-for="tab in tabs"
        type="button"
        class="tab-panel__item"
        :class="{ 'tab-panel__item--active': activeTabId === tab.id }"
        :key="tab.id"
        @click="$emit('set-active-tab', tab.id)"
      >
        {{ tab.name }}
      </button>
    </div>
    <div class="tab-panel__controls-slot">
      <slot name="controls" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { TabPanelTab } from '@/types/TabPanel';

defineEmits(['set-active-tab']);
defineProps({
  tabs: {
    type: Array as PropType<TabPanelTab[]>,
    required: true,
  },
  activeTabId: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.tab-panel {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid $color--light-gray-1;
  &__controls-slot {
    display: flex;
    gap: 1.5rem;
    padding-bottom: 0.5rem;
    @include for-large-tablet-portrait-down {
      display: none;
    }
  }
  &__tab-grid {
    display: flex;
    gap: 1.5rem;
  }
  &__item {
    @include focus-ring($apply-position: false);
    padding: 0 0.5rem;
    color: $color--text-lighten;
    font-size: 1.125rem;
    font-weight: $font-weight--semibold;
    position: relative;
    white-space: nowrap;
    &--active {
      color: $color--secondary;
      &::before {
        content: '';
        height: 0.125rem;
        background-color: $color--secondary;
        border-radius: 4px 4px 0 0;
        position: absolute;
        bottom: calc(-0.5rem - 1px);
        left: 0;
        right: 0;
      }
    }
  }
}
</style>
