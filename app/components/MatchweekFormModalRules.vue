<template>
  <div class="grid grid-cols-2 gap-1">
    <AppSelect
      v-model="format"
      class="col-span-2"
      label="Disputa de partidas"
      :options="FORMAT_OPTIONS"
    />
    <AppCounter
      v-model="roundRobins"
      label="Turnos"
      :min="StageConstants.MIN_ROUNDS"
      :max="3"
    />
  </div>
</template>

<script lang="ts">
export interface RulesForm {
  format: GroupsStageFormat;
  roundRobins: number;
}
</script>

<script lang="ts" setup>
const format = defineModel<RulesForm['format']>('format', { required: true });
const roundRobins = defineModel<RulesForm['roundRobins']>('round-robins', { required: true });

const FORMAT_OPTIONS: Readonly<SelectOptionList<GroupsStageFormat>> = [
  { label: 'Equipes do mesmo grupo', value: GroupsStageFormat.ROUND_ROBIN },
  { label: 'Apenas equipes de outros grupos', value: GroupsStageFormat.OTHER_GROUPS_ROUND_ROBIN },
  { label: 'Todos contra todos', value: GroupsStageFormat.ALL_PLAY_ALL },
];
</script>
