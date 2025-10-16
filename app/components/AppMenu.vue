<template>
  <AppButton
    class="[anchor-name:--tournament-settings]"
    :label="label"
    :class="$attrs.class"
    :popovertarget="id"
    :icon-left="icon"
    :icon-right="IconChevronDown"
  />
  <ul
    class="dropdown menu w-12 rounded-box bg-base-100 shadow-sm [position-anchor:--tournament-settings]"
    popover
    :id="id"
  >
    <li
      v-for="item, index in items"
      :key="index"
    >
      <button
        type="button"
        @click="item.onClick"
      >
        <Component
          class="size-1"
          :is="item.icon"
        />
        <span>{{ item.label }}</span>
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
export interface MenuItem {
  label: string;
  icon: unknown;
  onClick?: () => void;
}
</script>

<script lang="ts" setup>
import { IconChevronDown } from '@tabler/icons-vue';

const id = useId();

defineProps<{
  items: MenuItem[];
  label: string;
  icon?: unknown;
}>();
</script>
