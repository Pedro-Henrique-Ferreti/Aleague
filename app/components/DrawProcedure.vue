<template>
  <div class="flex items-center justify-between mb-1">
    <AppButton
      class="btn-ghost px-0.5"
      label="Voltar"
      :icon-left="IconArrowNarrowLeft"
      @click="seedingDraw.previousStep"
    />
  </div>
  <BreadcrumbList class="flex justify-center pt-0">
    <DrawProcedurePotBadge
      v-for="pot, index in seedingDraw.pots.value"
      :key="pot.id"
      :index="index"
      :type="index === seedingDraw.activePotIndex.value ? 'active' : index < seedingDraw.activePotIndex.value ? 'completed' : undefined"
    />
  </BreadcrumbList>
  <TeamGroupCard>
    <TeamDetails
      v-for="team in seedingDraw.pots.value[seedingDraw.activePotIndex.value]?.participants"
      :key="team"
      :team="getTeamById(team)!"
  />
  </TeamGroupCard>
  <DrawProcedureSeedingGroups :groups="seedingDraw.procedureForm.value.groups" />
</template>

<script lang="ts" setup>
import { IconArrowNarrowLeft } from '@tabler/icons-vue';
import { getTeamById } from '~/helpers/team';

defineProps<{
  seedingDraw: ReturnType<typeof useSeedingDraw>;
}>();
</script>
