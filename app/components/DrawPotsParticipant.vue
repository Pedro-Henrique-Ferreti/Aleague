<template>
  <AppMenu :dropdown-class="{ 'dropdown-close': disabled }">
    <template #trigger="{ popovertarget, style }">
      <BaseButton
        class="btn btn-ghost border border-dashed border-base-200 hover:border-transparent font-normal justify-start"
        :popovertarget
        :style
        :disabled
      >
        <TeamDetails
          class="text-base-content"
          :class="{ 'text-base-content opacity-40': disabled }"
          :team="getTeamById(participant)!"
        />
      </BaseButton>
    </template>
    <AppMenuItem
      v-for="pot in potsCount"
      :key="pot"
      :label="`Pote ${pot}`"
      :icon="IconArrowRightToArc"
      @click="$emit('addToPot', pot)"
    />
  </AppMenu>
</template>

<script lang="ts" setup>
import { IconArrowRightToArc } from '@tabler/icons-vue';
import { getTeamById } from '~/helpers/team';

defineProps<{
  participant: DrawParticipant;
  potsCount: number;
  disabled?: boolean;
}>();

defineEmits<{
  addToPot: [potNumber: number];
}>();
</script>
