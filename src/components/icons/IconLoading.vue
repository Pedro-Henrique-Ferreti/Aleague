<template>
  <svg
    class="ring"
    viewBox="25 25 50 50"
    stroke-width="4"
  >
    <circle
      class="ring__circle"
      cx="50"
      cy="50"
      r="20"
    />
  </svg>
</template>

<style lang="scss" scoped>
.ring {
  --animation-speed: 2s;

  vertical-align: middle;
  transform-origin: center;
  animation: rotate var(--animation-speed) linear infinite;
  &__circle {
    fill: none;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: stretch calc(var(--animation-speed) * 0.75) ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes stretch {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dashoffset: -124px;
    }
  }
}
</style>
