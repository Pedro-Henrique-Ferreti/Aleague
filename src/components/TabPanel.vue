<template>
  <div
    class="tab-panel"
    ref="tabPanel"
  >
    <div class="tab-panel__tab-grid">
      <div
        v-for="{ id, elementId, name } in tabs"
        class="tab-panel__item"
        :key="id"
        :data-id="id"
      >
        <input
          v-model="activeTabId"
          class="tab-panel__item-input"
          type="radio"
          :name="name"
          :id="elementId || id"
          :value="id"
        />
        <label
          v-text="name"
          class="tab-panel__item-label"
          :for="elementId || id"
        />
      </div>
      <div
        class="tab-panel__marker"
        aria-hidden="true"
        :style="`--width: ${markerWidth}px; --position: ${markerPosition}px;`"
      />
    </div>
    <div class="tab-panel__controls-slot">
      <slot name="controls" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { TabPanelTab } from '@/types/TabPanel';
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';

const emit = defineEmits(['update:active-tab-id']);
const props = defineProps({
  tabs: {
    type: Array as PropType<TabPanelTab[]>,
    required: true,
  },
  activeTabId: {
    type: [String, Number],
    required: true,
  },
});

const activeTabId = computed({
  get: () => props.activeTabId,
  set(value) {
    emit('update:active-tab-id', value);
  },
});

onMounted(getMarkerStyles);
watch(() => props.activeTabId, getMarkerStyles);
addEventListener('resize', getMarkerStyles);
onBeforeUnmount(() => removeEventListener('resize', getMarkerStyles));

const tabPanel = ref<HTMLDivElement | null>(null);

const markerWidth = ref(0);
const markerPosition = ref(0);

function getMarkerStyles() {
  if (!tabPanel.value) return;

  const { left: tabPanelPosition } = tabPanel.value.getBoundingClientRect();

  const activeTab = tabPanel.value.querySelector(`[data-id=${activeTabId.value}]`);

  if (!activeTab) return;

  const { width, left: activeTabPosition } = activeTab.getBoundingClientRect();

  markerWidth.value = width;
  markerPosition.value = activeTabPosition - tabPanelPosition;
}
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
    position: relative;
  }
  &__marker {
    width: var(--width, 24px);
    height: 0.125rem;
    background-color: $color--secondary;
    border-radius: 4px 4px 0 0;
    transition: all $transition--fastest ease;
    position: absolute;
    left: var(--position, 0);
    bottom: calc(-0.5rem - 1px);
  }
  &__item {
    padding: 0 0.5rem;
    position: relative;
    white-space: nowrap;

  }
  &__item-label {
    color: $color--text-lighten;
    font-size: 1.125rem;
    font-weight: $font-weight--semibold;
    cursor: pointer;
  }
  &__item-input {
    width: 0;
    height: 0;
    opacity: 0;
    visibility: hidden;
    &:checked {
      &~.tab-panel__item-label {
        color: $color--secondary;
      }
    }
  }
}
</style>
