<template>
  <div class="grid grid-cols-2 gap-x-1">
    <AppCounter
      v-model="groups"
      label="Quantidade de grupos"
      :min="MIN_GROUPS"
      :max="MAX_GROUPS"
      :disabled="disabled"
    />
    <AppCounter
      v-model="teamsPerGroup"
      label="Equipes em cada grupo"
      :step="2"
      :min="MIN_TEAMS_PER_GROUP"
      :max="MAX_TEAMS_PER_GROUP"
      :disabled="disabled"
    />
    <AppCounter
      v-model="groupRoundRobins"
      label="Turnos"
      :min="MIN_ROUNDS"
      :max="3"
      :disabled="disabled"
    />
    <AppFieldset
      class="text-center"
      label="Total de equipes"
    >
      <span class="font-semibold text-2xl text-center">
        {{ teamsPerGroup * groups }}
      </span>
    </AppFieldset>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  disabled: boolean;
}>();

const { MAX_GROUPS, MIN_TEAMS_PER_GROUP, MIN_GROUPS, MIN_ROUNDS, MAX_TEAMS_PER_GROUP } = StageConstants;

const groups = defineModel<TournamentStageForm['groups']>('groups', { required: true });
const teamsPerGroup = defineModel<TournamentStageForm['teamsPerGroup']>('teams-per-group', { required: true });
const groupRoundRobins = defineModel<TournamentStageForm['groupRoundRobins']>('group-round-robins', { required: true });
</script>
