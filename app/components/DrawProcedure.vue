<template>
  <div class="flex items-center justify-between mb-1">
    <AppButton
      class="btn-ghost px-0.5"
      label="Voltar"
      :icon-left="IconArrowNarrowLeft"
      @click="seedingDraw.previousStep"
    />
    <div>
      <AppButton
        class="btn-secondary btn-soft"
        label="Sortear"
        :disabled="seedingDraw.isProcedureStepCompleted.value"
        :icon-left="IconPlayerPlay"
        @click="seedingDraw.drawTeam"
      />
    </div>
  </div>
  <BreadcrumbList class="flex justify-center pt-0">
    <DrawProcedurePotBadge
      v-for="pot, index in seedingDraw.pots.value"
      :key="pot.id"
      :index="index"
      :status="seedingDraw.potStatus.value[pot.id]"
    />
  </BreadcrumbList>
  <TeamGroupCard>
    <TeamDetails
      v-for="team in seedingDraw.activePot.value?.teams"
      :key="team"
      class="animate-fade"
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
import { IconArrowNarrowLeft, IconPlayerPlay } from '@tabler/icons-vue';
import { getTeamById } from '~/helpers/team';

defineProps<{
  seedingDraw: ReturnType<typeof useSeedingDraw>;
}>();
</script>
