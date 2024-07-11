<template>
  <div
    class="country-flag"
    :style="country ? `--bg-color: ${CountryColor[country]}` : null"
  >
    <img
      class="country-flag__image"
      :src="`/images/country-flag/${country || 'INTERNATIONAL'}.svg`"
      :alt="country || 'Internacional'"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { TypeCountry } from '@/types/Country';
import { CountryColor } from '@/constants/country';

defineProps({
  country: {
    type: String as PropType<TypeCountry>,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.country-flag {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  background-color: var(--bg-color, #{$color--neutral-100});
  border-radius: 0.5rem;
  &__image {
    width: 2.25rem;
    height: 2.25rem;
  }
}
</style>
