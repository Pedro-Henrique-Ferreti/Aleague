<template>
  <AppButton
    :style="`anchor-name: --menu-${id}`"
    :label="label"
    :class="$attrs.class"
    :popovertarget="id"
    :icon-left="icon"
    :icon-right="IconChevronDown"
  />
  <ul
    class="dropdown menu w-fit min-w-10 rounded-box bg-base-100 shadow-sm"
    popover
    :id="id"
    :style="`position-anchor: --menu-${id}`"
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
  icon: Icon;
  onClick?: () => void;
}
</script>

<script lang="ts" setup>
import { IconChevronDown, type Icon } from '@tabler/icons-vue';

const id = useId();

defineProps<{
  items: MenuItem[];
  label: string;
  icon?: Icon;
}>();
</script>
