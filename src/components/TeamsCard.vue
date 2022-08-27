<template>
  <button
    class="team-card"
    type="button"
  >
    <BaseIcon
      v-if="isFavorite"
      class="team-card__icon-favorite"
      icon="bookmark"
    />
    <span class="team-card__name">
      {{ name }}
    </span>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.team-card {
  @include focus-ring($apply-position: false);
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 3.5rem;
  padding: 0.5rem 1rem;
  background-color: $color--white;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.5rem;
  box-shadow: $box-shadow--layer-1;
  text-align: left;
  position: relative;
  overflow: hidden;
  transition: background-color $transition--fastest ease-in;
  &:hover {
    background-color: $color--light-gray-2;
  }
  &__name {
    font-size: 1.125rem;
  }
  &__icon-favorite {
    width: 1.5rem;
    fill: $color--tertiary;
    position: absolute;
    top: -0.1rem;
    right: 1rem;
  }
}
</style>
