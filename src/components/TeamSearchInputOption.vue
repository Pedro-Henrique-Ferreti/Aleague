<template>
  <button
    class="team-option"
    type="button"
    tabindex="-1"
    :disabled="disabled"
    :data-focused="focused"
    @click="$emit('select')"
    @keypress.enter.prevent="$emit('select')"
  >
    <div class="team-option__content">
      <img
        class="team-option__emblem"
        alt="Team emblem"
        :src="team?.emblem.url"
      />
      <span class="team-option__name">
        {{ team?.name }}
      </span>
      <AppChip
        v-if="leftChipText"
        color="blue"
        size="small"
        :text="leftChipText"
      />
    </div>
    <AppChip :text="team?.isNational ? 'INT' : t(`countryAbbreviations.${team?.country}`)">
      <template #icon-left>
        <img
          alt="Team country flag"
          :src="`/images/country-flag/${team?.isNational ? 'INT.png' : `${team?.country}.svg`}`"
        />
      </template>
    </AppChip>
  </button>
</template>

<script lang="ts" setup>
import type { TeamSlot } from '@/views/EditTournamentTeamsView.vue';
import type { PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import AppChip from './AppChip.vue';

const { t } = useI18n();

defineEmits(['select']);
defineProps({
  team: {
    type: Object as PropType<TeamSlot>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  focused: {
    type: Boolean,
    default: false,
  },
  leftChipText: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.team-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 2rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  transition:
    background-color $transition--fastest linear,
    color $transition--fastest linear;
  &:hover:not(:disabled),
  &[data-focused="true"] {
    background-color: $color--neutral-200;
    color: $color--text-strong;
  }
  &:disabled .team-option__content > .team-option__name {
    color: $color--text-400;
    text-decoration: line-through;
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
