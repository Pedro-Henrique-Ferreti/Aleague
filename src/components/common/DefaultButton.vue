<template>
  <button
    v-if="!to"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
  <a
    v-else-if="typeof to === 'string' && to.startsWith('http')"
    target="_blank"
    rel="noopener"
    :href="to"
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

<script setup>
const emit = defineEmits(['click']);
const props = defineProps({
  to: {
    type: [String, Object],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

function handleClick(event) {
  /**
   * Prevents <a> and <router-link> elements from being activated
   * with Tab + Enter keys when button is disabled 
   */
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit('click');
}
</script>
