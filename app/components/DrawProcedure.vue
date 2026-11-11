<template>
  <div class="flex items-center justify-end mb-0.75">
    <AppButton
      class="btn-secondary btn-soft"
      label="Sortear"
      :disabled="seedingDraw.isProcedureStepCompleted.value"
      :icon-left="IconPlayerPlay"
      @click="seedingDraw.drawTeam"
    />
  </div>
  <BreadcrumbList class="flex justify-center pt-0">
    <DrawProcedurePotBadge
      v-for="pot, index in seedingDraw.pots.value"
      :key="pot.id"
      :index="index"
      :status="seedingDraw.potStatus.value[pot.id]"
    />
  </BreadcrumbList>
  <TeamGroupCard class="max-h-14 [&_.card-body]:overflow-y-auto">
    <TeamDetails
      v-for="team in seedingDraw.activePot.value?.teams"
      :key="team"
      class="h-2 animate-fade"
      :class="{ hidden: seedingDraw.drewTeams.value.includes(team) }"
      :team="getTeamById(team)!"
    />
  </TeamGroupCard>
  <DrawProcedureSeedingGroups
    :groups="seedingDraw.procedureForm.value.groups"
    :active-team-seeding-group="seedingDraw.activeTeamSeedingGroup"
  />
</template>

<script lang="ts" setup>
import { IconPlayerPlay } from '@tabler/icons-vue';
import { getTeamById } from '~/helpers/team';

defineProps<{
  seedingDraw: ReturnType<typeof useSeedingDraw>;
}>();
</script>
