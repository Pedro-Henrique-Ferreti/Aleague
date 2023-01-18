<template>
  <section class="competition-rules-form__section">
    <div class="competition-rules-form__section-header">
      <span class="competition-rules-form__section-title | text-darken">
        {{ title }}
      </span>
      <span
        v-if="participants !== null"
        class="competition-rules-form__section-participants"
      >
        {{ participants }} participantes
      </span>
    </div>
    <slot />
  </section>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  participants: {
    type: Number,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.competition-rules-form {
  &__section-header {
    margin-bottom: 1rem;
  }
  &__section-title {
   font-size: 1.125rem;
   font-weight: $font-weight--semibold;
  }
  &__section-participants {
    display: inline-block;
    margin-left: 0.5rem;
    font-size: 0.875rem;
    font-weight: $font-weight--semibold;
  }
}
</style>
