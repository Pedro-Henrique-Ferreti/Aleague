<template>
  <component
    :is="element"
    v-bind="element === 'button' && { type: 'button', disabled }"
    class="flex items-center gap-0.5 text-left"
    :class="{
      'flex-row-reverse text-right': align === 'right',
      'match-team-button': element === 'button',
      'text-base-content/60': element === 'div' && disabled,
    }"
    @click="element === 'button' && $emit('click')"
  >
    <TeamDetails
      v-if="teamDetails"
      class="gap-0.5!"
      :class="{
        'flex-row-reverse text-right': align === 'right',
        '[&>span]:bg-amber-300': isHighlighted,
      }"
      :team="teamDetails"
      :show-country="showCountry"
    />
    <template v-else>
      <IconShieldFilled class="size-1.5 shrink-0 fill-gray-300" />
      <span>A definir</span>
    </template>
  </component>
</template>

<script lang="ts" setup>
import { IconShieldFilled } from '@tabler/icons-vue';
import { getTeamById } from '@/helpers/team';

const props = defineProps<{
  team?: TeamDetails['id'] | null;
  align?: 'right';
  showCountry?: boolean;
  isHighlighted?: boolean;
  isClickable?: boolean;
  disabled?: boolean;
}>();

defineEmits<{
  click: [];
}>();

const element = computed(() => props.isClickable ? 'button' : 'div');

const teamDetails = computed(() => props.team ? getTeamById(props.team) : undefined);
</script>

<style scoped>
@reference '@/assets/css/main.css';

.match-team-button {
  @apply disabled:opacity-60;
  &:not(:disabled) {
    @apply cursor-pointer transition-colors hover:text-base-content/60;
  }
}
</style>
