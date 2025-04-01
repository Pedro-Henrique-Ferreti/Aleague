<template>
  <li
    class="team-option"
    tabindex="-1"
    :data-focused="isFocused"
    @click="$emit('select')"
    @keypress.enter.prevent="$emit('select')"
  >
    <div class="team-option__content">
      <img
        class="team-option__emblem"
        alt="Team emblem"
        :src="team.emblem.url"
      />
      <span>{{ team.name }}</span>
    </div>
    <AppChip :text="t(`countryAbbreviations.${team.country}`)">
      <template #icon-left>
        <img
          :src="`/images/country-flag/${team.country}.svg`"
          alt="Team country flag"
        />
      </template>
    </AppChip>
  </li>
</template>

<script lang="ts" setup>
import type { TeamPreview } from '@/types/Team';
import type { PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import AppChip from './AppChip.vue';

const { t } = useI18n();

defineEmits(['select']);
defineProps({
  team: {
    type: Object as PropType<TeamPreview>,
    required: true,
  },
  isFocused: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.team-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  height: 2rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  transition:
    background-color $transition--fastest linear,
    color $transition--fastest linear;
  cursor: pointer;
  &:hover,
  &[data-focused="true"] {
    background-color: $color--neutral-200;
    color: $color--text-strong;
  }
  &__content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__emblem {
    max-width: 1.25rem;
    max-height: 1.25rem;
  }
}
</style>
