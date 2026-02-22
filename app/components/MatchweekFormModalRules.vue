<template>
  <div class="grid grid-cols-2 gap-1">
    <AppSelect
      v-model="store.form.format"
      class="col-span-2"
      label="Disputa de partidas"
      :options="formatOptions"
    />
    <AppCounter
      v-model="store.form.roundRobins"
      label="Turnos"
      :min="StageConstants.MIN_ROUNDS"
      :max="3"
    />
    <AppCounter
      v-model="store.form.weeksToCreate"
      label="Rodadas por turno"
      :min="1"
    />
  </div>
</template>

<script lang="ts" setup>
const { activeGroupStage } = storeToRefs(useStageStore());
const store = useMatchweekFormStore();

const formatOptions = computed<SelectOptionList<GroupStageFormat>>(() => ([
  {
    label: 'Equipes do mesmo grupo',
    value: GroupStageFormat.SAME_GROUP_ROUND_ROBIN,
  },
  {
    label: 'Apenas equipes de outros grupos',
    value: GroupStageFormat.OTHER_GROUPS_ROUND_ROBIN,
    disabled: (activeGroupStage.value?.groups.length ?? 0) < 2,
  },
  {
    label: 'Todos contra todos',
    value: GroupStageFormat.ALL_PLAY_ALL,
    disabled: (activeGroupStage.value?.groups.length ?? 0) < 2,
  },
]));
</script>
