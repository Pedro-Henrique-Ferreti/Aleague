<template>
  <div class="card card-border relative">
    <div class="card-body p-1 grid gap-0.5 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
      <div class="badge badge-secondary badge-soft absolute top-0 left-1/2 -translate-1/2">
        {{ stageType === StageType.GROUP ? 'Grupo' : 'Partida' }} {{ group.order }}
      </div>
      <StageTeamsSlot
        v-for="team, index in group.teams"
        :key="index"
        :team-id="team"
        @remove="group.teams[index] = null"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  stageType: TournamentStage['type'];
}>();

const group = defineModel<StageTeamsForm['groups'][number]>({ required: true });
</script>
