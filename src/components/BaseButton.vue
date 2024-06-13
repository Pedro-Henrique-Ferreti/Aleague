<template>
  <button
    v-if="!to"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
  <a
    v-else-if="renderExternalLink"
    target="_blank"
    rel="noopener"
    :href="(to as string)"
    @click="handleClick"
  >
    <slot />
  </a>
  <router-link
    v-else
    :to="to"
    @click="handleClick"
  >
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes, PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { computed } from 'vue';

const emit = defineEmits(['click']);
const props = defineProps({
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: '',
  },
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const renderExternalLink = computed(() => (
  typeof props.to === 'string' && (
    props.to.startsWith('http')
    || props.to.startsWith('tel')
    || props.to.startsWith('mailto')
  )
));

function handleClick(event: Event) {
  /**
   * Prevents <a> and <router-link> elements from being activated
   * with Tab + Enter keys when button is disabled
   */
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit('click', event);
}
</script>
