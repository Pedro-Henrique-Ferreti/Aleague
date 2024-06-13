<template>
  <div
    class="spinner"
    aria-label="Loading..."
    aria-valuemin="0"
    aria-valuemax="100"
    role="progressbar"
  >
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle class="spinner__track" cx="50" cy="50" r="45" />
      <circle class="spinner__indicator" cx="50" cy="50" r="45" stroke-dashoffset="280" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  size: {
    type: String,
    default: '64',
  },
});
</script>

<style lang="scss" scoped>
.spinner {
  --default-track-color: #{$color--neutral-300};
  --default-indicator-color: #{$color--primary};

  display: flex;
  svg {
    width: calc((v-bind(size) / 16) * 1rem);
    height: calc((v-bind(size) / 16) * 1rem);
    animation: 2s linear infinite spinner-animation;
  }
  &__track {
    display: block;
    fill: transparent;
    stroke: var(--track-color, var(--default-track-color));
    stroke-linecap: round;
    stroke-width: 10px;
    transform-origin: 50% 50%;
  }
  &__indicator {
    display: block;
    fill: transparent;
    stroke: var(--indicator-color, var(--default-indicator-color));
    stroke-linecap: round;
    stroke-dasharray: 283;
    stroke-width: 10px;
    transform-origin: 50% 50%;
    transform: rotate(-90deg);
    animation: 1.5s ease-in-out infinite both indicator-animation;
  }
}
@keyframes spinner-animation {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes indicator-animation {
  0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }
  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }
  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
}
</style>
