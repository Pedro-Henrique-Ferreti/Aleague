<template>
  <TeamGroupCard
    title="Participantes"
    class="max-h-[13.625rem] [&_.card-body]:overflow-y-auto mb-2"
  >
    <DrawPotsParticipant
      v-for="team in drawParticipants"
      :key="team"
      class="animate-fade"
      :participant="team"
      :pots-count="drawPots.length"
      :disabled="isParticipantDisabled(team)"
      @add-to-pot="drawPots[$event - 1]?.participants.push(team)"
    />
  </TeamGroupCard>
  <div class="flex justify-end">
    <AppButton
      class="btn-sm"
      label="Adicionar pote"
      :icon-left="IconPlus"
      :disabled="disabled || drawPots.length >= MAX_DRAW_POTS"
      @click="drawPots.push(newDrawPot())"
    />
  </div>
  <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] mt-1">
    <TeamGroupCard
      v-for="pot, index in drawPots"
      :key="pot.id"
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
        v-for="(team, teamIndex) in pot.participants"
        :key="team"
        show-clear-button
        :team="getTeamById(team)"
        @remove="pot.participants.splice(teamIndex, 1)"
      />
    </TeamGroupCard>
  </div>
</template>

<script lang="ts" setup>
import { IconPlus } from '@tabler/icons-vue';
import { getDrawPotName, newDrawPot } from '~/helpers/draw';
import { getTeamById } from '~/helpers/team';

const props = defineProps<{
  drawParticipants: DrawParticipant[];
  disabled?: boolean;
}>();

const drawPots = defineModel<DrawPot[]>({ required: true });

watch(() => props.drawParticipants, (newParticipants) => {
  for (const pot of drawPots.value) {
    pot.participants = pot.participants.filter(i => newParticipants.includes(i));
  }
});

function isParticipantDisabled(team: DrawParticipant) {
  return props.disabled || drawPots.value.flatMap(d => d.participants).includes(team);
}
</script>
