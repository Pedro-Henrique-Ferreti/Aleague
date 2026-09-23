<template>
  <TeamGroupCard
    title="Participantes"
    class="max-h-16 [&_.card-body]:overflow-y-auto mb-2"
  >
    <DrawPotsParticipant
      v-for="team in drawParticipants"
      :key="team.id"
      :participant="team"
      :pots-count="drawPots.length"
      :disabled="isParticipantDisabled(team)"
      @add-to-pot="drawPots[$event - 1]?.push(team)"
    />
  </TeamGroupCard>
  <div class="flex justify-end">
    <AppButton
      class="btn-sm"
      label="Adicionar pote"
      :icon-left="IconPlus"
      :disabled="drawPots.length >= MAX_DRAW_POTS"
      @click="drawPots.push([])"
    />
  </div>
  <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] mt-1">
    <TeamGroupCard
      v-for="pot, index in drawPots"
      :key="index"
      :title="`Pote ${index + 1}`"
    >
      <TeamSlot
        v-for="team in pot"
        :key="team.id"
        :team="team"
        @remove="drawPots[index] = pot.filter((t) => t.id !== team.id)"
      />
    </TeamGroupCard>
  </div>
</template>

<script lang="ts" setup>
import { IconPlus } from '@tabler/icons-vue';
import TeamGroupCard from './TeamGroupCard.vue';

defineProps<{
  drawParticipants: DrawParticipant[];
}>();

const MAX_DRAW_POTS = 4;

const drawPots = ref<DrawPot[]>([[]]);

function isParticipantDisabled(team: DrawParticipant) {
  return drawPots.value.flat().some(t => t.id === team.id);
}
</script>
