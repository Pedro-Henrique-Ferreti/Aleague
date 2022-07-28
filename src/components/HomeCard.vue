<template>
  <router-link :to="path">
    <section
      class="home-card"
      :class="cardClasses"
    >
      <div class="home-card__content">
        <span class="home-card__icon-wrapper">
          <BaseIcon
            class="home-card__icon"
            :icon="icon"
          />
        </span>
        <div class="home-card__">
          <h2 class="home-card__title">
            {{ title }}
          </h2>
          <p class="home-card__description">
            {{ description }}
          </p>
        </div>
      </div>
      <div class="home-card__footer">
        <span class="home-card__footer-text">Ir para {{ title }}</span>
        <BaseIcon
          class="home-card__footer-icon"
          icon="arrow-foward"
        />
      </div>
    </section>
  </router-link>
</template>

<script>
const validThemes = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
};
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  theme: {
    type: String,
    default: validThemes.primary,
    validator: (theme) => Object.values(validThemes).includes(theme),
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  path: {
    type: [String, Object],
    required: true,
  },
});

const cardClasses = computed(() => ({
  'home-card--primary': props.theme === validThemes.primary,
  'home-card--secondary': props.theme === validThemes.secondary,
  'home-card--tertiary': props.theme === validThemes.tertiary,
}));
</script>

<style lang="scss" scoped>
.home-card {
  --icon-color: #{$color--primary};
  --icon-background-color: #{$color--primary-lighten-4};
  &--secondary {
    --icon-color: #{$color--secondary};
    --icon-background-color: #{$color--secondary-lighten-3};
  }
  &--tertiary {
    --icon-color: #{$color--tertiary};
    --icon-background-color: #{$color--tertiary-lighten-4};
  }

  display: flex;
  flex-direction: column;
  min-height: 12rem;
  padding: 1rem;
  background-color: $color--white;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.75rem;
  box-shadow: $box-shadow--layer-1;
  transition:
    transform $transition--fast ease-in-out,
    box-shadow $transition--fast ease-in-out;
  &:hover {
    transform: scale(1.005);
    box-shadow: $box-shadow--layer-2;
  }
  &__content {
    display: grid;
    grid-template-columns: 3rem 1fr;
    gap: 1rem;
  }
  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    background-color: var(--icon-background-color);
    border-radius: 50%;
  }
  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--icon-color);
  }
  &__title {
    margin-bottom: 0.5rem;
    color: $color--text-darken;
    font-size: 1.25rem;
    font-weight: $font-weight--bold;
  }
  &__footer {
    display: flex;
    align-items: center;
    margin-top: auto;
    padding-top: 1rem;
  }
  &__footer-text {
    color: $color--tertiary-lighten-1;
    font-weight: $font-weight--semibold;
  }
  &__footer-icon {
    width: 0.75rem;
    height: 0.75rem;
    margin-left: 0.5rem;
    fill: $color--tertiary-lighten-1;
  }
  @include for-large-tablet-landscape-up {
    min-height: 19.5rem;
    padding: 1.5rem;
    .home-card__content {
      display: block;
    }
    .home-card__icon-wrapper {
      width: 4rem;
      height: 4rem;
      margin-bottom: 2rem;
    }
    .home-card__icon {
      width: 2rem;
      height: 2rem;
    }
  }
  @include for-large-desktop-up {
    max-width: 20rem;
    min-height: 21rem;
  }
}
</style>
