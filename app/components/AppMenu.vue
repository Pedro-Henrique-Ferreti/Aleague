<template>
  <AppButton
    v-tooltip="tooltip"
    :style="`anchor-name: --menu-${id}`"
    :label="label"
    :class="$attrs.class"
    :popovertarget="id"
    :icon-left="iconLeft"
    :icon-right="displayedIconRight"
  />
  <ul
    :id="id"
    popover
    :class="['dropdown menu rounded-box bg-base-100 shadow-sm', dropdownClass]"
    :style="`position-anchor: --menu-${id}`"
  >
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import { type Icon, IconChevronDown } from '@tabler/icons-vue';

export interface AppMenuProps {
  label?: string;
  iconLeft?: Icon;
  iconRight?: Icon | false;
  dropdownClass?: string;
  tooltip?: string;
}

const props = withDefaults(defineProps<AppMenuProps>(), {
  iconRight: undefined,
});

const id = useId();

const displayedIconRight = computed(() => (
  props.iconRight !== false ? props.iconRight ?? IconChevronDown : undefined
));
</script>
