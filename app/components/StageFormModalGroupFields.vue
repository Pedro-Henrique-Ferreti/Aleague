<template>
  <div class="grid grid-cols-2 gap-x-1">
    <AppSelect
      v-model="groupNameFormat"
      label="Nomes dos grupos"
      :options="GROUP_NAME_OPTIONS"
    />
    <AppCounter
      v-model="groups"
      label="Quantidade de grupos"
      class="row-start-2"
      :min="MIN_GROUPS"
      :max="MAX_GROUPS"
      :disabled="disabled"
    />
    <AppCounter
      v-model="teamsPerGroup"
      label="Equipes em cada grupo"
      class="row-start-2"
      :step="2"
      :min="MIN_TEAMS_PER_GROUP"
      :max="MAX_TEAMS_PER_GROUP"
      :disabled="disabled"
    />
    <AppFieldset
      class="text-center col-span-2 mt-1"
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

const GROUP_NAME_OPTIONS: Readonly<SelectOptionList<GroupStageNameFormat>> = [
  { value: GroupStageNameFormat.NUMBER, label: 'Números' },
  { value: GroupStageNameFormat.LETTER, label: 'Letras' },
];

const { MAX_GROUPS, MIN_TEAMS_PER_GROUP, MIN_GROUPS, MAX_TEAMS_PER_GROUP } = STAGE_FORM;

const groups = defineModel<StageForm['groups']>('groups', { required: true });
const teamsPerGroup = defineModel<StageForm['teamsPerGroup']>('teams-per-group', { required: true });
const groupNameFormat = defineModel<StageForm['groupNameFormat']>('group-name-format', { required: true });
</script>
