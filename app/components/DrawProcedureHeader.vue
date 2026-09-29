<template>
  <BreadcrumbList class="flex justify-center">
    <BreadcrumbItem
      v-for="pot, index in drawPots"
      :key="pot.id"
    >
      <div
        class="badge badge-md transition-colors min-w-5.5"
        :class="{
          'badge-secondary badge-outline': index === activePotIndex,
          'badge-success badge-soft': index < activePotIndex,
        }"
      >
        <IconCircleCheck
          v-if="index < activePotIndex"
          class="size-[1em]"
        />
        {{ getDrawPotName(index) }}
      </div>
    </BreadcrumbItem>
  </BreadcrumbList>
  <TeamGroupCard>
    <TeamDetails
      v-for="team in drawPots[activePotIndex]?.participants"
      :key="team"
      :team="getTeamById(team)!"
    />
  </TeamGroupCard>
</template>

<script lang="ts" setup>
import { IconCircleCheck } from '@tabler/icons-vue';
import { getDrawPotName } from '~/helpers/draw';
import { getTeamById } from '~/helpers/team';

defineProps<{
  drawPots: DrawPot[];
  activePotIndex: number;
}>();
</script>
