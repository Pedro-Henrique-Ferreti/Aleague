<template>
  <button
    v-if="!to"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
  <NuxtLink
    v-else
    :target="isExternalLink ? '_blank' : undefined"
    :to="to"
    @click="handleClick"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts">
export interface BaseButtonProps {
  to?: RouteLocationRaw;
  type?: ButtonHTMLAttributes['type'];
  disabled?: boolean;
}
</script>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'button',
});
const emit = defineEmits(['click']);

const isExternalLink = computed(() => (
  typeof props.to === 'string' && (
    props.to.startsWith('http')
    || props.to.startsWith('tel')
    || props.to.startsWith('mailto')
  )
));

function handleClick(event: Event) {
  /**
   * Prevents <a> and <NuxtLink> elements from being activated
   * with Tab + Enter keys when button is disabled
   */
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit('click', event);
}
</script>
