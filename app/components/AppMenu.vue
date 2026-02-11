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
    popover
    :id="id"
    :class="['dropdown menu w-fit min-w-10 rounded-box bg-base-100 shadow-sm', dropdownClass]"
    :style="`position-anchor: --menu-${id}`"
  >
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import { IconChevronDown, type Icon } from '@tabler/icons-vue';

export interface AppMenuProps {
  label?: string;
  iconLeft?: Icon;
  iconRight?: Icon | false;
  dropdownClass?: string;
  tooltip?: string;
}

const id = useId();

const props = withDefaults(defineProps<AppMenuProps>(), {
  iconRight: undefined,
});

const displayedIconRight = computed(() => {
  if (props.iconRight !== false) {
    return props.iconRight ?? IconChevronDown;
  }
});
</script>
