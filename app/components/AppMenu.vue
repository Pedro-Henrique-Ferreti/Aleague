<template>
  <slot
    name="trigger"
    :style="triggerStyles"
    :popovertarget="id"
  >
    <AppButton
      v-tooltip="tooltip"
      :style="triggerStyles"
      :label="label"
      :class="$attrs.class"
      :popovertarget="id"
      :icon-left="iconLeft"
      :icon-right="displayedIconRight"
      :disabled="disabled"
      :aria-label="ariaLabel"
    />
  </slot>
  <component
    :is="dropdownElement"
    :id="id"
    popover
    :class="['dropdown menu rounded-box bg-base-100 shadow-sm', dropdownClass]"
    :style="`position-anchor: --menu-${id}`"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { type Icon, IconChevronDown } from '@tabler/icons-vue';

export interface AppMenuProps {
  label?: string;
  iconLeft?: Icon;
  iconRight?: Icon | false;
  dropdownClass?: string;
  dropdownElement?: 'ul' | 'div';
  tooltip?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<AppMenuProps>(), {
  iconRight: undefined,
  dropdownElement: 'ul',
});

const id = useId();

const triggerStyles = computed(() => `anchor-name: --menu-${id}`);
const displayedIconRight = computed(() => (
  props.iconRight !== false ? props.iconRight ?? IconChevronDown : undefined
));
</script>
