<template>
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="radio-input"
    :data-checked="checked"
  >
    <template v-if="checked">
      <circle
        cx="7"
        cy="7"
        r="6.5"
        fill="white"
        style="stroke: var(--color)"
      />
      <circle
        cx="6.99998"
        cy="7.00016"
        r="4.66667"
        style="fill: var(--color)"
      />
    </template>
    <circle
      v-else
      cx="7"
      cy="7"
      r="6.5"
      fill="white"
      style="stroke: var(--color)"
    />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.radio-input {
  --color: #{$color--light-gray-1};
  &[data-checked="true"] {
    --color: #{$color--tertiary};
  }
}
</style>
