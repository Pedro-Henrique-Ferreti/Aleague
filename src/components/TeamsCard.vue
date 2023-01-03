<template>
  <button
    class="team-card"
    type="button"
    @click="$emit('click')"
  >
    <div class="team-card__content">
      <BaseIcon
        v-if="isFavorite"
        class="team-card__icon-favorite"
        icon="bookmark"
      />
      <span class="team-card__name">
        {{ name }}
      </span>
    </div>
  </button>
</template>

<script lang="ts" setup>
defineEmits(['click']);
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
  @include focus-ring;
  min-height: 3.5rem;
  background-color: $color--white;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.5rem;
  box-shadow: $shadow--small;
  text-align: left;
  transition: background-color $transition--fastest ease-in;
  &:hover {
    background-color: $color--light-gray-2;
  }
  &__content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0.5rem 1rem;
    position: relative;
    overflow: hidden;
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
