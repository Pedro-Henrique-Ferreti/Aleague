<template>
  <div class="card card-border h-fit">
    <div class="card-body">
      <div class="text-center">
        <div class="text-xl font-semibold mb-0.5">Nenhuma partida disponível</div>
        <p>Adicione todas as equipes antes de gerar as partidas.</p>
        <EditStageTeams
          class="btn-wide mt-2"
          :stage="stage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const stage = defineModel<TournamentGroupsStage>({ required: true });
</script>
