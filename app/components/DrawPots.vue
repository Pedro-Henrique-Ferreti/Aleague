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
      @add-to-pot="drawPots[$event - 1]?.participants.push(team)"
    />
  </TeamGroupCard>
  <div class="flex justify-end">
    <AppButton
      class="btn-sm"
      label="Adicionar pote"
      :icon-left="IconPlus"
      :disabled="drawPots.length >= MAX_DRAW_POTS"
      @click="drawPots.push(newDrawPot())"
    />
  </div>
  <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] mt-1">
    <TeamGroupCard
      v-for="pot, index in drawPots"
      :key="index"
      :title="`Pote ${index + 1}`"
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
        v-for="team in pot.participants"
        :key="team.id"
        :team="team"
        @remove="drawPots[index]!.participants = pot.participants.filter((t) => t.id !== team.id)"
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

function newDrawPot(): DrawPot {
  return { id: new Date().getTime(), participants: [] };
}

const drawPots = ref<DrawPot[]>([newDrawPot()]);

function isParticipantDisabled(team: DrawParticipant) {
  return drawPots.value.flatMap(d => d.participants).some(t => t.id === team.id);
}
</script>
