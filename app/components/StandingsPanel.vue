<template>
  <div class="max-w-20 pl-1 border-l border-base-200">
    <div class="mb-0.5">
      <AppTooltip label="Fechar painel">
        <AppButton
          class="btn-square btn-ghost btn-sm -ml-0.5"
          aria-label="Fechar painel"
          :icon-left="IconLayoutSidebarLeftExpand"
          @click="$emit('closePanel')"
        />
      </AppTooltip>
    </div>
    <BaseSelect
      v-model="selectedStage"
      :options="stageOptions"
    />
    <template v-if="selectedStage?.type === StageType.GROUP">
      <StandingsTable
        v-for="group in selectedStage.groups"
        :key="group.order"
        disable-movement-transition
        :qualifier="group.qualifier"
        :standings="group.standings"
        @update:table-entry="handleTableEntryClick"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-vue';
import { getTeamById } from '@/helpers/team';

const emit = defineEmits<{
  selectTeam: [Team];
  closePanel: [];
}>();

const tournamentStore = useTournamentStore();

const stageOptions = computed<SelectOptionList<TournamentStage>>(() => {
  return tournamentStore.activeTournament?.stages.map(stage => ({
    label: stage.name,
    value: stage,
  })) ?? [];
});

const selectedStage = ref<TournamentStage | undefined>(stageOptions.value[0]?.value);

function handleTableEntryClick(entry: TableEntry | undefined) {
  const team = getTeamById(entry?.team);

  if (team) {
    emit('selectTeam', team);
  }
}
</script>
