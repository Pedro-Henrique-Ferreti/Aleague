<template>
  <TeamGroupCard
    title="Participantes"
    class="max-h-[13.625rem] [&_.card-body]:overflow-y-auto mb-2"
  >
    <DrawPotsParticipant
      v-for="team in seedingDraw.participants.value"
      :key="team"
      class="animate-fade"
      :participant="team"
      :pots-count="drawPots.length"
      :disabled="isParticipantDisabled(team)"
      @add-to-pot="drawPots[$event - 1]?.teams.push(team)"
    />
  </TeamGroupCard>
  <div class="flex justify-end gap-0.75">
    <AppTooltip label="Remover equipes">
      <AppButton
        class="btn-sm btn-accent btn-soft btn-square"
        aria-label="Remover equipes"
        :icon-left="IconTrash"
        :disabled="disabled"
        @click="resetDrawPots"
      />
    </AppTooltip>
    <AppTooltip label="Distribuir aleatoriamente">
      <AppButton
        class="btn-sm btn-accent btn-soft btn-square"
        aria-label="Distribuir aleatoriamente"
        :icon-left="IconWand"
        :disabled="disabled"
        @click="seedingDraw.autofillDrawPots"
      />
    </AppTooltip>
    <AppButton
      class="btn-sm btn-secondary btn-soft"
      label="Novo pote"
      :icon-left="IconPlus"
      :disabled="disabled || drawPots.length >= MAX_DRAW_POTS"
      @click="drawPots.push(newDrawPot())"
    />
  </div>
  <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] mt-1">
    <TeamGroupCard
      v-for="pot, index in drawPots"
      :key="pot.id"
      class="max-h-27 [&_.card-body]:overflow-y-auto"
      :title="getDrawPotName(index)"
    >
      <template #badge-icon>
        <CloseButton
          v-if="drawPots.length > 1"
          class="btn-xs -mr-0.5"
          aria-label="Remover pote"
          @click="drawPots.splice(index, 1)"
        />
      </template>
      <TeamSlot
        v-for="(team, teamIndex) in pot.teams"
        :key="team"
        show-clear-button
        :team="getTeamById(team)"
        @remove="pot.teams.splice(teamIndex, 1)"
      />
    </TeamGroupCard>
  </div>
</template>

<script lang="ts" setup>
import { IconPlus, IconTrash, IconWand } from '@tabler/icons-vue';
import { getDrawPotName, newDrawPot } from '~/helpers/draw';
import { getTeamById } from '~/helpers/team';

const props = defineProps<{
  seedingDraw: ReturnType<typeof useSeedingDraw>;
  disabled?: boolean;
}>();

const drawPots = defineModel<DrawPot[]>({ required: true });

watch(() => props.seedingDraw.participants.value, (newParticipants) => {
  for (const pot of drawPots.value) {
    pot.teams = pot.teams.filter(i => newParticipants.includes(i));
  }
});

function isParticipantDisabled(team: DrawParticipant) {
  return props.disabled || drawPots.value.flatMap(d => d.teams).includes(team);
}

function resetDrawPots() {
  for (const pot of drawPots.value) {
    pot.teams = [];
  }
}
</script>
