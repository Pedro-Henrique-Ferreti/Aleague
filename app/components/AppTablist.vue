<template>
  <div
    role="tablist"
    class="tabs tabs-border"
    :class="$attrs.class"
  >
    <component
      v-for="vnode, index in tabItemVNodes"
      :is="vnode"
      :key="vnode.key"
      :id="getTabId(index)"
      :aria-controls="getPanelId(index)"
      :is-active="activeTabIndex === index"
      @click="activeTabIndex = index"
    />
  </div>
  <div
    v-for="vnode, index in tabPanelVNodes"
    v-show="activeTabIndex === index"
    :key="vnode.key"
    :id="getPanelId(index)"
    role="tabpanel"
    :aria-labelledby="getTabId(index)"
  >
    <component :is="vnode" />
  </div>
</template>

<script setup lang="ts">
const id = useId();
const slots = useSlots();

const activeTabIndex = ref(0);

const tabItemVNodes = computed(() => slots.default?.() ?? []);
const tabPanelVNodes = computed(() => slots.tabpanels?.() ?? []);

function getTabId(index: number) {
  return `${id}-tab-${index}`;
}

function getPanelId(index: number) {
  return `${id}-tabpanel-${index}`;
}
</script>
