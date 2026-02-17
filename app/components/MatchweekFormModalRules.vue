<template>
  <div class="grid grid-cols-2 gap-1">
    <AppSelect
      v-model="form.format"
      class="col-span-2"
      label="Disputa de partidas"
      :options="FORMAT_OPTIONS"
    />
    <AppCounter
      v-model="form.roundRobins"
      label="Turnos"
      :min="StageConstants.MIN_ROUNDS"
      :max="3"
    />
    <AppCounter
      v-model="form.weeksToCreate"
      label="Rodadas por turno"
      :min="1"
    />
  </div>
</template>

<script lang="ts">
export interface RulesForm {
  format: GroupStageFormat;
  roundRobins: number;
  weeksToCreate: number;
}
</script>

<script lang="ts" setup>
const form = defineModel<RulesForm>('form', { required: true });

const FORMAT_OPTIONS: Readonly<SelectOptionList<GroupStageFormat>> = [
  { label: 'Equipes do mesmo grupo', value: GroupStageFormat.SAME_GROUP_ROUND_ROBIN },
  { label: 'Apenas equipes de outros grupos', value: GroupStageFormat.OTHER_GROUPS_ROUND_ROBIN },
  { label: 'Todos contra todos', value: GroupStageFormat.ALL_PLAY_ALL },
];
</script>
